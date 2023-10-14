import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IEvent } from 'src/app/shared/interfaces/event.interface';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventFormComponent implements OnInit {
  @Input() public day: Date;
  public eventForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private eventService: EventService) {
    this.eventForm = this.formBuilder.group({
      title: ['', Validators.required],
      date: [null, Validators.required],
      participants: [''],
      description: ['']
    });
  }

  public ngOnInit() {
    this.eventForm.controls["date"].setValue(this.day)
  }

  public onSubmit() {
    if (this.eventForm.valid) {
      const formData: IEvent = this.eventForm.value as IEvent;
      this.eventService.addEvent(formData);
    }
  }
}
