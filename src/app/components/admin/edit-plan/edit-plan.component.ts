import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AdminServiceService } from 'src/app/services/adminServices/admin-service.service';
import { plan } from '../plans/plans.component';
import { Store, select } from '@ngrx/store';
import { fetchPlan } from 'src/app/store/action';
import { planSelectorData } from 'src/app/store/selector';
import { Observable, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.css']
})
export class EditPlanComponent {
  planForm!: FormGroup
  planId!: string
  plans$!: Observable<any[]>
  plansss!: plan[]
  plan$!: Observable<any[]>
  featuresString!: string

  planName!: string
  duration!: string
  amount!: string
  arrayFeature!: string[]


  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private admin: AdminServiceService,
    private store: Store<{ plans: any[] }>,
    private toastr: ToastrService,
    private dialog: MatDialog) {
    this.planId = this.data.id
    this.planForm = this.fb.group({
      planName: [this.planName, Validators.required],
      amount: [this.amount, [Validators.required, Validators.min(1)]],
      duration: [this.duration, [Validators.required, Validators.min(1), Validators.max(12)]],
      features: [this.featuresString, [Validators.required, Validators.minLength(4)]],
    })
  }
  ngOnInit() {
    this.store.dispatch(fetchPlan())
    this.plans$ = this.store.pipe(select(planSelectorData))

    this.plans$.subscribe((data) => {
      ''
      if (data.length > 0) {
        const selectedData = data.find((plan) => {
          return plan._id == this.planId
        })
        this.planName = selectedData.planName;
        this.duration = selectedData.duration;
        this.amount = selectedData.amount;
        this.featuresString = selectedData.features.join(',')
        this.planForm.patchValue(selectedData);
      }
    });
  }

  onSubmit() {
    if (!this.planForm.valid) {
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
      this.editPlan()
    }
  }

  nameError(): any {
    const planName = this.planForm.get('planName')
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
    const amount = this.planForm.get('amount')
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
    const duration = this.planForm.get('duration')
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
    const features = this.planForm.get('features')
    if (!features?.valid) {
      if (features?.hasError('required')) {
        return 'features required'
      } else if (features?.hasError('min')) {
        return `features should'nt be 0`
      }
    }
    return
  }
  editPlan() {
    const formData = this.planForm.value;

    this.admin.editPlan(formData, this.planId).subscribe((res) => {
      this.toastr.success(res.message, 'Success', {
        timeOut: 1000,
        progressAnimation: 'increasing',
        progressBar: true
      })
      this.dialog.closeAll()
    })
  }

}
