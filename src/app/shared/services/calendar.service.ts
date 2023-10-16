import { Injectable } from '@angular/core';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private currentDate: Date = new Date();
  private _selectedDate: Date = new Date();
  private weeks: Date[][] = [];

  public weeks$ = new BehaviorSubject(this.weeks);
  public currentDate$ = new BehaviorSubject(this.currentDate);

  public get selectedDate() {
    return this._selectedDate;
  }

  public setSelectedDate(date: Date, popover?: NgbPopover) {
    this.currentDate = date;
    this.currentDate$.next(this.currentDate);
    this._selectedDate = date;
    this.generateCalendar();
    if (popover) popover.open();
  }

  public prevMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.generateCalendar();
    this.resetDate();
  }

  public nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.generateCalendar();
    this.resetDate();
  }

  public toCurrent(): void {
    this.currentDate = new Date();
    this.generateCalendar();
    this.resetDate();
  }

  public generateCalendar(): void {
    this.weeks = [];
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(startDate.getDate() - ((startDate.getDay() + 6) % 7));

    while (startDate <= lastDayOfMonth) {
      const week = [];
      for (let i = 0; i < 7; i += 1) {
        week.push(new Date(startDate));
        startDate.setDate(startDate.getDate() + 1);
      }
      this.weeks.push(week);
    }
    this.weeks$.next(this.weeks);
    this.currentDate$.next(this.currentDate);
  }

  private resetDate() {
    this._selectedDate = new Date();
    this.weeks$.next(this.weeks);
    this.currentDate$.next(this.currentDate);
  }
}
