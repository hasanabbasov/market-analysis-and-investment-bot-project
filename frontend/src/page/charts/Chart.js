import React, { useEffect,useState } from "react";
// import LightweightCharts from "lightweight-charts";
import * as LightweightCharts from 'lightweight-charts';
// import BuySell from "./BuyAndSell/BuySell";

function Chart() {

    useEffect(() => {
        const chart = LightweightCharts.createChart(document.getElementById("chart"), {
            width: 600,
            height: 300,
            layout: {
                background: {
                    type: "solid",
                    color: "#000000",
                },
                textColor: "rgba(255, 255, 255, 0.9)",
            },
            grid: {
                vertLines: {
                    color: "rgba(197, 203, 206, 0.5)",
                },
                horzLines: {
                    color: "rgba(197, 203, 206, 0.5)",
                },
            },
            crosshair: {
                mode: LightweightCharts.CrosshairMode.Normal,
            },
            rightPriceScale: {
                borderColor: "rgba(197, 203, 206, 0.8)",
            },
            timeScale: {
                borderColor: "rgba(197, 203, 206, 0.8)",
            },
        });

        const candleSeries = chart.addCandlestickSeries({
            upColor: "rgb(4,190,42)",
            downColor: "#ff0000",
            borderDownColor: "#ff0000",
            borderUpColor: "rgb(4,190,42)",
            wickDownColor: "#ff0000",
            wickUpColor: "rgb(4,190,42)",
        });


        fetch(`http://127.0.0.1:5000/chart-history`)
            .then((response) => response.json())
            .then((data) =>{
                console.log("data",data)
                candleSeries.setData(data);
            });


        const exampleSocket = new WebSocket(
            "wss://stream.binance.com:9443/ws/btcusdt@kline_15m"
        );

        exampleSocket.onmessage = (event) => {
            const messageDate = JSON.parse(event.data)
            const handleStick = messageDate.k
            console.log("",messageDate)
            candleSeries.update({
                "time": handleStick.t / 1000,
                "open": parseFloat(handleStick.o),
                "high": parseFloat(handleStick.h),
                "low": parseFloat(handleStick.l),
                "close": parseFloat(handleStick.c)
            })
        };

        // clean up the WebSocket connection on unmounting
        return () => {
            exampleSocket.close();
            chart.remove();

        };

    }, []);

    return (
        <div>
            <div id="chart"></div>
            <p>Settings</p>
            <div id="settings">
                <label>RSI</label>
                    <input type="checkbox" /> RSI
                    <input type="text" id="rsi_length" name="rsi_length" placeholder="14" />
                    <input type="text" id="rsi_oversold" name="rs_oversold" placeholder="30"/>
                    <input type="text" id="rsi_overbought" name="rsi_overbought" placeholder="70"/>
            </div>

            <div>
                {/*<BuySell/>*/}
            </div>

        </div>
    );
}

export default Chart
