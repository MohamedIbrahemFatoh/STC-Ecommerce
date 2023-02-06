import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators,} from '@angular/forms';
import { Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  loading: boolean = false;
  hidePassword = true;
  rememberMe = false;
  formGroup!: FormGroup;
  errorMsgs:any ;
  isSubmitted = false;
  captcha = '';
  userName: any = localStorage.getItem('stcUserName');

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (this.userName && this.userName == 'admin') {
      this.router.navigate(['/admin'])
    } else if (this.userName && this.userName == 'user') {
      this.router.navigate(['/user'])
    }
    this.formGroup = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  logIn() {
    this.isSubmitted = true;
    let model = {
      userName: this.formGroup.controls.userName.value,
      password: this.formGroup.controls.password.value,
    };
    if (this.formGroup.valid && this.captcha) {
      this.loading = true;
      this.toastr.success('you are logged in');
      localStorage.setItem('stcUserName', this.formGroup.controls.userName.value);
      if (this.formGroup.controls.userName.value == 'admin') {
        this.router.navigate(['/admin'])
      } else if (this.formGroup.controls.userName.value == 'user') {
        this.router.navigate(['/user'])
      }
      this.loading = false;
    }
  }

  public resolved(captchaResponse: string) {
    this.captcha = captchaResponse;
  }

  hasError(controlName: string, errorName: string) {
    return this.formGroup.controls[controlName].hasError(errorName);
  }
}
