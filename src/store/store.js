import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "../reducers/rootReducer";

// Obtengo composeEnhancers de las intrucciones de redux  redux-devtools-extension
//https://github.com/zalmoxisus/redux-devtools-extension#usage
//importo el compose
//Si ecisten las herrmientas las configurara de otra forma lo deja pasar

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
//APlico el middleware thunk
export const store = createStore(
    rootReducer,
    composeEnhancers( 
        applyMiddleware(thunk) 
    )
);