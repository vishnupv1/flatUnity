import { Injectable } from '@angular/core';
import { apiUrl } from 'src/constant';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { plan } from 'src/app/components/admin/plans/plans.component';

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
  loadPlans(): Observable<any> {
    return this.http.get<any>(`${apiUrl}/admin/loadPlans?`);
  }
  deletePlan(id: string) {
    return this.http.delete<any>(`${apiUrl}/admin/deletePlan?id=${id}`);
  }
  addPlan(formdata: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/admin/addPlan`, formdata);
  }
}
