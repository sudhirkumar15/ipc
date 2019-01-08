import { Pipe, PipeTransform } from '@angular/core';
import { Global } from '../../g';

@Pipe({
  name: 'timeRemianing'
})
export class TimeRemianingPipe implements PipeTransform {
  constructor(private global: Global) { }
  /**
   * @param value seconds
   * @param args
   */
  transform(value: number, args?: any): any {
    if (value > 0 && value.toString() !== 'Infinity') {
      const result = new Date(value * 1000).toISOString().substr(11, 8);
      return result + ' ' + this.global.language.remaining;
    } else {
      return null;
    }
  }
}
