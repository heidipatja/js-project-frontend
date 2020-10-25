import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";

import { token } from "./Token.js";

const TradeForm = () => {
    const params = useParams();
    const history = useHistory();

    const [user, setUser] = useState([]);
    const [amount, setAmount] = useState(0);
    const [value, setValue] = useState();
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const apiUrl = process.env.NODE_ENV === "development"
        ? "http://localhost:8303"
        : "https://project-api.heidipatja.me";

    useEffect(() => {
        document.title = "Trade form";
    }, []);

    useEffect(() => {
        fetch(apiUrl + "/profile/" + token.id, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token.token
            }
        })
            .then(res => res.json())
            .then(res => setUser(res));
    }, [apiUrl, success]);

    const onChange = (event) => {
        event.preventDefault();
        setAmount(event.target.value);
        setValue(event.target.value * params.rate);
        setMessage("");
    };

    const onCancel = (event) => {
        event.preventDefault();
        setAmount(0);
        setValue(0);
        setMessage("");
        setSuccess(false);
        history.push("/trade");
    };

    const onSubmit = (event) => {
        event.preventDefault();
        fetch(apiUrl + "/trade/" + params.type, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token.token
            },
            body: JSON.stringify({
                id: token.id,
                currency: params.currency,
                amount: amount,
                rate: params.rate,
                value: value
            })
        })
            .then(res => res.json())
            .then(res => {
                if (res.message) {
                    setMessage(
                        <div className="messageBox fail">{res.message}</div>
                    );
                } else if (params.type.toLowerCase() === "buy") {
                    setUser(res);
                    setSuccess(true);
                    setMessage(
                        <div className="tradeMessage">
                            <p>You bought some {params.currency}!</p>
                        </div>
                    );
                } else {
                    setUser(res);
                    setSuccess(true);
                    setMessage(
                        <div className="tradeMessage">
                            <p>You sold some {params.currency}!</p>
                        </div>
                    );
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const getLabel = () => {
        if (params.type.toLowerCase() === "buy") {
            return "Total price";
        } else {
            return "Total value";
        }
    };

    const getCurrent = () => {
        if (success) {
            return (
                <div className="currentBalance">
                    <p>Current balance: {Math.round(user.balance * 100) / 100} SEK</p>
                </div>
            );
        } else {
            return (
                <div className="currentBalance">
                    <p>Current balance: {Math.round(user.balance * 100) / 100} SEK</p>
                    <p>Number of {params.currency}: {params.amount}</p>
                </div>
            );
        }
    };

    if (success) {
        return (
            <main>
                <h1>{params.type} {params.currency}</h1>
                {message}
                {getCurrent()}
                <div className="buttonsForm buttons">
                    <button
                        className="cancelButton"
                        type="button"
                        onClick={onCancel}>Ok cool!
                    </button>
                </div>
            </main>
        );
    } else {
        return (
            <main>
                <h1>{params.type} {params.currency}</h1>
                {getCurrent()}
                {message}
                <form onSubmit={onSubmit}>
                    <label htmlFor="currency">Currency</label>
                    <input
                        name="currency"
                        value={params.currency}
                        type="text"
                        readOnly
                    />

                    <label htmlFor="rate">Rate</label>
                    <input
                        name="rate"
                        value={Math.round(params.rate * 100) / 100}
                        type="number"
                        readOnly
                    />

                    <label htmlFor="price">{getLabel()}</label>
                    <input
                        name="price"
                        value={Math.round((amount * params.rate) * 100) / 100}
                        onChange={onChange}
                        type="number"
                        placeholder="10"
                        readOnly
                    />

                    <label htmlFor="amount">Coins to {params.type.toLowerCase()}</label>
                    <input
                        name="amount"
                        value={amount}
                        type="number"
                        placeholder="10"
                        onChange={onChange}
                    />

                    <div className="buttonsForm buttons">
                        <button
                            className="submitButton"
                            type="submit">{params.type}
                        </button>
                        <button
                            className="cancelButton"
                            type="button"
                            onClick={onCancel}>Cancel
                        </button>
                    </div>

                </form>
            </main>
        );
    }
};



export default TradeForm;
