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

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService
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
  }

  public onSubmit() {
    if (this.eventForm.valid) {
      const participants = (this.eventForm.get('participants').value as string)
        .split(',')
        .map((item) => item.trim());
      const formData: IEvent = { ...this.eventForm.value, participants: participants } as IEvent;
      formData.date = new Date(formData.date);
      this.eventService.addEvent(formData);
      this.popover.close();
    }
  }

  private setEvenValue() {
    const event: IEvent = this.eventService.getEventByDate(this.day);
    if (event) {
      this.eventForm.controls['title'].setValue(event.title);
      this.eventForm.controls['participants'].setValue(
        event.participants.join(', ')
      );
      this.eventForm.controls['description'].setValue(event.title);
    }
  }
}
