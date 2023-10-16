import {
  Directive,
  DoCheck,
  ElementRef,
  Input,
  Renderer2
} from '@angular/core';
import { CalendarService } from '../../shared/services/calendar.service';

@Directive({
  selector: '[appSelectDay]',
})
export class SelectDayDirective implements DoCheck {
  @Input() public day: Date;
  private selectedDate: Date;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private calendarService: CalendarService
  ) {}

  public ngDoCheck() {
    this.selectedDate = this.calendarService.selectedDate;
    this.setSelected();
  }

  private setSelected() {
    this.renderer.removeClass(this.el.nativeElement, 'selected');
    if (this.selectedDate.toDateString() === this.day.toDateString()) {
      this.renderer.addClass(this.el.nativeElement, 'selected');
    }
  }
}
