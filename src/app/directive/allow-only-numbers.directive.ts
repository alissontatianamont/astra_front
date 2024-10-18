import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appAllowOnlyNumbers]'
})
export class AllowOnlyNumbersDirective {

  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;

    if ((charCode < 48 || charCode > 57) && charCode !== 8) {
      event.preventDefault();
    }
  }
}