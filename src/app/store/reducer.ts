import { createReducer, on } from "@ngrx/store";
import { fetchRoommateReqSuccess, fetchUserSuccess, fetchRoomReqSuccess } from "./action";

let initalState: any[] = []
let postInitalState: any[] = []
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