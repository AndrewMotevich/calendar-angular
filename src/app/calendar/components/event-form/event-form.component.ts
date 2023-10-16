import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IEvent } from 'src/app/shared/interfaces/event.interface';
import { EventService } from '../../services/event.service';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventFormComponent implements OnInit {
  @Input() public day: Date;
  @Input() public popover: NgbPopover;
  public eventForm: FormGroup;

  private id: number;

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private calendarService: CalendarService
  ) {
    this.eventForm = this.formBuilder.group({
      title: ['', Validators.required],
      date: [null, Validators.required],
      participants: [''],
      description: [''],
    });
  }

  public ngOnInit() {
    this.day.setHours(3);
    this.eventForm.controls['date'].setValue(
      this.day.toISOString().slice(0, 10)
    );
    this.setEvenValue();
    console.log(this.calendarService.currentDate$.subscribe(res => console.log(res)))
  }

  public onSubmit() {
    // TODO: add validation
    if (this.eventForm.invalid) {
      alert("Invalid form!");
      return;
    }

    const participants = (this.eventForm.get('participants').value as string)
      .split(',')
      .map((item) => item.trim());
    const formData: IEvent = {
      ...this.eventForm.value,
      participants: participants,
      id: this.id,
    } as IEvent;
    formData.date = new Date(formData.date);

    this.eventService.submitEvent(formData);
    this.closePopover();
  }

  public deleteEvent(): void {
    this.eventService.deleteEvent(this.id);
    this.closePopover();
  }

  public closePopover(): void {
    this.popover.close();
  }

  private setEvenValue(): void {
    const event: IEvent = this.eventService.getEventByDate(this.day);
    if (!event) return;

    this.id = event.id;
    this.eventForm.controls['title'].setValue(event.title);
    this.eventForm.controls['participants'].setValue(
      event?.participants?.join(', ') || ''
    );
    this.eventForm.controls['description'].setValue(event?.description || '');
  }
}
