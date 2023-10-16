import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IEvent } from 'src/app/shared/interfaces/event.interface';
import { CalendarService } from './calendar.service';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private events$ = new Subject<IEvent[]>();
  private events: IEvent[] = [];

  constructor() {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      this.events = JSON.parse(storedEvents, this.parseDate);
    }
  }

  public getEvents(): IEvent[] {
    return this.events
  }

  public getEventsObserver(): Observable<IEvent[]> {
    return this.events$.asObservable();
  }

  public getEventByDate(date: Date): IEvent {
    return this.events.find((event) => {
      return event.date.toDateString() === date.toDateString();
    });
  }

  public submitEvent(event: IEvent): void {
    if (event.id){
      this.editEvent(event);
      return;
    }
    this.events.push({ ...event, id: Date.now() });
    this.events$.next(this.events);
    this.updateLocalStorage();
  }


  public deleteEvent(id: number): void {
    this.events = this.events.filter((event) => event.id !== id);
    this.events$.next(this.events);
    this.updateLocalStorage();
  }

  private editEvent(event: IEvent): void {
    const editEventIndex = this.events.findIndex((item) => event.id === item.id);
    this.events[editEventIndex] = {...event};
    this.events$.next(this.events);
    this.updateLocalStorage();
  }

  private updateLocalStorage(): void {
    localStorage.setItem('events', JSON.stringify(this.events));
  }

  private parseDate(key: string, value: unknown) {
    if (key === 'date') {
      const newDate = new Date(value as string);
      newDate.setHours(0, 0, 0, 0);
      return newDate;
    }
    return value;
  }
}
