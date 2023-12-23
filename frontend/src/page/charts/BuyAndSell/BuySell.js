import React,{useState,useEffect,useMemo} from 'react';
import './buySell.css'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const BuySell = ({symb}) => {

    const [amount, setAmount] = useState('');
    const userId = localStorage.getItem("currentUserId")
    const [success, setSuccess] = useState(false);
    console.log("symb",symb)
    console.log("amount",amount)


    const handleSubmit = (e, type) => {
        e.preventDefault();
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
        }, 2000);
        const formData = { symb, amount, userId };
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
            .then((data) => {
                console.log(data)
            })
            .catch((error) => console.error(error));
    };

    return (
        <>
            <form onSubmit={handleSubmit} style={{height: "50px", justifyContent: 'start'}}>
                <div style={{display: "flex", flexWrap: "nowrap", padding: '15px'}}>
                    <p htmlFor="symbol" style={{paddingRight: '5px', fontWeight: 'bold'}}>Symbol:</p>
                    <p style={{fontWeight: 'bold'}}>{symb}</p>
                </div>
                <div style={{paddingLeft: '50px'}}>
                    <label htmlFor="amount" style={{fontWeight: 'bold', paddingRight: '5px'}}>Amount:</label>
                    <input   type="text" id="amount" value={amount} style={{fontWeight: 'bold', height: '20px'}}
                           onChange={(e) => setAmount(e.target.value)}/>
                </div>
                <div style={{paddingRight: '10px', paddingLeft: '10px', cursor: "pointer"}}>
                    <button style={{cursor: "pointer"}} type="submit" onClick={(e) => handleSubmit(e, "buy")}
                            className='buy-and-sell-button'>
                        Buy
                    </button>
                </div>
                <button style={{cursor: "pointer"}} type="submit" onClick={(e) => handleSubmit(e, "sell")}
                        className='buy-and-sell-button'>
                    Sell
                </button>
            </form>

            {success && (
                <div style={{
                    backgroundColor: 'green',
                    padding: '10px',
                    color: 'white',
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}>
                    Successful Transfer
                </div>
            )}</>
    );
};

export default BuySell;