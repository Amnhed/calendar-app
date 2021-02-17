import Swal from "sweetalert2";
import { fetchSinToken } from "../helpers/fetch"
import { types } from "../types/types";

export const startLogin = ( email, password ) => {
    return async( dispatch ) => {
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

//Accion syncrona solo la ocupo aqui
const  login = ( user ) => ({
    type: types.authLogin,
    payload: user
})