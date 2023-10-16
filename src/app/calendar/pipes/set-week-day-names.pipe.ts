import { Pipe, PipeTransform } from '@angular/core';
import DAYS_OF_WEEK from 'src/app/shared/constants/days-of-week.const';

@Pipe({
  name: 'setWeekDayNames',
  pure: false,
})
export class SetWeekDayNamesPipe implements PipeTransform {
  transform(value: Date, weekIndex: number): string {
    if (weekIndex !== 0) return value.getDate().toString();
    return `${DAYS_OF_WEEK[value.getDay()]}, ${value.getDate()}`;
  }
}
