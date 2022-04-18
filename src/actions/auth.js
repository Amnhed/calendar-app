import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { types } from "../types/types";

export const startLogin = ( email, password ) => {
    return async( dispatch ) => {
        //llama el end point api 'auth'
        const resp = await fetchSinToken( 'auth', { email,password }, 'POST');
        const body = await resp.json();
        //console.log(body)
        //SI el ok del reponse regreso true
        if( body.ok ) {
            //guardo en el local storage el token y la hora no es inf sensisble por que no la pueden modificar
            //guardo el token en el local storage
            localStorage.setItem('token', body.token);
            //y la hora en que se guardo
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch( login({
                uid:body.uid,
                name: body.name
            }) )
        } else {
            Swal.fire('Error', body.msg, 'error')
        }
    }
}

//registro de usuario
export const startRegister = (email,password, name) =>{
    return async( dispatch ) => {
        //llama el end point api 'auth'
        const resp = await fetchConToken( 'auth/new', { email,password, name }, 'POST');
        const body = await resp.json();
        //console.log(body)
        //SI el ok del reponse regreso true
        if( body.ok ) {
            //guardo en el local storage el token y la hora no es inf sensisble por que no la pueden modificar
            //guardo el token en el local storage
            localStorage.setItem('token', body.token);
            //y la hora en que se guardo
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch( login({
                uid:body.uid,
                name: body.name
            }) )
        } else {
            Swal.fire('Error', body.msg, 'error')
        }
    }
}

//revisar expiracion del token GET
export const startCheking = () =>{
    return async( dispatch ) => {
        //llama el end point api 'auth/renew' 'GET'
        const resp = await fetchConToken( 'auth/renew' );
        const body = await resp.json();
        console.log(body)
        //SI el ok del reponse regreso true
        if( body.ok ) {
            //guardo en el local storage el token y la hora no es inf sensisble por que no la pueden modificar
            //guardo el token en el local storage
            localStorage.setItem('token', body.token);
            //y la hora en que se guardo
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch( login({
                uid:body.uid,
                name: body.name
            }) )
        } else {
            //si el token no es correcto

            Swal.fire('Error', body.msg, 'error')
            //cambio el checking a false
            dispatch( checkingFinish() );
        }
    }

}

//se implementa revisar expiracion  auth.jsdel token GET linea74
//declaron en authReducer.js
const checkingFinish = () => ({
    type: types.authCheckingFinish
})

//Accion syncrona solo la ocupo aqui
const  login = ( user ) => ({
    type: types.authLogin,
    payload: user
})
//limpio el localSTorage y llamo logout linea 103
export const startLogout = () => {
    return ( dispatch ) => {
        localStorage.clear();
        dispatch( logout());
    }
}

const logout = () => ({ type:types.authLogout})