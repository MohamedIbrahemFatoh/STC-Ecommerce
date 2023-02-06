import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from 'src/app/core/service/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private apiService: ApiService) {
  }

  getAllProducts(filterModel) {
    return this.apiService
      .get(
        `${environment.apiUrl}/products?limit=${filterModel.per_page}`
      )
      .pipe(catchError(this.handleError));
  }

  addProduct(modal) {
    return this.apiService
      .post(
        `${environment.apiUrl}/products`,
        modal
      )
      .pipe(catchError(this.handleError));
  }

  editProduct(modal, productd) {
    return this.apiService
      .update(
        `${environment.apiUrl}/products/${productd}`,
        modal
      )
      .pipe(catchError(this.handleError));
  }

  deleteProduct(id) {
    return this.apiService
      .remove(
        `${environment.apiUrl}/products/${id}`
      )
      .pipe(catchError(this.handleError));
  }

  handleError(error) {
    return throwError(error);
  }
}
