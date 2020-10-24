import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faHorseHead, faIceCream, faBacon }
    from '@fortawesome/free-solid-svg-icons';

import { token } from "./Token.js";

const Trade = ({ data }) => {
    const [user, setUser] = useState([]);

    const apiUrl = process.env.NODE_ENV === "development"
        ? "http://localhost:8333"
        : "https://me-api.heidipatja.me";

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
    }, [apiUrl]);

    if (user.currencies !== undefined && data.labels[9] !== "") {
        return (
            <div>
                <div className="tradeBalance">
                    Current balance: {Math.round((user.balance * 100) / 100)} SEK
                </div>
                <div className="currencies">

                    {user.currencies.map((currency, index) =>
                        <div key={index} className="currency">
                            <div className="col1">
                                <div className="currencyHeading">Currency</div>
                                <div className="currencyName currencyInfo">{currency.currency}</div>
                                <div className="currencyIcon">
                                    {currency.currency === "UniCoin"
                                        ? <FontAwesomeIcon icon={faHorseHead} />
                                        : null}
                                    {currency.currency === "BaCoin"
                                        ? <FontAwesomeIcon icon={faBacon} />
                                        : null}
                                    {currency.currency === "IceCreamCoin"
                                        ? <FontAwesomeIcon icon={faIceCream} />
                                        : null}
                                </div>
                            </div>

                            <div className="col2">
                                <div className="currencyHeading">Amount</div>
                                <div className="currencyAmount currencyInfo">
                                    {Math.round((currency.amount * 100) / 100)}
                                </div>
                            </div>

                            <div className="col3">
                                <div className="currencyHeading">Value</div>
                                <div className="currencyNewValue currencyInfo">
                                    {Math.round(
                                        data.datasets[index].data[9]*currency.amount) * 100 / 100
                                    } SEK
                                </div>
                                <div className="currencyValue currencyInfo">
                                    {Math.round(currency.value) * 100 / 100} SEK
                                </div>

                                <div className="currencyValuePercent currencyInfo">
                                    {Math.round(((((
                                        (data.datasets[index].data[9] * currency.amount) -
                                        currency.value)) / currency.amount) * 100) / 100) > 0
                                        ? "+"
                                        : null}
                                    {currency.amount !== 0
                                        ? Math.round(((((
                                            (data.datasets[index].data[9] * currency.amount) -
                                            currency.value)) / currency.value) * 100) * 100 / 100)
                                        : 0} %
                                </div>
                            </div>

                            <div className="col4">
                                <div className="currencyHeading">Rate</div>
                                <div className="currencyRate currencyInfo">
                                    {Math.round(data.datasets[index].data[9] * 100) / 100}
                                </div>
                                <div className="currencyPrevRate currencyInfo">
                                    {currency.amount !== 0
                                        ? Math.round(currency.value/currency.amount) * 100 / 100
                                        : " - "}
                                </div>
                            </div>

                            <div className="col5">
                                <div className="currencyHeading">Trend</div>
                                <div className="currencyTrend">
                                    {(data.datasets[index].data[9]
                                        >= data.datasets[index].data[8])
                                        ? <FontAwesomeIcon icon={faArrowUp} />
                                        : <FontAwesomeIcon icon={faArrowDown} />}
                                </div>
                            </div>

                            <div className="col6 buttons">
                                <div className="buttons">
                                    {/* eslint-disable max-len */}
                                    <Link
                                        className="linkButton buttonBuy currencyInfo"
                                        to={`/tradeform/Buy/${currency.currency}/${data.datasets[index].data[9]}/${currency.amount}`}>
                                        Buy
                                    </Link>
                                    {/* eslint-disable max-len */}
                                    <Link
                                        className="linkButton buttonSell currencyInfo"
                                        to={`/tradeform/Sell/${currency.currency}/${data.datasets[index].data[9]}/${currency.amount}`}>
                                        Sell
                                    </Link>
                                </div>
                            </div>

                        </div>
                    )}
                </div>
            </div>
        );
    } else {
        return (
            <div className="waiting">Waiting for data...</div>
        );
    }
};

export default Trade;
