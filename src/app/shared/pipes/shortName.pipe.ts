import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'shortName',
})
export class ShortNamePipe implements PipeTransform {
  transform(name: string): string {
    if (!name) {
      return '';
    }
    let shortName = '';
    const initials = name.split(' ') || [];
    if (initials[0]) {
      shortName += initials[0][0];
    }
    if (initials[1]) {
      shortName += initials[(initials.length - 1)][0];
    }
    shortName = shortName.toUpperCase();
    return shortName;
  }
}
