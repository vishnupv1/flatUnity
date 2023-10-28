import { createAction, props } from "@ngrx/store";
import { Profile } from "./state";


//fetch userProfile
export const fetchProfile = createAction(
    '[Profile API] fetch profile API'
)
export const fetchProfileSuccess = createAction(
    '[Profile API Success] fetch profile API Success',
    props<{ profile: Profile[] }>()
)

//fetch all users
export const fetchUser = createAction(
    '[User API] fetch user API'
)
export const fetchUserSuccess = createAction(
    '[User API Success] fetch user API Success',
    props<{ allUser: any[] }>()
)

//fetch roommate requirement posts
export const fetchRoommateReq = createAction(
    '[RoommateReq API] RoommateReq API'
)
export const fetchRoommateReqSuccess = createAction(
    '[RoommateReq API Success] RoommateReq API Success',
    props<{ posts: any[] }>()
)

//fetch room requirement posts
export const fetchRoomReq = createAction(
    '[RoomReq API] RoomReq API'
)
export const fetchRoomReqSuccess = createAction(
    '[RoomReq API Success] RoomReq API Success',
    props<{ roomposts: any[] }>()
)

