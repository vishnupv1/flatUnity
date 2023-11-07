import { createReducer, on } from "@ngrx/store";
import { fetchRoommateReqSuccess, fetchUserSuccess, fetchRoomReqSuccess, fetchProfileSuccess, fetchPlan, fetchPlanSuccess } from "./action";
import { Profile } from "./state";

let initalState: any[] = []
let postInitalState: any[] = []
export const profileinitial: Profile[] = []


const _profileReducer = createReducer(profileinitial,
    on(fetchProfileSuccess, (_state, { profile }) => {
        return [...Object.values(profile)]
    })
)
export function profileReducer(state: any, action: any) {
    return _profileReducer(state, action);
}

const _userReducer = createReducer(initalState,
    on(fetchUserSuccess, (_state, { allUser }) => {
        return Object.values(allUser[0])
    })
)
export function userReducer(state: any, action: any) {
    return _userReducer(state, action);
}




const _postsReducer = createReducer(postInitalState,
    on(fetchRoommateReqSuccess, (_state, { posts }) => {
        return Object.values(posts[0])
    })
)
export function postsReducer(state: any, action: any) {
    return _postsReducer(state, action);
}

const _roompostsReducer = createReducer(postInitalState,
    on(fetchRoomReqSuccess, (_state, { roomposts }) => {
        return Object.values(roomposts[0])
    })
)
export function roompostReducer(state: any, action: any) {
    return _roompostsReducer(state, action);
}

const _planreducer = createReducer(initalState,
    on(fetchPlanSuccess, (_state, { plans }) => {
        return Object.values(plans[0])
    })
)
export function plansReducer(state: any, action: any) {
    return _planreducer(state, action);
}