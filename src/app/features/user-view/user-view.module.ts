import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserViewRoutingModule } from './user-view-routing.module';
import { UserProductsComponent } from './components/user-products/user-products.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    UserProductsComponent
  ],
  imports: [
    CommonModule,
    UserViewRoutingModule,
    SharedModule
  ]
})
export class UserViewModule { }
