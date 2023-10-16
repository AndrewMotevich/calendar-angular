import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CalendarService } from '../../../shared/services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit {
  public weeks$: Observable<Date[][]>;
  public currentDate$: Observable<Date>;

  constructor(public calendarService: CalendarService) {
    this.weeks$ = this.calendarService.weeks$;
    this.currentDate$ = this.calendarService.currentDate$;
  }

  public ngOnInit(): void {
    this.calendarService.generateCalendar();
  }

  public prevMonth(): void {
    this.calendarService.prevMonth();
  }

  public nextMonth(): void {
    this.calendarService.nextMonth();
  }

  public toCurrent(): void {
    this.calendarService.toCurrent();
  }
}
