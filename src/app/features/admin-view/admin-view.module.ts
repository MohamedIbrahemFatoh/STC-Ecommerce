import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminViewRoutingModule } from './admin-view-routing.module';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductFormComponent } from './components/product-form/product-form.component';


@NgModule({
  declarations: [
    AdminProductsComponent,
    ProductFormComponent,
  ],
  imports: [
    CommonModule,
    AdminViewRoutingModule,
    SharedModule
  ]
})
export class AdminViewModule { }
