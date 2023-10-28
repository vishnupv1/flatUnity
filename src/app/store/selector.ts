import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Profile } from "./state";



export const userSelectorState = createFeatureSelector<any[]>('users')
export const userSelectorData = createSelector(userSelectorState, (state: any[]) => { return state })

export const postSelectorState = createFeatureSelector<any[]>('posts')
export const postSelectorData = createSelector(postSelectorState, (state: any[]) => { return state })

export const roompostSelectorState = createFeatureSelector<any[]>('roomposts')
export const roompostSelectorData = createSelector(roompostSelectorState, (state: any[]) => { return state })

export const profileSelectorState = createFeatureSelector<Profile[]>('profile')
export const profileSelectorData = createSelector(profileSelectorState, (state: Profile[]) => { return state })