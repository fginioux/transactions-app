import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { formatCurrency } from '@angular/common';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {

  constructor(@Inject(LOCALE_ID) private _locale) {}

  transform(amount: number): string {
    return formatCurrency(amount, this._locale, '€', 'EUR', '1.2-2');
  }
}
