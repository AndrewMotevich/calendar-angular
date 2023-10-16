import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit {
  public currentDate: Date = new Date();
  public weeks: Date[][] = [];
  public currentDayIndex: number | null;

  public ngOnInit(): void {
    this.generateCalendar();
  }

  public prevMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.generateCalendar();
    this.currentDate = new Date(this.currentDate);
  }

  public nextMonth() : void{
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.generateCalendar();
    this.currentDate = new Date(this.currentDate);
  }

  public toCurrent(): void {
    this.currentDate = new Date();
    this.generateCalendar();
  }

  private generateCalendar(): void {
    this.weeks = [];
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(startDate.getDate() - ((startDate.getDay() + 6) % 7));

    while (startDate <= lastDayOfMonth) {
      const week = [];
      for (let i = 0; i < 7; i += 1){
        week.push(new Date(startDate));
        startDate.setDate(startDate.getDate() + 1);
      }
      this.weeks.push(week);
    }
  }
}
