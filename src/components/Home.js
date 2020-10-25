import React, { useEffect } from 'react';
const logo = process.env.PUBLIC_URL + "unicoin.png";

const Home = () => {
    useEffect(() => {
        document.title = "UniCoin Trading";
    }, []);

    return (
        <main>
            <h1>UniCoin Trading</h1>
            <img className="logo" src={logo} />
            <p>With UniCoin Trading there are no losers, only winners.</p>
            <p>Use our app to trade with top currencies such as UniCoin, BaCoin or IceCreamCoin.</p>
            <p>Make your life better - become a member today. Up we go!</p>
            <br />
            <i>The UniCoin Team</i>
        </main>
    );
};

export default Home;
