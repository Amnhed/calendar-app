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
                ...action.payload,
                checking:false
            }
            break;
        case types.authCheckingFinish:
            return {
                ...state,
                checking:false
            }
    
        default:
            return state;
    }
}