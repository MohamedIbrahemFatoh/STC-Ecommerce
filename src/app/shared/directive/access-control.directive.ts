import { AuthService } from 'src/app/features/auth/services/auth.service';
import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appAccessControl]',
})
export class AccessControlDirective implements OnInit {
  @Input() permission: any;

  constructor(
    private elementRef: ElementRef,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.checkAccess();
  }

  checkAccess() {
    if (!this.permission) {
      return;
    } else {
      const accessControls: [] = this.authService.currentPermissions.getValue();

      // const permissionsList = this.authService.currentPermissions.getValue();
      const founded = [];
      const found = accessControls.some(
        (control) => control === this.permission
      );
      if (found) {
        founded.push(this.permission);
      }

      if (!founded.length && accessControls.length) {
        this.elementRef.nativeElement.remove();
      }
    }
  }
}
