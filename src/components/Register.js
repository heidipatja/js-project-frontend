import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Register extends Component {
    constructor() {
        super();
        this.state = { email: '', password: '', status: '' };
    }

    componentDidMount() {
        document.title = "Register";
    }

    onChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();

        const apiUrl = process.env.NODE_ENV === "development"
            ? "http://localhost:8303"
            : "https://project-api.heidipatja.me";

        fetch(apiUrl + "/register", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
            .then(res => res.json())
            .then(response => {
                if (response.data) {
                    this.props.history.push('login');
                } else {
                    this.setState({ status: response.message });
                }
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
                <h1>Register</h1>
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

                    <button className="registerButton" type="submit">Register</button>
                </form>
                <Link to="/login">I already have an account</Link>
            </main>
        );
    }
}

export default Register;
