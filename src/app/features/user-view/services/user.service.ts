import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from 'src/app/core/service/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService) {
  }

  getAllCategories() {
    return this.apiService
      .get(
        `${environment.apiUrl}/products/categories`
      )
      .pipe(catchError(this.handleError));
  }
  getProductsInCategory(Category) {
    return this.apiService
      .get(
        `${environment.apiUrl}/products/category/${Category}`
      )
      .pipe(catchError(this.handleError));
  }

  handleError(error) {
    return throwError(error);
  }
}
