import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit {
  public currentDate: Date = new Date();

  public daysOnScreen: Date[] = [];

  constructor(private cdr: ChangeDetectorRef){}

  public ngOnInit() {
    this.generateCalendar();
  }

  public prevMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.generateCalendar();
    this.currentDate = new Date(this.currentDate)
  }

  public nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.generateCalendar();
    this.currentDate = new Date(this.currentDate)
  }

  public generateCalendar() {
    this.daysOnScreen = [];
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(startDate.getDate() - (startDate.getDay() + 6) % 7);

    while (startDate <= lastDayOfMonth) {
        this.daysOnScreen.push(new Date(startDate));
        startDate.setDate(startDate.getDate() + 1);
    }
  }
}
