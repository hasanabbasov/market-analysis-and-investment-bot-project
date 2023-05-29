import React, {useState, useEffect} from 'react';
import {Paper} from "@material-ui/core";
import ActiveInvest from "./ActiveInvest"
import './wallet.css'
import Tap from "./Tap";
import FutureInvest from "./FutureInvest";

const Wallet = () => {
    const [show, setShow] = useState('active');
    const [data, setData] = useState();
    // console.log("data active invest card: ", data)

    useEffect(() => {
        fetch('http://127.0.0.1:5000/active_invest')
            .then((response) => response.json())
            .then((res) => {
                // console.log("res", res)
                setData(res)
            })
    }, [])

    return (
        <div>
            <Paper>
                <Tap show={show} setShow={(value) => setShow(value)}/>
            </Paper>
            <Paper>
                {show ==="active" ? <ActiveInvest data={data}/> :
               <FutureInvest/>
                }
            </Paper>
        </div>
    );
};

export default Wallet;