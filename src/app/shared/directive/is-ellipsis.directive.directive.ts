import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[isEllipsis]',
})
export class IsEllipsisDirective {
  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit(): void {
    const element = this.elementRef.nativeElement;
    if (element.offsetWidth < element.scrollWidth) {
      element.title = element.innerHTML;
      element.classList.add('trimed');
    }
  }
}
