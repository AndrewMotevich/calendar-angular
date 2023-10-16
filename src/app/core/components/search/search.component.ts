import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { IEvent } from 'src/app/shared/interfaces/event.interface';
import { Observable, map } from 'rxjs';
import { EventService } from 'src/app/calendar/services/event.service';
import { FormControl, Validators } from '@angular/forms';
import { parseRussianDate } from 'src/app/shared/helpers/parse-russian-date.helper';
import { CalendarComponent } from 'src/app/calendar/components/calendar/calendar.component';
import { CalendarService } from '../../../calendar/services/calendar.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  @ViewChild('popoverInstance') public popover: NgbPopover;
  public queryString = new FormControl('', Validators.required);

  public events: IEvent[];

  constructor(
    private eventService: EventService,
    private calendarService: CalendarService
  ) {}

  public search() {
    if (!this.queryString.getRawValue()) return;
    this.events = this.eventService.getEvents().map((event) => {
      return this.compareEventAndString(event);
    });
    this.popover.open();
  }

  private compareEventAndString(event: IEvent): IEvent | null {
    if (
      this.checkTitle(event.title) ||
      this.checkDate(event.date) ||
      this.checkParticipants(event.participants)
    )
      return event;
    return null;
  }

  private checkTitle(title: string) {
    if (!title) return false;
    return title === this.queryString.getRawValue();
  }

  private checkDate(date: Date) {
    if (!date) return false;
    const parsedDate = parseRussianDate(this.queryString.getRawValue());
    return date.toDateString() === parsedDate?.toDateString();
  }

  private checkParticipants(participants: string[]) {
    if (!participants) return false;
    for (let i = 0; i < participants.length; i += 1) {
      if (participants[i] === this.queryString.getRawValue()) return true;
    }
    return false;
  }
}
