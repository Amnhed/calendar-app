import { combineReducers } from 'redux';
import { calendarReducer } from './calendarReducer';
import { uiReducer } from "./uiReducer";
// combine reducers

export const rootReducer = combineReducers({
// This is how the store will look
    ui: uiReducer,
    calendar: calendarReducer,
})