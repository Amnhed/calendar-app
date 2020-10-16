import { combineReducers } from 'redux';

import { uiReducer } from "./uiReducer";
// combine reducers

export const rootReducer = combineReducers({
// This is how the store will look
    ui: uiReducer,
})