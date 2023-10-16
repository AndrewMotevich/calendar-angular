import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { parseRussianDate } from 'src/app/shared/helpers/parse-russian-date.helper';
import { IEvent } from 'src/app/shared/interfaces/event.interface';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
  selector: 'app-quick-add',
  templateUrl: './quick-add.component.html',
  styleUrls: ['./quick-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickAddComponent {
  @Input() public popover: NgbPopover;
  public eventData = new FormControl('', Validators.required);

  constructor(private eventService: EventService) {}

  public onSubmit() {
    // TODO: add validation
    if (this.eventData.invalid) return;

    try {
      const dataArray = this.eventData.getRawValue().split(',');
      const eventFormData: IEvent = {
        title: dataArray[2].trim(),
        date: parseRussianDate(dataArray[0]),
        description: this.eventData.getRawValue(),
      };
      console.log(eventFormData);
      this.eventService.submitEvent(eventFormData);
      this.closePopover();
    } catch {
      alert('Error while parse input date! Use correct format!');
    }
  }

  public closePopover() {
    this.popover.close();
  }
}
