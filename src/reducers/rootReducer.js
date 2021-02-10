import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { calendarReducer } from './calendarReducer';
import { uiReducer } from "./uiReducer";
// combine reducers

//cuando agrego el reducer ya lo puedo ver en el impertor de 
//navedador en redu/ state
export const rootReducer = combineReducers({
// This is how the store will look
    ui: uiReducer,
    calendar: calendarReducer,
    auth: authReducer
})