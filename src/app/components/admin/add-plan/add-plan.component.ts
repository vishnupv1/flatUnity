import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminServiceService } from 'src/app/services/adminServices/admin-service.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.component.html',
  styleUrls: ['./add-plan.component.css']
})
export class AddPlanComponent {
  subscriptionForm: FormGroup;

  constructor(private fb: FormBuilder,
    private admin: AdminServiceService,
    private toastr: ToastrService,
    private router: Router,
    private dialog: MatDialog) {
    this.subscriptionForm = this.fb.group({
      planName: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
      duration: [1, [Validators.required, Validators.min(1), Validators.max(12)]],
      features: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
  ngOnInit(): void { }
  onSubmit() {
    if (!this.subscriptionForm.valid) {
      if (this.nameError()) {
        this.toastr.warning(this.nameError(), '', {
          timeOut: 1000,
          progressAnimation: 'increasing',
          progressBar: true,
        })
        return
      }
      if (this.amountError()) {
        this.toastr.warning(this.amountError(), '', {
          timeOut: 1000,
          progressAnimation: 'increasing',
          progressBar: true,
        })
        return
      }
      if (this.durationError()) {
        this.toastr.warning(this.durationError(), '', {
          timeOut: 1000,
          progressAnimation: 'increasing',
          progressBar: true,
        })
        return
      }
      if (this.featuresError()) {
        this.toastr.warning(this.featuresError(), '', {
          timeOut: 1000,
          progressAnimation: 'increasing',
          progressBar: true,
        })
        return
      }
    } else {
      this.addPlan()
    }
  }

  nameError(): any {
    const planName = this.subscriptionForm.get('planName')
    if (!planName?.valid) {
      if (planName?.hasError('required')) {
        return 'Name required'
      }
      else if (planName?.hasError('minlength')) {
        return 'Minimum length of Name should be three'
      }
    }
    return
  }
  amountError(): any {
    const amount = this.subscriptionForm.get('amount')
    if (!amount?.valid) {
      if (amount?.hasError('required')) {
        return 'Amount required'
      } else if (amount?.hasError('min')) {
        return `Amount should'nt be 0`
      }
    }
    return
  }
  durationError(): any {
    const duration = this.subscriptionForm.get('duration')
    if (!duration?.valid) {
      if (duration?.hasError('required')) {
        return 'Duration required'
      }
      else if (duration?.hasError('min')) {
        return 'Minimum one month'
      }
      else if (duration?.hasError('max')) {
        return 'Maximum 12 months'
      }
    }
    return
  }
  featuresError(): any {
    const features = this.subscriptionForm.get('features')
    if (!features?.valid) {
      if (features?.hasError('required')) {
        return 'features required'
      } else if (features?.hasError('min')) {
        return `features should'nt be 0`
      }
    }
    return
  }
  addPlan() {
    const formData = this.subscriptionForm.value;
    this.admin.addPlan(formData).subscribe((res) => {
      this.toastr.success(res.message, 'Success', {
        timeOut: 1000,
        progressAnimation: 'increasing',
        progressBar: true
      })
      this.dialog.closeAll()
    })
  }

}
