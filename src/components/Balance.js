import React from 'react';

const Balance = ({ user }) => {
    return (
        <div className="balance">
            Current balance:
            <span className="balanceNumber"> {Math.round(user.balance * 100)/100}</span> SEK
        </div>
    );
};

export default Balance;
