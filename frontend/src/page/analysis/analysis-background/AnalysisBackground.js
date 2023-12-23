import React,{useState,useEffect} from 'react';
import "./analysisBacground.css"
import {Paper} from "@material-ui/core";
import AnalysisChart from "../analysis-chart/AnalysisChart";


const AnalysisBackground = () => {
    const [intervalValues] = useState([
        '1m',
        '5m',
        '15m',
    ]);
    const [showButton, setShowButton] = useState('');
    const [intervalNames] = useState(['1 Minute', '5 Minute', '15 Minute']);
    const [symbols, setSymbols] = useState([]);
    const [symb, setSymb] = useState('BTCUSDT');
    const [interval, setIntervalTime] = useState('1m');
    const [intervalSymbolDataForFlaskFetch, setIntervalSymbolDataForFlaskFetch] = useState('');
    const [stopBot, setStopBot] = useState('')
    const [refresh, setRefresh] = useState(false)
    const userId = localStorage.getItem("currentUserId")
    console.log("intervalSymbolDataForFlaskFetch",intervalSymbolDataForFlaskFetch);
    console.log("showButton",showButton)

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/usdt_symbols?userId=${userId}`)
            .then((response) => response.json())
            .then((data) => {
                setSymbols(data);
            });
    }, [])

    const startAnalysis = () => {
        fetch(`/analysis/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userId: userId, symbol: symb, interval: interval, start: true}),
        })
            .then((response) => response.json())
            .then((res) => {
                console.log("saveAnalysis: ", res)
                setShowButton(true)
            })
            .catch(console.error)
    }
    // /stopBot/{userId}
    const stopAnalysis = () => {
        fetch(`/analysis/stopBot/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userId: userId}),
        })
            .then((response) => response.json())
            .then((res) => {
                console.log("StopAnalysis: ", res)
                setStopBot(res);
                setShowButton(false)
            })
            .catch(console.error)
    }

    const refreshAnalysis = () => {
        setRefresh(!refresh)
    }

    useEffect(() => {
        fetch((`/analysis/getAnalysis/${userId}`))
            .then((response) => response.json())
            .then((res) => {
                setIntervalSymbolDataForFlaskFetch(res);
                setShowButton(res[0].start)
            })
    },[])

    return (
        <div className='analysis-page-background'>
            <Paper style={{padding: '20px'}}>
                <h1>
                    Choose the cryptocurrency you wish to analyze and select the interval at which you want to conduct the market analysis.
                </h1>
                <h3>Please note that this is an ML model, and its predictions are not 100% accurate.</h3>
                <h4>First, select the Interval and Symbol.</h4>
                {!showButton && <div>
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
                    </div>
                }
            </Paper>
            {!showButton  && intervalSymbolDataForFlaskFetch !== null ?
                <div>
                    <button className='analysis-page-button-background' onClick={startAnalysis}>
                        Start analysis!
                    </button>
                </div> :
                <div>
                    <button className='analysis-page-button-refresh-background' onClick={refreshAnalysis}>
                        Refresh analysis!
                    </button>
                    <button className='analysis-page-stop-button-background' onClick={stopAnalysis}>
                        Stop analysis!
                    </button>
                </div>
            }
            {showButton &&
                <AnalysisChart symb={symb} interval={interval} refresh={refresh}/>
            }
        </div>
    );
};

export default AnalysisBackground;