import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { EventService } from '../../services/event.service';
import { IEvent } from 'src/app/shared/interfaces/event.interface';

@Component({
  selector: 'app-day-cell',
  templateUrl: './day-cell.component.html',
  styleUrls: ['./day-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DayCellComponent implements OnInit {
  @Input() public day: Date;
  public currentDate = new Date();
  public isToday: boolean;
  public event: IEvent;

  constructor(private eventService: EventService, private cdr: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.currentDate.setHours(0, 0, 0, 0);
    this.isToday = this.day.toDateString() === this.currentDate.toDateString();
    this.event = this.eventService.getEventByDate(this.day);
  }
}
