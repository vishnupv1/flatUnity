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
  loadUser() {
    return this.http.get(`${apiUrl}/admin/loadUsers`)
  }
  blockUser(id: any) {
    return this.http.get(`${apiUrl}/admin/blockUser?id=${id}`)
  }
  unBlockUser(id: any) {
    return this.http.patch(`${apiUrl}/admin/unBlocOrBlockkUser?id=${id}`, {});
  }
}
