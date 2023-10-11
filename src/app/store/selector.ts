import { createFeatureSelector, createSelector } from "@ngrx/store";



export const userSelectorState = createFeatureSelector<any[]>('users')
export const userSelectorData = createSelector(userSelectorState, (state: any[]) => { return state })