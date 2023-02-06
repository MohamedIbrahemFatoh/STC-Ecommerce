import {ShortNamePipe} from './pipes/shortName.pipe';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TranslateModule} from '@ngx-translate/core';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RECAPTCHA_SETTINGS, RecaptchaModule, RecaptchaSettings,} from 'ng-recaptcha';
import {environment} from 'src/environments/environment';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MaterialModule} from './modules/material.module';
import {DndDirective} from './directive/dnd.directive';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {OnlynumberDirective} from './directive/only-num.directive';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {NoPermissionComponent} from './components/no-permission/no-permission.component';

@NgModule({
  declarations: [
    ShortNamePipe,
    DndDirective,
    OnlynumberDirective,
    PageNotFoundComponent,
    NoPermissionComponent,
  ],
  imports: [
    CommonModule,

    MaterialModule,
    RecaptchaModule,
    FormsModule,
    ReactiveFormsModule,
    // TranslateModule.forRoot({}),
    TranslateModule.forChild({}),
    NgbModule,
  ],

  exports: [
    TranslateModule,
    MaterialModule,
    RecaptchaModule,
    FormsModule,
    ReactiveFormsModule,
    ShortNamePipe,
    DndDirective,
    NgbModule,
    OnlynumberDirective,
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,

      useValue: {
        siteKey: environment.googleSiteKey,
        useValue: localStorage.getItem('language') || 'en',
      } as RecaptchaSettings,
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {appearance: 'outline'},
    },
  ],
})
export class SharedModule {
}
