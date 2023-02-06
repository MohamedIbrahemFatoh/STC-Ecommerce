import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styles: [
  ]
})
export class ProductFormComponent implements OnInit {

  Loading:boolean = false;
  updateMode:boolean = false;
  formGroup: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public Ddata: any,
    public dialogRef: MatDialogRef<ProductFormComponent>,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private adminService: AdminService,
    public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    console.log(this.Ddata);

    if(this.Ddata?.record) {
      this.updateMode = true;
      this.bindData();
    }
  }

  buildForm() {
    this.formGroup = this.formBuilder.group({
      title: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      category: [null, Validators.required],
    });
  }

  bindData() {
    this.formGroup.controls.title.setValue(this.Ddata.record.title);
    this.formGroup.controls.price.setValue(this.Ddata.record.price);
    this.formGroup.controls.description.setValue(this.Ddata.record.description);
    this.formGroup.controls.category.setValue(this.Ddata.record.category);
  }

  hasError(controlName: string, errorName: string) {
    return this.formGroup.controls[controlName].hasError(errorName);
  }

  submit() {
    if (this.formGroup.valid) {
      this.Loading = true;
      const model = {
        title: this.formGroup.controls.title.value,
        price: this.formGroup.controls.price.value,
        description: this.formGroup.controls.description.value,
        category: this.formGroup.controls.category.value,
      };

      if (this.Ddata?.record) {
        this.adminService.editProduct(model, this.Ddata.record.id).subscribe(
          (res) => {
            this.Loading = false;
            this.showSuccess(this.translate.instant('Product Updated Successfully'));
            this.dialogRef.close(true);
          },
          (err) => {
            this.Loading = false;
            this.showError(err.message);
          }
        );
      }
      else {
        this.adminService.addProduct(model).subscribe(
          (res) => {
            this.Loading = false;
            this.showSuccess(this.translate.instant('Product Added Successfully'));
            this.dialogRef.close(true);
          },
          (err) => {
            this.Loading = false;
            this.showError(err.message);
          }
        );
      }
    }
  }

  showError(msg) {
    this.toastr.error(msg);
  }

  showSuccess(msg) {
    this.toastr.success(msg);
  }

}
