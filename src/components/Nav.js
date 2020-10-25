import React from 'react';
// eslint-disable-next-line
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChartLine, faUserTie, faSignInAlt, faSignOutAlt }
    from '@fortawesome/free-solid-svg-icons';

const Nav = ({ loginStatus, logout }) => {
    return (
        <>
            <nav className="top-nav">
                <div className="site-name">
                    UniCoin Trading
                </div>
            </nav>
            <nav className="bottom-nav">
                <div className="navContainer">
                    <Link to="/">
                        <FontAwesomeIcon icon={faHome} />
                        <span className="iconText">Home</span>
                    </Link>
                    {loginStatus ? (
                        <>
                            <Link to="/trade">
                                <FontAwesomeIcon icon={faChartLine} />
                                <span className="iconText">Trade</span>
                            </Link>
                            <Link to="/profile">
                                <FontAwesomeIcon icon={faUserTie} />
                                <span className="iconText">Account</span>
                            </Link>
                            <Link to="/login" onClick={logout}>
                                <FontAwesomeIcon icon={faSignOutAlt} />
                                <span className="iconText">Logout</span>
                            </Link>
                        </>
                    ) : (
                        <Link to="/login">
                            <FontAwesomeIcon icon={faSignInAlt} />
                            <span className="iconText">Login</span>
                        </Link>
                    )}
                </div>
            </nav>
        </>
    );
};

export default Nav;
