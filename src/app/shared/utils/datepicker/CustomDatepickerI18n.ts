import { Injectable } from '@angular/core';
import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { I18n } from './i18n';
import { valores_I18N } from './i18n-values';

// Define custom service providing the months and weekdays translations
@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

  getWeekdayShortName(weekday: number): string {
    return valores_I18N(I18n.language).weekdays[weekday - 1];
  }

  getMonthShortName(month: number): string {
    return valores_I18N(I18n.language).months[month - 1];
  }

  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}