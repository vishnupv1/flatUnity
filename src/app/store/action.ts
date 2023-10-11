import { createAction, props } from "@ngrx/store";

export const fetchUser = createAction(
    '[User API] fetch user API'
)
export const fetchUserSuccess = createAction(
    '[User API Success] fetch user API Success',
    props<{ allUser: any[] }>()
)

