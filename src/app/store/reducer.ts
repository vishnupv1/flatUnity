import { createReducer, on } from "@ngrx/store";
import { fetchUserSuccess } from "./action";

let initalState: any[] = []
const _userReducer = createReducer(initalState,
    on(fetchUserSuccess, (_state, { allUser }) => {
        return Object.values(allUser[0])
    })
)
export function userReducer(state: any, action: any) {
    return _userReducer(state, action);
}