import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-products',
  templateUrl: './user-products.component.html',
  styles: [
  ]
})
export class UserProductsComponent implements OnInit {

  dataLoading:boolean = false;
  categoryList:any = [];
  categoriesAndProductsList:any = [];

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private translate: TranslateService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.dataLoading = true;
    this.userService.getAllCategories().subscribe(
      (data) => {
        this.dataLoading = false;
        if (data) {
          this.categoryList = data;
          this.categoryList.forEach(categoryName => {
            this.categoriesAndProductsList.push({
              categoryName: categoryName,
              categoryProducts: []
            })
            this.getProductsInCategory(categoryName);
          });
        }
      },
      (error) => {
        this.dataLoading = false;
      }
    );
  }

  getProductsInCategory(categoryName) {
    this.dataLoading = true;
    this.userService.getProductsInCategory(categoryName).subscribe(
      (data) => {
        this.dataLoading = false;
        if (data) {
          this.categoriesAndProductsList.forEach(element => {
            if(element.categoryName == categoryName) {
              element.categoryProducts = data;
            }
          });
          console.log(categoryName, this.categoriesAndProductsList);

        }
      },
      (error) => {
        this.dataLoading = false;
      }
    );
  }


  // openViewDialog(record:any = null) {
  //   const dialogRef = this.dialog.open(ProductFormComponent, {
  //     width: '450px',
  //     data: {
  //       record
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this.getAll(null);
  //     }
  //   });
  // }

  showError(msg) {
    this.toastr.error(msg);
  }

  showSuccess(msg) {
    this.toastr.success(msg);
  }

}
