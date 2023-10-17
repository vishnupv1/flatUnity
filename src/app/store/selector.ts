import { createFeatureSelector, createSelector } from "@ngrx/store";



export const userSelectorState = createFeatureSelector<any[]>('users')
export const userSelectorData = createSelector(userSelectorState, (state: any[]) => { return state })

export const postSelectorState = createFeatureSelector<any[]>('posts')
export const postSelectorData = createSelector(postSelectorState, (state: any[]) => { return state })
