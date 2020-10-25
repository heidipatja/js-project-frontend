import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Trade from './Trade';
import io from 'socket.io-client';

let socket;

const Trading = () => {
    const [redraw, setRedraw] = useState(false);
    const [data, setData] = useState({
        labels: ["", "", "", "", "", "", "", "", "", ""],
        datasets: [
            {
                label: "UniCoin",
                borderColor: "rgba(255,126,126,1)",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: "#fff",
                borderWidth: 2,
                borderSkipped: "top"
            },
            {
                label: "BaCoin",
                borderColor: "#fbd25b",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: "#fff",
                borderWidth: 2
            },
            {
                label: "IceCreamCoin",
                borderColor: "#34a29c",
                backgroundColor: "#fff",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                borderWidth: 2
            }
        ]
    });

    const socketUrl = process.env.NODE_ENV === "development"
        ? "http://localhost:8383"
        : "https://project-socket.heidipatja.me/";

    useEffect(() => {
        document.title = "Trade";
    }, []);

    useEffect(() => {
        socket = io(socketUrl);

        return () => {
            socket.emit("disconnect");

            socket.off();
        };
    }, [socketUrl]);


    useEffect(() => {
        let newData = data;

        socket.on("currencies", (rates) => {
            rates.forEach((rate, key) => {
                newData.datasets[key].data.shift();
                newData.datasets[key].data.push(rates[key].startingPoint);
            });

            newData.labels.shift();
            newData.labels.push(new Date().toLocaleTimeString("sv-SE"));
            setData(newData);

            setRedraw(false);
            setRedraw(true);
        });
    }, [data]);

    return (
        <main>
            <h2>Trade currencies</h2>
            <Line data={data} redraw={redraw} options={{
                animation: false,
                backgroundColor: "white",
                legend: {
                    labels: {
                        boxWidth: 12,
                    },
                    position: "top",
                    align: "end"
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            color: "transparent",
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            color: "transparent",
                        }
                    }]
                }}} />
            <div className="buySell">
                <Trade data={data} />
            </div>
        </main>
    );
};

export default Trading;
