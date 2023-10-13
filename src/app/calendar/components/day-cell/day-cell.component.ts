import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IEvent } from 'src/app/shared/interfaces/event.interface';

@Component({
  selector: 'app-day-cell',
  templateUrl: './day-cell.component.html',
  styleUrls: ['./day-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayCellComponent {}
