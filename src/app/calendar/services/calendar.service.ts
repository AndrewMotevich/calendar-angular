import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private currentDate: Date = new Date();
  private weeks: Date[][] = [];

  public weeks$ = new BehaviorSubject(this.weeks);
  public currentDate$ = new BehaviorSubject(this.currentDate);
  public selectedDate$ = new BehaviorSubject(this.currentDate);

  public setSelectedDate(date: Date) {
    this.currentDate = date;
    this.currentDate$.next(date);
    console.log(date)
  }

  public prevMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.generateCalendar();
    this.weeks$.next(this.weeks);
    this.currentDate$.next(this.currentDate);
  }

  public nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.generateCalendar();
    this.weeks$.next(this.weeks)
    this.currentDate$.next(this.currentDate);
  }

  public toCurrent(): void {
    this.currentDate = new Date();
    this.generateCalendar();
    this.weeks$.next(this.weeks)
    this.currentDate$.next(this.currentDate);
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
    this.weeks$.next(this.weeks)
    this.currentDate$.next(this.currentDate);
  }
}
