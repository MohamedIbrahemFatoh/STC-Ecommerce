import {Component, isDevMode} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'GAC';

  constructor(public translate: TranslateService) {
    {
      const lang = localStorage.getItem('language') || 'en';
      translate.addLangs(['en', 'ar']);
      translate.setDefaultLang('en');
      translate.use(lang);
    }

    if (isDevMode()) {
      console.log('Development!');
    } else {
      console.log('Production!');
    }
  }
}
