import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { parseRussianDate } from 'src/app/shared/helpers/parse-russian-date.helper';
import { IEvent } from 'src/app/shared/interfaces/event.interface';
import { EventService } from 'src/app/shared/services/event.service';
import { CalendarService } from '../../../shared/services/calendar.service';

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

  public setSelected(day: Date): void {
    this.calendarService.setSelectedDate(day);
  }

  public search(): void {
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

  private checkTitle(title: string): boolean {
    if (!title) return false;
    return title === this.queryString.getRawValue();
  }

  private checkDate(date: Date): boolean {
    if (!date) return false;
    const parsedDate = parseRussianDate(this.queryString.getRawValue());
    return date.toDateString() === parsedDate?.toDateString();
  }

  private checkParticipants(participants: string[]): boolean {
    if (!participants) return false;
    for (let i = 0; i < participants.length; i += 1) {
      if (participants[i] === this.queryString.getRawValue()) return true;
    }
    return false;
  }
}
