import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Trading from './components/Trading';
import TradeForm from './components/TradeForm';
import Nav from './components/Nav';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import { token } from "./components/Token";

import './App.css';

const App = () => {
    const [loginStatus, setLoginStatus] = useState(false);

    useEffect(() => {
        if (token.token) {
            setLoginStatus(true);
        }
    }, [loginStatus]);

    const logout = () => {
        setLoginStatus(false);
        token.token = "";
        token.id = "";
    };

    return (
        <Router>
            <div className="App">
                <Nav loginStatus={loginStatus} logout={logout} />
                <Route exact path="/" component={Home}/>
                <Route
                    exact path="/login"
                    render={(props) => (
                        <Login {...props}
                            loginStatus={loginStatus} setLoginStatus={setLoginStatus}
                        />
                    )}
                />
                <Route exact path="/register" component={Register} />
                <PrivateRoute path="/profile/" component={Profile} />
                <PrivateRoute path="/trade" component={Trading}/>
                <PrivateRoute
                    path="/tradeform/:type/:currency/:rate/:amount" component={TradeForm} />
                <Footer />
            </div>
        </Router>
    );
};

export default App;
