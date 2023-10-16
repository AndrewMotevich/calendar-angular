import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/components/calendar/calendar.component';

import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { DayCellComponent } from './calendar/components/day-cell/day-cell.component';
import { HeaderComponent } from './core/components/header/header.component';
import { TransformMonthNamePipe } from './calendar/pipes/transform-month-name.pipe';
import { SetWeekDayNamesPipe } from './calendar/pipes/set-week-day-names.pipe';
import { EventFormComponent } from './calendar/components/event-form/event-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { QuickAddComponent } from './core/components/quick-add/quick-add.component';
import { SearchComponent } from './core/components/search/search.component';

registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    DayCellComponent,
    HeaderComponent,
    TransformMonthNamePipe,
    SetWeekDayNamesPipe,
    EventFormComponent,
    QuickAddComponent,
    SearchComponent,
  ],
  imports: [BrowserModule, ReactiveFormsModule, NgbModule, NgbPopoverModule],
  providers: [{ provide: LOCALE_ID, useValue: 'en' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
