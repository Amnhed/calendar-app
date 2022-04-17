const baseUrl = process.env.REACT_APP_API_URL // desde .env.development

const fetchSinToken = ( endpoint, data, method = 'GET' ) => {
    const url = `${ baseUrl }/${ endpoint }`;

    if ( method === 'GET' ) {
        return fetch( url )
    }  else {
        return fetch( url, {
            method,
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data )
        });
    }
}

const fetchConToken = ( endpoint, data, method = 'GET' ) => {
    const url = `${ baseUrl }/${ endpoint }`;
    //recupero el token si es null le asigno string vacio
    const token = localStorage.getItem() || '';
    //envio los header en el metodo GET
    if ( method === 'GET' ) {
        return fetch( url,{
            method: 'GET',
            headers:{
                'x-token':token
            },
        } )
    }  else {
        return fetch( url, {
            method,
            headers:{
                'Content-type': 'application/json',
                'x-token':token
            },
            body: JSON.stringify( data )
        });
    }
}

export {
    fetchSinToken,
    fetchConToken
}