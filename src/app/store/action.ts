import { createAction, props } from "@ngrx/store";

export const fetchUser = createAction(
    '[User API] fetch user API'
)
export const fetchUserSuccess = createAction(
    '[User API Success] fetch user API Success',
    props<{ allUser: any[] }>()
)
export const fetchRoommateReq = createAction(
    '[RoommateReq API] RoommateReq API'
)
export const fetchRoommateReqSuccess = createAction(
    '[RoommateReq API Success] RoommateReq API Success',
    props<{ posts: any[] }>()
)

