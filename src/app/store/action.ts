import { createAction, props } from "@ngrx/store";

export const fetchUser = createAction(
    '[User API] fetch user API'
)
export const fetchUserSuccess = createAction(
    '[User API Success] fetch user API Success',
    props<{ allUser: any[] }>()
)
//roommateposts
export const fetchRoommateReq = createAction(
    '[RoommateReq API] RoommateReq API'
)
export const fetchRoommateReqSuccess = createAction(
    '[RoommateReq API Success] RoommateReq API Success',
    props<{ posts: any[] }>()
)

//roomposts
export const fetchRoomReq = createAction(
    '[RoomReq API] RoomReq API'
)
export const fetchRoomReqSuccess = createAction(
    '[RoomReq API Success] RoomReq API Success',
    props<{ roomposts: any[] }>()
)

