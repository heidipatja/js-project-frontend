import React, { useState, useEffect } from 'react';

import Balance from "./Balance.js";
import Deposit from "./Deposit.js";
import { token } from "./Token.js";

const Profile = () => {
    const [user, setUser] = useState([]);
    const [balance, setBalance] = useState(0);
    const [deposit, setDeposit] = useState("");
    const [depositForm, showDepositForm] = useState(false);
    // eslint-disable-next-line
    const [depositButton, showDepositButton] = useState(true);

    useEffect(() => {
        document.title = "Account";
    }, []);

    useEffect(() => {
        const apiUrl = process.env.NODE_ENV === "development"
            ? "http://localhost:8303"
            : "https://project-api.heidipatja.me";

        fetch(apiUrl + "/profile/" + token.id, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token.token
            }
        })
            .then(res => res.json())
            .then(res => setUser(res))
            .then(res => setBalance(user.balance))
            .then(showDepositForm(false))
            .then(showDepositButton(true));
    }, [balance, user.balance]);

    // eslint-disable-next-line
    const onClick = (event) => {
        event.preventDefault();
        showDepositForm(true);
    };

    // eslint-disable-next-line
    const toggleButton = (event) => {
        if (depositForm) {
            showDepositForm(false);
            showDepositButton(true);
        } else {
            showDepositForm(true);
            showDepositButton(false);
        }
    };

    const makeDepositButton = () => {
        return <button onClick={toggleButton}>Make deposit</button>;
    };

    return (
        <main>
            <h1>Account</h1>
            <p>Welcome!</p>
            <Balance user={user} />
            {depositForm &&
                <Deposit
                    balance={balance}
                    setBalance={setBalance}
                    deposit={deposit}
                    setDeposit={setDeposit}
                    setUser={setUser}
                    toggleButton={toggleButton}
                />}
            {!depositForm && makeDepositButton()}
        </main>
    );
};

export default Profile;
