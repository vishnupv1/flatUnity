import { Injectable } from '@angular/core';
import { apiUrl } from 'src/constant';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { plan } from 'src/app/components/admin/plans/plans.component';
import { addPlanEP, adminLoginEP, blockUserEP, deletePlanEP, editPlanEP, loadPlansEP, loadUsersEP, unblockOrBlockUserEP } from 'src/endpoint';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private http: HttpClient) { }
  adminLogin(adminData: any): Observable<any> {
    return this.http.post<any>(adminLoginEP, adminData);
  }
  loadUser() {
    return this.http.get(loadUsersEP)
  }
  blockUser(id: any) {
    return this.http.get(`${blockUserEP}?id=${id}`)
  }
  unBlockUser(id: any) {
    return this.http.patch(`${unblockOrBlockUserEP}?id=${id}`, {});
  }
  loadPlans(): Observable<any> {
    return this.http.get<any>(loadPlansEP);
  }
  deletePlan(id: string) {
    return this.http.delete<any>(`${deletePlanEP}?id=${id}`);
  }
  addPlan(formdata: any): Observable<any> {
    return this.http.post<any>(addPlanEP, formdata);
  }
  editPlan(formdata: any, id: string): Observable<any> {
    return this.http.patch<any>(`${editPlanEP}?id=${id}`, formdata);
  }
}
