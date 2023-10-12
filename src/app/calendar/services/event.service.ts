import { Injectable } from '@angular/core';
import { IEvent } from 'src/app/shared/interfaces/event.interface';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private events: IEvent[] = [];

  constructor() {
    // Load events from local storage
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      this.events = JSON.parse(storedEvents);
    }
  }

  getEvents(): IEvent[] {
    return this.events;
  }

  addEvent(event: IEvent): void {
    this.events.push(event);
    this.updateLocalStorage();
  }

  editEvent(event: IEvent, index: number): void {
    this.events[index] = event;
    this.updateLocalStorage();
  }

  deleteEvent(index: number): void {
    this.events.splice(index, 1);
    this.updateLocalStorage();
  }

  private updateLocalStorage() {
    localStorage.setItem('events', JSON.stringify(this.events));
  }
}
