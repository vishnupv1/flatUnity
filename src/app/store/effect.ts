import { Injectable } from "@angular/core";
import { ofType, Actions, createEffect } from "@ngrx/effects";
import { fetchUser, fetchUserSuccess } from "./action";
import { AdminServiceService } from "../services/adminServices/admin-service.service";
import { map, switchMap } from "rxjs";



@Injectable()
export class userEffects {
    constructor(private action$: Actions, private adminService: AdminServiceService) { }
    loadAllUsers$ = createEffect(() =>
        this.action$.pipe(ofType(fetchUser), switchMap(() => {
            return this.adminService.loadUser().pipe(map((data) =>
                fetchUserSuccess({ allUser: Object.values(data) })))
        })))
}