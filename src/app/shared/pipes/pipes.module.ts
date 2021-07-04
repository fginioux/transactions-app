import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from './translate.pipe';
import { CurrencyFormatPipe } from './currency-format.pipe';
import { DateFormatPipe } from './date-format.pipe';

import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';

registerLocaleData(localeDe);

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TranslatePipe,
    CurrencyFormatPipe,
    DateFormatPipe
  ],
  exports: [
    TranslatePipe,
    CurrencyFormatPipe,
    DateFormatPipe
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'de'}
  ]
})
export class PipesModule {}