import { Injectable } from '@angular/core';
import { IEvent } from 'src/app/shared/interfaces/event.interface';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private events: IEvent[] = [];

  constructor() {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      this.events = JSON.parse(storedEvents, this.parseDate);
    }
  }

  public getEvents(): IEvent[] {
    return this.events;
  }

  public getEventByDate(date: Date): IEvent {
    return this.events.find((event) => {
      return event.date.toDateString() === date.toDateString();
    });
  }

  public addEvent(event: Omit<IEvent, 'id'>): void {
    this.events.push({ id: Date.now(), ...event });
    this.updateLocalStorage();
  }

  public editEvent(event: IEvent, index: number): void {
    this.events[index] = event;
    this.updateLocalStorage();
  }

  public deleteEvent(id: number): void {
    this.events = this.events.filter((event) => event.id !== id);
    this.updateLocalStorage();
  }

  private updateLocalStorage() {
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
