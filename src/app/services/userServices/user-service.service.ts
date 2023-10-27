import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/constant';
import { User } from 'src/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }
  //api call for
  registerUser(userData: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/register`, userData);
  }
  otpSend(userLoginData: any) {
    return this.http.post<any>(`${apiUrl}/loginWithOtp`, userLoginData)
  }
  otpVerify(otpData: any) {
    return this.http.post<any>(`${apiUrl}/verifyOtp`, otpData)
  }
  private mobileNumberSource = new BehaviorSubject<string>('');

  mobileNumber$ = this.mobileNumberSource.asObservable();

  setMobileNumber(mobileNumber: any) {
    this.mobileNumberSource.next(mobileNumber);
  }
  roomMatepost(postData: any) {
    let mobNum = localStorage.getItem('userNum')
    return this.http.post<any>(`${apiUrl}/roommateReqPost?mobile=${mobNum}`, postData)
  }
  roomPost(roompostData: any) {
    console.log(roompostData);

    let mobNum = localStorage.getItem('userNum')
    return this.http.post<any>(`${apiUrl}/roomReqPost?mobile=${mobNum}`, roompostData)
  }
  loadposts() {
    return this.http.get(`${apiUrl}/loadposts`)
  }
  loadroomposts() {
    return this.http.get(`${apiUrl}/loadroomposts`)

  }
  verifyUser(mail: string) {
    const data = { email: mail }
    return this.http.patch(`${apiUrl}/verify`, data)
  }


}
