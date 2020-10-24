import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { token } from "../components/Token.js";

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props =>
            token.token ? (
                <Component {...props} />
            ) : (
                <Redirect to="/login" />
            )} />
    );
};

export default PrivateRoute;
