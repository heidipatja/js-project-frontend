import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { token } from "./Token.js";

class Login extends Component {
    constructor() {
        super();
        this.state = { email: '', password: '', status: '' };
    }

    componentDidMount() {
        document.title = "Login";
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();

        const apiUrl = process.env.NODE_ENV === "development"
            ? "http://localhost:8333"
            : "https://me-api.heidipatja.me";

        fetch(apiUrl + "/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
            .then(res => res.json())
            .then(response => {
                console.log(response.data);
                if (response.data) {
                    token.token = response.data.token;
                    token.id = response.data.id;
                    this.props.setLoginStatus(true);
                    this.props.history.push('profile');
                } else {
                    this.setState({ status: response.message });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    setMessage() {
        if (this.state.status !== "") {
            return <div className="messageBox fail">{this.state.status}</div>;
        }
    }

    render() {
        return (
            <main>
                <h1>Login</h1>
                {this.setMessage()}
                <form onSubmit={this.onSubmit}>
                    <label htmlFor="email">Email</label>
                    <input
                        name="email"
                        value={this.state.email}
                        type="email"
                        onChange={this.onChange}
                        required
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        name="password"
                        value={this.state.password}
                        type="password"
                        onChange={this.onChange}
                        required
                    />

                    <button className="loginButton" type="submit">Login</button>
                </form>
                <Link to="/register">Create a new account</Link>
            </main>
        );
    }
}

export default Login;
