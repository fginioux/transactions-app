import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService as _t } from '../../services/translation.service';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {
  transform(key: string): string {
    return _t.instant(key);
  }
}
