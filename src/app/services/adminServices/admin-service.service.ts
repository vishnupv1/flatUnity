import { Injectable } from '@angular/core';
import { apiUrl } from 'src/constant';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private http: HttpClient) { }
  adminLogin(adminData: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/admin/login`, adminData);
  }
}
