import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basic-layout',
  templateUrl: './basic-layout.component.html'
})
export class BasicLayoutComponent implements OnInit {
  language = localStorage.getItem('language') || 'en';

  constructor(
    private router: Router,) {
  }

  ngOnInit() {
  }

  changeLanguage() {
    if (this.language === 'en') {
      localStorage.setItem('language', 'ar');
    } else {
      localStorage.setItem('language', 'en');
    }
    window.location.reload();
  }

  logOut() {
    localStorage.removeItem('stcUserName');
    this.router.navigate(['/'])
  }

}
