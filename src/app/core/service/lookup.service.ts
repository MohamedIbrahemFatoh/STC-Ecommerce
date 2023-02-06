import {catchError} from 'rxjs/operators';
import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {throwError} from 'rxjs';

@Injectable({providedIn: 'root'})
export class LookupsService {
  constructor(private apiService: ApiService) {
  }

  getMenu() {
    return this.apiService
      .post(`${environment.apiUrl}/api/system/get_permissions_link`)
      .pipe(catchError(this.handleError));
  }

  getAllMainSchemesWithScopes() {
    return this.apiService
      .get(`${environment.apiUrl}/api/system/get_all_scopes_search`)
      .pipe(catchError(this.handleError));
  }


  handleError(error) {
    return throwError(error);
  }
}
