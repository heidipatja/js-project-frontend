import React from 'react';

import { token } from "./Token.js";

const Deposit = ({ balance, setBalance, setUser, deposit, setDeposit, toggleButton }) => {
    const apiUrl = process.env.NODE_ENV === "development"
        ? "http://localhost:8303"
        : "https://project-api.heidipatja.me";

    const onSubmit = (event) => {
        event.preventDefault();

        fetch(apiUrl + "/profile/" + token.id, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token.token
            },
            body: JSON.stringify({
                id: token.id,
                deposit: deposit
            })
        })
            .then(res => res.json())
            .then(res => setUser(res))
            .then(setDeposit(""))
            .then(setBalance(balance + deposit))
            .catch((error) => {
                console.error(error);
            });
    };

    const onChange = (event) => {
        event.preventDefault();
        setDeposit(event.target.value);
    };

    return (
        <div className="deposit">
            <form onSubmit={onSubmit}>
                <label htmlFor="deposit">Deposit</label>
                <input
                    name="deposit"
                    value={deposit}
                    onChange={onChange}
                    type="number"
                    placeholder="100" />
                <button className="saveButton" type="submit">Save</button>
            </form>
            <button type="button" className="closeButton" onClick={toggleButton}>Close</button>
        </div>
    );
};

export default Deposit;
