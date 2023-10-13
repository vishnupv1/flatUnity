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
    console.log('postData');
    
    return this.http.post<any>(`${apiUrl}/roommateReqPost`, postData)
  }



}
