import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ListFilter } from '../../classes/list-filter';
import { AdminService } from '../../services/admin.service';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styles: [
  ]
})
export class AdminProductsComponent implements OnInit {

  dataLoading = false;

  // table
  pageCount = 0;
  pageIndex = 0;
  recordsData: any = {};

  filterModel: ListFilter = new ListFilter();


  constructor(
    public dialog: MatDialog,
    private adminService: AdminService,
    private translate: TranslateService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.filterModel.per_page = 5;
    this.getAll(null);
  }

  getAll(event) {
    this.dataLoading = true;
    if (event) {
      this.pageIndex = event.pageIndex + 1;
      this.filterModel.page_number = this.pageIndex;
      this.filterModel.per_page = event.pageSize;
    } else {
      this.filterModel.page_number = 1;
    }

    this.adminService.getAllProducts(this.filterModel).subscribe(
      (data) => {
        this.dataLoading = false;
        if (data) {
          this.recordsData = data;
          this.pageCount = data.count_items;
          this.pageIndex = this.pageIndex - 1;
        }
      },
      (error) => {
        this.dataLoading = false;
      }
    );
  }


  openCreateDialog(record:any = null) {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '450px',
      data: {
        record
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAll(null);
      }
    });
  }




  deleteProduct(productId) {
    Swal.fire({
      title: 'Are you sure',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes delete it',
      cancelButtonText: 'No keep it',
    }).then((result) => {
      if (result.value) {
        this.dataLoading = true;
        this.adminService.deleteProduct(productId).subscribe(
          () => {
            this.dataLoading = false;
            Swal.fire({
              title: 'success',
              text: 'Deleted Successfully',
              icon: 'success',
              confirmButtonText: 'ok',
            });
            this.getAll(null)
          },
          (err) => {
            this.dataLoading = false;
            err.message.forEach((element) => {
              this.showError(element.message);
            });
          }
        );
      }
    });
  }


  showError(msg) {
    this.toastr.error(msg);
  }

  showSuccess(msg) {
    this.toastr.success(msg);
  }


}
