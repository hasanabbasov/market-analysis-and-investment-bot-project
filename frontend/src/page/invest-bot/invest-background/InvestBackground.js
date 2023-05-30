import React, {useState, useEffect} from 'react';
import Table from '../invest-bot-table/BotTable'
import {Paper} from '@material-ui/core'
import './invest.css'

const InvestBackground = () => {
    const [loading, setLoading] = useState(false)
    const [showButton, setShowButton] = useState('');
    const [positions, setPositions] = useState([]); // Pozisyonları tutacak yeni state
    const [intervalValues] = useState([
        'KLINE_INTERVAL_1MINUTE',
        'KLINE_INTERVAL_5MINUTE',
        'KLINE_INTERVAL_15MINUTE',
    ]);
    const [intervalNames] = useState(['1 Minute', '5 Minute', '15 Minute']);
    const [symbols, setSymbols] = useState([]);
    const [symb, setSymb] = useState('BTCUSDT');
    const [interval, setIntervalTime] = useState('KLINE_INTERVAL_1MINUTE');
    const [botResponse, setBotResponse] = useState('');


    //Burada ilk basta bot bilgilerimizi aliyoruz, botun calisib calismadigini kontrol etmek icin
    useEffect(() => {
        fetch('/bot/getBot').then((response) => response.json())
            .then((res) => {
                setBotResponse(res[0])
                setShowButton(res[0].start)
            }).catch(console.error)
    }, [])


    const startBot = async () => {
        if (botResponse?.start === false) {
            updateBotEntity();
        }

        postBotStartRequest();
    }

    const stopBot = () => {
        deleteBotEntity();
        postBotStopRequest();
    }

    // const postBotEntity = () =>{
    //     fetch('/bot/save',{
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             asset: symb,
    //             interval: interval,
    //             start: showButton
    //         }),
    //     }).then((response) => response.json())
    //         .then((res) => setBotResponse(res))
    //         .catch((error) => console.error("Error: ", error))
    // }

    const deleteBotEntity = async () => {

        const id = 1
        try {
            const response = await fetch(`/bot/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            console.log('Success:', data);
            getBotResponse()
        } catch (error) {
            console.error('Error:', error);
        }
    }

    //Burada botumuzu baslatmak icin interbal ve asset bilgilerimizi guncelliyoruz, ve botun basladigini bildiriyoruz
    const updateBotEntity = async () => {
        const id = 1
        try {
            const response = await fetch(`/bot/updateVariable/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    asset: symb,
                    interval: interval,
                    start: showButton
                }),
            });
            const data = await response.json();
            console.log('Success:', data);
            getBotResponse()
        } catch (error) {
            console.error('Error:', error);
        }
    }


    //Her deyisiklikten sonra yeniden botun calisib calismadigi bilgilerini guncellemek icin
    const getBotResponse = () => {
        fetch('/bot/getBot').then((response) => response.json())
            .then((res) => {
                // console.log("deyisen: ", res)
                setShowButton(res[0].start)
            }).catch(console.error)
    }


    const postBotStartRequest = () => {
        getBotResponse()
        // http://127.0.0.1:5000/chart-history?date=${dataToChart.date}&lastDate=${dataToChart.lastDate}&symbol=${dataToChart.symbol}&interval=${dataToChart.interval}
        fetch(`http://127.0.0.1:5000/start_bot?symbol=${symb}&interval=${interval}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {

                // setShowButton(false)
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const postBotStopRequest = () => {
        fetch('http://127.0.0.1:5000/stop_bot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // setShowButton(true)
                setPositions([]); // Bot durdurulduğunda pozisyonları sıfırla
                setLoading(false)
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

        useEffect(() => {
            fetch("http://127.0.0.1:5000/usdt_symbols")
                .then((response) => response.json())
                .then((data) => {
                    setSymbols(data);
                });
        }, [])


    useEffect(() => {
        if (showButton) {
            const intervalId = setInterval(() => {
                fetch('http://127.0.0.1:5000/futures_positions')
                    .then((response) => response.json())
                    .then((data) => {
                        setPositions(data);
                        setLoading(true)
                    });
            }, 5000); // 5 saniyede bir

            // Cleanup function
            return () => clearInterval(intervalId);
        }
    }, [showButton]); // Botun durumuna bağlı olarak güncelle


    return (
        <div className='invest-bot-page-background'>
            <Paper style={{padding: '20px'}}>
                <h1>Bu bir yatirim Botudur</h1>
                <h2>İlk başta İnterval ve Symbol seçin</h2>
                {!showButton ? <div>
                        <select id="symbol" value={symb} onChange={(e) => setSymb(e.target.value)}>
                            {symbols.map((symbol) => (
                                <option value={symbol} key={symbol}>{symbol}</option>
                            ))}
                        </select>
                        <select value={interval} onChange={(e) => setIntervalTime(e.target.value)}>
                            {intervalValues.map((value, index) => (
                                <option key={index} value={value}>
                                    {intervalNames[index]}
                                </option>
                            ))}
                        </select>
                    </div> :
                    <h1>Tabloda aktiv yapılan yatırımlar gözüküyor</h1>
                }
            </Paper>
            {!showButton ?
                <div>
                    <button className='invest-bot-page-button-background' onClick={startBot}>
                        Botu Baslat!
                    </button>
                </div> :
                <div style={{paddingTop: '20px'}}>
                    <button className='invest-bot-page-stop-button-background' onClick={stopBot}>
                        Botu Durdur!
                    </button>
                    <Table positions={positions} loading={loading}/>
                </div>
            }
        </div>
    );
};

export default InvestBackground;