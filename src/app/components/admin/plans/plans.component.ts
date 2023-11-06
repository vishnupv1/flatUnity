import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AdminServiceService } from 'src/app/services/adminServices/admin-service.service';
import { PlanDeleteConfirmationComponent } from '../plan-delete-confirmation/plan-delete-confirmation.component';
import { AddPlanComponent } from '../add-plan/add-plan.component';
export interface plan {
  _id: string,
  planName: string,
  amount: number,
  duration: string,
  features: string[]
}
@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})

export class PlansComponent {

  plans!: plan[]
  constructor(private adminService: AdminServiceService, private toastr: ToastrService, private router: Router, private dialog: MatDialog) { }
  ngOnInit(): void {
    this.adminService.loadPlans().subscribe((res) => {
      this.plans = res.plans
    })
  }
  openDeleteConfirmation(id: any): void {
    const dialogRef = this.dialog.open(PlanDeleteConfirmationComponent, {
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'delete') {
        this.deletePlan(id)
      }
    });
  }
  deletePlan(id: string) {
    this.adminService.deletePlan(id).subscribe((res) => {
      this.toastr.success(res.message, 'Success', {
        timeOut: 1000,
        progressAnimation: 'increasing',
        progressBar: true
      })
      this.ngOnInit()
    })
  }
  openAddForm() {
    const dialogRef = this.dialog.open(AddPlanComponent, {
      width: 'auto',
      maxWidth: '95vw',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit()
    });
  }
}
