import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-day-cell',
  templateUrl: './day-cell.component.html',
  styleUrls: ['./day-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DayCellComponent implements OnInit {
  @Input() public day: Date;
  public currentDate = new Date()
  public isToday: boolean;

  public ngOnInit(): void {
    this.currentDate.setHours(0,0,0,0)
    this.isToday = this.day.toDateString() === this.currentDate.toDateString();
  }

}
