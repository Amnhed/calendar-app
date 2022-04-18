import React, { useEffect } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from "react-router-dom";
  import { useDispatch, useSelector } from 'react-redux';

import { LoginScreen } from '../components/auth/LoginScreen'
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { startCheking } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';


export const AppRouter = () => {

    const dispatch = useDispatch();
    //obtengo del store el cheking, false indica que el login termino
    const { checking, uid } = useSelector( state => state.auth );

    //disparo
    useEffect(() => {
        dispatch( startCheking() );
    }, [dispatch])

    console.log(checking);
    if( checking ){
        return (<h5>Espere..</h5>)
    }
    /* !null si esta vacio true !! true false = false */

    return (
        
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        exact
                        path="/login" 
                        component= { LoginScreen } 
                        isAuthenticated = {!!uid} 
                    />
                    <PrivateRoute
                        exact path="/" 
                        component= {CalendarScreen}
                        isAuthenticated = {!!uid}  
                    />
                        {/* cualquier otra ruta */}
                    <Redirect to="/" />

                </Switch>
            </div>
        </Router>

    )
}
