import React, { useEffect,useState } from "react";
// import LightweightCharts from "lightweight-charts";
import * as LightweightCharts from 'lightweight-charts';
import ModalForChart from "../ModalChart/ModalForChart";
import BuySell from "../BuyAndSell/BuySell";
import './chart.css'

function Chart() {

    const [symbols, setSymbols] = useState([]);
    const [symb,setSymb] = useState('BTCUSDT');
    const [interval, setInterval] = useState('KLINE_INTERVAL_5MINUTE');
    const [intervalValues] = useState([
        'KLINE_INTERVAL_5MINUTE',
        'KLINE_INTERVAL_15MINUTE',
    ]);
    const [intervalNames] = useState(['5 Minute', '15 Minute']);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeChart, setActiveChart] = useState(false);

    const bugun = new Date();
    // Ayın adını almak için bir dizi tanımlayın
    const ayAdlari = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    // Ayın indeksini alın
    const ayIndex = bugun.getMonth();
    // Ayın adını alın
    const ayAdi = ayAdlari[ayIndex];
    // Yılın tamamını alın
    const yil = bugun.getFullYear();
    // Günün tarihini alın
    const gun = bugun.getDate();
    // Tarihi birleştirin
    const tarih = gun + ' ' + ayAdi + ', ' + yil;
    // ***************************
    const altiTarihOnce = new Date(bugun.getFullYear(), bugun.getMonth() - 1, bugun.getDate());
    const altiTarihAdi = ayAdlari[altiTarihOnce.getMonth()];
    const altiTarih = `${altiTarihOnce.getDate()} ${altiTarihAdi}, ${altiTarihOnce.getFullYear()}`;

    useEffect(() => {
        fetch("http://127.0.0.1:5000/usdt_symbols")
            .then((response) => response.json())
            .then((data) => {
                setSymbols(data);
                // console.log("symbols2",symbols);
                // console.log("data",data);
            });

        if (activeChart) {
            const chart = LightweightCharts.createChart(document.getElementById("chart"), {
                width: 1100,
                height: 580,
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

            const dataToChart = {
                date: tarih,
                lastDate: altiTarih,
                symbol: symb,
                interval: interval
            };



            fetch(`http://127.0.0.1:5000/chart-history/post`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToChart),
            })
                .then((response) => {
                    response.json()
                    fetch(`http://127.0.0.1:5000/chart-history?date=${dataToChart.date}&lastDate=${dataToChart.lastDate}&symbol=${dataToChart.symbol}&interval=${dataToChart.interval}`)
                        .then((response) => response.json())
                        .then((data) => {
                            // console.log("data",data)
                            candleSeries.setData(data);
                        });
                })
                .then((data) => {
                    // console.log("GelenData" , data)
                })
                .catch((error) => console.error("Error: ", error))

            const exampleSocket = new WebSocket(
                `wss://stream.binance.com:9443/ws/${symb.toLowerCase()}@kline_5m`
            );

            exampleSocket.onmessage = (event) => {
                const messageDate = JSON.parse(event.data)
                const handleStick = messageDate.k
                // console.log("",messageDate)
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
        }

    },[altiTarih, interval, symb, tarih, activeChart]);

    // console.log('symb',symb)
    // console.log('interval',interval)
    // console.log('activeChart             : ',activeChart)

    return (
        <div style={{paddingRight:'35px'}}>
            <div >
                <ModalForChart symb={symb}
                               symbols={symbols}
                               setSymb={(value) => setSymb(value)}
                               setSymbol={(value) => setSymbols(value)}
                               intervalValues={intervalValues}
                               intervalNames={intervalNames}
                               interval={interval}
                               setInterval={(value) => setInterval(value)}
                               isModalOpen={isModalOpen}
                               setIsModalOpen={(value) => setIsModalOpen(value)}
                               activeChart={activeChart}
                               setActiveChart={(value) => setActiveChart(value)}
                />
            </div>


            { activeChart &&
                <div className="chart-card-background">
                    <div className='chart-card-title'>{symb}</div>
                    <div id="chart"></div>
                    <div>
                        <BuySell symb={symb}/>
                    </div>
                </div>
            }

        </div>
    );
}

export default Chart
