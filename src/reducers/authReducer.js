import { types } from "../types/types";

const initalstate = {
    checking: true,
    //uid: null,
    //name: null
}

export const authReducer = (state = initalstate, action) => {
    switch (action.type) {
        case types.authLogin:
            return{
                ...state,
                checking:false,
                ...action.payload
            }
            break;
    
        default:
            return state;
    }
}