import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/constant';
import { User } from 'src/user.model';
import { BehaviorSubject } from 'rxjs';
import { Profile } from 'src/app/store/state';
import { flatMatePostsLoadingEP, flatPostDeleteEP, flatPostUpdateEP, flatPostsLoadingEP, flatRequirementEP, flatmatePostDeleteEP, flatmatePostUpdateEP, flatmateRequirementEP, loadChatmatesEP, loadChatsEP, loginWithOtpEP, otpExpiryLoadEP, profileLoadingEP, profileUpdateEP, razorPayEP, resendOtpEP, sendMessageEP, updatePremiumEP, userRegisterEP, userVerifyEP, verifyOtpEP } from 'src/endpoint';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private socket: any
  mobNum = localStorage.getItem('userNum')

  constructor(private http: HttpClient) {
    this.socket = io('https://flatunity.online')

  }
  //api call for
  registerUser(userData: any): Observable<any> {
    return this.http.post<any>(userRegisterEP, userData);
  }
  otpSend(userLoginData: any): Observable<any> {
    return this.http.post<any>(loginWithOtpEP, userLoginData)
  }
  otpVerify(otpData: any): Observable<any> {
    return this.http.post<any>(verifyOtpEP, otpData)
  }
  private mobileNumberSource = new BehaviorSubject<string>('');

  mobileNumber$ = this.mobileNumberSource.asObservable();

  setMobileNumber(mobileNumber: any) {
    this.mobileNumberSource.next(mobileNumber);
  }
  roomMatepost(postData: any): Observable<any> {
    let mobNum = this.mobNum
    return this.http.post<any>(`${flatmateRequirementEP}?mobile=${mobNum}`, postData)
  }
  roomPost(roompostData: any): Observable<any> {
    let mobNum = this.mobNum
    return this.http.post<any>(`${flatRequirementEP}?mobile=${mobNum}`, roompostData)
  }
  loadposts(): Observable<any> {
    return this.http.get<any>(flatMatePostsLoadingEP)
  }
  loadroomposts(): Observable<any> {
    return this.http.get<any>(flatPostsLoadingEP)
  }
  loadProfile(userNum: string): Observable<any> {
    return this.http.get<any>(`${profileLoadingEP}?userNum=${userNum}`)
  }
  verifyUser(mail: string): Observable<any> {
    const data = { email: mail }
    return this.http.patch<any>(`${userVerifyEP}`, data)
  }
  deletePost(id: string): Observable<any> {
    return this.http.delete<any>(`${flatmatePostDeleteEP}?id=${id}`)
  }
  deleteRoomPost(id: string): Observable<any> {
    return this.http.delete<any>(`${flatPostDeleteEP}?id=${id}`)
  }
  updateProfile(formData: any): Observable<any> {
    let mobNum = this.mobNum
    return this.http.patch<any>(`${profileUpdateEP}?userNum=${mobNum}`, formData)
  }
  loadOtp(mobNum: number): Observable<any> {
    return this.http.get<any>(`${otpExpiryLoadEP}?userNum=${mobNum}`)
  }
  resendOtp(mobNum: number): Observable<any> {
    const data = { mobile: mobNum }
    return this.http.patch<any>(`${resendOtpEP}`, data)
  }
  updateRoomPost(formData: any, id: string): Observable<any> {
    return this.http.patch<any>(`${flatPostUpdateEP}?postId=${id}`, formData)
  }
  roomMatepostUpdate(formData: any, id: string): Observable<any> {
    return this.http.patch<any>(`${flatmatePostUpdateEP}?postId=${id}`, formData)
  }
  SubscribePremium(data: any): Observable<any> {
    return this.http.post<any>(`${razorPayEP}`, data);
  }
  paymentUpdate(duration: number, planName: string): Observable<any> {
    const mobile = localStorage.getItem('userNum')
    const data = { mobile, duration, planName }
    return this.http.patch<any>(`${updatePremiumEP}`, data);
  }
  sendMessage(data: any): Observable<any> {
    this.socket.emit('chat message', data)
    return this.http.post<any>(sendMessageEP, data);
  }
  loadChats(sender: string, reciever: string) {
    return this.http.get<any>(`${loadChatsEP}?sender=${sender}&reciever=${reciever}`)
  }
  loadChatmates(): Observable<any> {
    return this.http.get<any>(`${loadChatmatesEP}?userNum=${this.mobNum}`)
  }
  onNewMessage() {
    return new Observable<string>((observer) => {
      this.socket.on('chat message', (message: any) => {
        observer.next(message);
      });
    });
  }
}
