import AuthService from './AuthService';
import { withRouter } from 'react-router';
import React from 'react';
// Auth Status Component
const AuthStatus = withRouter(({history}) => {
    return(
    AuthService.isAuthenticated ? (
        <p> Welcome!
            <button onClick = {() => {
                AuthService.logout(() => history.push('/'))
            }}>Sign out</button>
        </p>
    ):(
        <p>You are not logged in.</p>
    ));
});

export default AuthStatus;