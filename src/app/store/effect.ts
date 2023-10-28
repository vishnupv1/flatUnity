import { Injectable } from "@angular/core";
import { ofType, Actions, createEffect } from "@ngrx/effects";
import { fetchRoommateReq, fetchRoommateReqSuccess, fetchUser, fetchUserSuccess, fetchRoomReq, fetchRoomReqSuccess, fetchProfile, fetchProfileSuccess } from "./action";
import { AdminServiceService } from "../services/adminServices/admin-service.service";
import { map, switchMap, tap } from "rxjs";
import { UserServiceService } from "../services/userServices/user-service.service";



@Injectable()
export class userEffects {
    userNum: string | null = localStorage.getItem('userNum')
    constructor(private action$: Actions, private adminService: AdminServiceService, private userService: UserServiceService) { }
    loadProfile$ = createEffect(() =>
        this.action$.pipe(ofType(fetchProfile), switchMap(() => {
            return this.userService.loadProfile(this.userNum!).pipe(
                map((data) =>
                    fetchProfileSuccess({ profile: Object.values(data) })))
        })))
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
    loadAllRoomReq$ = createEffect(() =>
        this.action$.pipe(ofType(fetchRoomReq), switchMap(() => {
            return this.userService.loadroomposts().pipe(map((data) =>
                fetchRoomReqSuccess({ roomposts: Object.values(data) })))
        })))
}