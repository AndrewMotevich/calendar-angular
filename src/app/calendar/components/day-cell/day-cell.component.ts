import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Observable, Subject, of, takeUntil } from 'rxjs';
import { IEvent } from 'src/app/shared/interfaces/event.interface';
import { EventService } from '../../../shared/services/event.service';

@Component({
  selector: 'app-day-cell',
  templateUrl: './day-cell.component.html',
  styleUrls: ['./day-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DayCellComponent implements OnInit, OnDestroy {
  @Input() public weekIndex: number;
  @Input() public day: Date;
  public currentDate = new Date();
  public isToday: boolean;

  public event: Observable<IEvent>;
  private unsubscribe = new Subject<boolean>();

  constructor(
    private eventService: EventService,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.currentDate.setHours(0, 0, 0, 0);
    this.isToday = this.day.toDateString() === this.currentDate.toDateString();
    this.eventService
      .getEventsObserver()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.event = of(this.eventService.getEventByDate(this.day));
        this.cdr.markForCheck();
      });
    this.event = of(this.eventService.getEventByDate(this.day));
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next(true);
    this.unsubscribe.complete();
  }
}
