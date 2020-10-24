import React, { useEffect } from 'react';

const Home = () => {
    useEffect(() => {
        document.title = "UniCoin Trading";
    }, []);

    return (
        <main>
            <h1>UniCoin Trading</h1>
            <p>With UniCoin Trading there are no losers, only winners.</p>
            <p>Make your life better - become a member today.</p>
            <p>Up we go!</p>
            <br />
            <i>UniCoin Team</i>
        </main>
    );
};

export default Home;
