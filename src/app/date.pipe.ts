import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateCon',
  standalone: true
})
export class DatePipe implements PipeTransform {
  constructor(private datePipe: DatePipe){}

  transform(value: string, format: string = 'dd/MM/yyyy'): string {
    return this.datePipe.transform(value, format) || '';
  }

}
