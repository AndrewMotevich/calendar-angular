import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IEvent } from 'src/app/shared/interfaces/event.interface';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventFormComponent {
  eventForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.eventForm = this.formBuilder.group({
      title: ['', Validators.required],
      date: [null, Validators.required],
      participants: [''],
      description: ['']
    });
  }

  onSubmit() {
    if (this.eventForm.valid) {
      const formData: IEvent = this.eventForm.value as IEvent;
      console.log(formData);
    }
  }
}
