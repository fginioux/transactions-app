import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(date: string): string {
    const [year, month, day] = date.split('-');

    return `${day}.${month}.${year}`;
  }
}
