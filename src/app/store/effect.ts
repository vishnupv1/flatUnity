import { Injectable } from "@angular/core";
import { ofType, Actions, createEffect } from "@ngrx/effects";
import { fetchRoommateReq, fetchRoommateReqSuccess, fetchUser, fetchUserSuccess } from "./action";
import { AdminServiceService } from "../services/adminServices/admin-service.service";
import { map, switchMap } from "rxjs";
import { UserServiceService } from "../services/userServices/user-service.service";



@Injectable()
export class userEffects {
    constructor(private action$: Actions, private adminService: AdminServiceService, private userService: UserServiceService) { }
    loadAllUsers$ = createEffect(() =>
        this.action$.pipe(ofType(fetchUser), switchMap(() => {
            return this.adminService.loadUser().pipe(map((data) =>
                fetchUserSuccess({ allUser: Object.values(data) })))
        })))
    loadAllRoommateReq$ = createEffect(() =>
        this.action$.pipe(ofType(fetchRoommateReq), switchMap(() => {
            return this.userService.loadposts().pipe(map((data) =>
                fetchRoommateReqSuccess({ posts: Object.values(data) })))
        })))
}