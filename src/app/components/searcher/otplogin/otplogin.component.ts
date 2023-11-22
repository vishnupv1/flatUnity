import { Component, HostListener, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserServiceService } from 'src/app/services/userServices/user-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Input } from '@angular/core';



@Component({
  selector: 'app-otplogin',
  templateUrl: './otplogin.component.html',
  styleUrls: ['./otplogin.component.css']
})

export class OtploginComponent {
  submit: boolean = false
  userToken!: string
  mobNUm: any
  timeLeft: number = 60;
  interval: any;
  showResendButton: boolean = false

  constructor(private fb: FormBuilder,
    private userService: UserServiceService,
    private router: Router,
    private toastr: ToastrService) { }

  //passing mobile number from parent
  @Input() mobileNumber: any
  otpForm!: FormGroup
  //subscribing the mobile number from login component
  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--
      } else {
        this.showResendButton = true
      }
    }, 1000)
  }
  ngOnInit() {
    this.userService.mobileNumber$.subscribe((mobileNumber) => {
      this.mobNUm = mobileNumber;
      this.mobileNumber = this.mobNUm.value;
      this.otpForm = this.fb.group({
        otp1: ['', [Validators.required, this.SingleDigitValidator]],
        otp2: ['', [Validators.required, this.SingleDigitValidator]],
        otp3: ['', [Validators.required, this.SingleDigitValidator]],
        otp4: ['', [Validators.required, this.SingleDigitValidator]],
        otp5: ['', [Validators.required, this.SingleDigitValidator]],
        otp6: ['', [Validators.required, this.SingleDigitValidator]],
        mobile: [this.mobileNumber, [Validators.required]],
      })
    });
    this.startTimer()
  }
  //form model and validation

  //form submission
  onSubmit() {
    if (!this.otpForm.valid) {
      this.toastr.warning('Enter 6 numbers', '', {
        timeOut: 2000,
        progressAnimation: 'increasing',
        progressBar: true,
      })
      return
    }
    else {
      this.submit = true
      this.otpVerify()
    }
  }
  //calling the otp verify method in user service ts file
  otpVerify() {
    this.userService.otpVerify(this.otpForm.value as any).subscribe(
      (response) => {
        this.userToken = response.userToken
        localStorage.setItem('userToken', response.userToken);
        localStorage.setItem('userNum', response.mobile)
        this.toastr.success(response.message, 'Success', {
          timeOut: 2000,
          progressAnimation: 'increasing',
          progressBar: true
        })
        this.router.navigate(['/home'])
      }, (error) => {
        this.toastr.error(error.error.message, 'Error', {
          timeOut: 2000,
          progressAnimation: 'increasing',
          progressBar: true
        })
      })
  }
  //validating the otp input fields and restricting for one number
  SingleDigitValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      const digitPattern = /^[0-9]$/;
      if (!digitPattern.test(value)) {
        return { invalidDigit: true };
      }
      return null;
    };
  }
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    if (this.otpForm.dirty) {
      $event.returnValue = true;
    }
  }
  resendOtp() {
    this.userService.resendOtp(this.mobNUm.value).subscribe(
      (response) => {
        this.toastr.success(response.message, 'Success', {
          timeOut: 2000,
          progressAnimation: 'increasing',
          progressBar: true
        })
        this.showResendButton = false
        this.timeLeft = 60
      }, (error) => {
        this.toastr.error(error.error.message, 'Error', {
          timeOut: 2000,
          progressAnimation: 'increasing',
          progressBar: true
        })
      })
  }

}

