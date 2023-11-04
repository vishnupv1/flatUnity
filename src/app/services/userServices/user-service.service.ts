import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/constant';
import { User } from 'src/user.model';
import { BehaviorSubject } from 'rxjs';
import { Profile } from 'src/app/store/state';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  mobNum = localStorage.getItem('userNum')

  constructor(private http: HttpClient) { }
  //api call for
  registerUser(userData: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/register`, userData);
  }
  otpSend(userLoginData: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/loginWithOtp`, userLoginData)
  }
  otpVerify(otpData: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/verifyOtp`, otpData)
  }
  private mobileNumberSource = new BehaviorSubject<string>('');

  mobileNumber$ = this.mobileNumberSource.asObservable();

  setMobileNumber(mobileNumber: any) {
    this.mobileNumberSource.next(mobileNumber);
  }
  roomMatepost(postData: any): Observable<any> {
    let mobNum = this.mobNum
    return this.http.post<any>(`${apiUrl}/roommateReqPost?mobile=${mobNum}`, postData)
  }
  roomPost(roompostData: any): Observable<any> {
    let mobNum = this.mobNum
    return this.http.post<any>(`${apiUrl}/roomReqPost?mobile=${mobNum}`, roompostData)
  }
  loadposts(): Observable<any> {
    return this.http.get<any>(`${apiUrl}/loadposts`)
  }
  loadroomposts(): Observable<any> {
    return this.http.get<any>(`${apiUrl}/loadroomposts`)
  }
  loadProfile(userNum: string): Observable<any> {
    return this.http.get<any>(`${apiUrl}/loadProfile?userNum=${userNum}`)
  }
  verifyUser(mail: string): Observable<any> {
    const data = { email: mail }
    return this.http.patch<any>(`${apiUrl}/verify`, data)
  }
  deletePost(id: string): Observable<any> {
    return this.http.delete<any>(`${apiUrl}/deletePost?id=${id}`)
  }
  deleteRoomPost(id: string): Observable<any> {
    return this.http.delete<any>(`${apiUrl}/deleteRoomPost?id=${id}`)
  }
  updateProfile(formData: any): Observable<any> {
    let mobNum = this.mobNum
    return this.http.patch<any>(`${apiUrl}/updateProfile?userNum=${mobNum}`, formData)
  }
  loadOtp(mobNum: number): Observable<any> {
    return this.http.get<any>(`${apiUrl}/loadOtpexpiry?userNum=${mobNum}`)
  }
  resendOtp(mobNum: number): Observable<any> {
    const data = { mobile: mobNum }
    return this.http.patch<any>(`${apiUrl}/resendOtp`, data)
  }
}
