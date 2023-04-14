import React,{useState,useEffect,useMemo} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const BuySell = ({symb}) => {
    // const [symbols, setSymbols] = useState([]);
    // const [symbol,setSymb] = useState(symb);
    const [amount, setAmount] = useState('');

    // console.log("symbols",symbols)
    // useEffect(() => {
    //     fetch("http://127.0.0.1:5000/usdt_symbols")
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setSymbols(data);
    //             console.log("symbols2",symbols);
    //             console.log("data",data);
    //         });
    // }, []);

    const handleSubmit = (e, type) => {
        e.preventDefault();
        const formData = { symb, amount };
        const endpoint = type === "buy" ? "buy" : "sell";
        console.log("formData", formData);
        fetch(`http://127.0.0.1:5000/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit} style={{height:"50px"}}>
            <div style={{display:"flex", flexWrap:"nowrap"}}>
                <label htmlFor="symbol">Symbol:</label>
                {/*<select id="symbol" value={symbol} onChange={(e) => setSymb(e.target.value)}>*/}
                {/*    {symbols.map((symbol) => (*/}
                {/*        <option value={symbol} key={symbol}>{symbol}</option>*/}
                {/*    ))}*/}
                {/*</select>*/}
                <p>{symb}</p>
            </div>
            <div>
                <label htmlFor="amount">Amount:</label>
                <input type="text" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <button type="submit" onClick={(e) => handleSubmit(e, "buy")}>
                Buy
            </button>
            <button type="submit" onClick={(e) => handleSubmit(e, "sell")}>
                Sell
            </button>
        </form>
    );
};

export default BuySell;