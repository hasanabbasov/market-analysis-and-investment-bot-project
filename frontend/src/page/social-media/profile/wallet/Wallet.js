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
            { show === 'active' ? <Paper style={{
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                    borderBottomLeftRadius: "0",
                    borderBottomRightRadius: "0",
                    background: "linear-gradient(to right, #2C3E50, #b1d9ff)",
                    boxShadow:" 0px 2px 3px 1px #2C3E50"
                }}>
                    <Tap show={show} setShow={(value) => setShow(value)}/>
                </Paper> :
                <Paper style={{
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                    borderBottomLeftRadius: "0",
                    borderBottomRightRadius: "0",
                    background: "linear-gradient(to right, #b1d9ff, #2C3E50)",
                    boxShadow:" 0px 2px 3px 1px #2C3E50"
                }}>
                    <Tap show={show} setShow={(value) => setShow(value)}/>
                </Paper>}
                {show === "active" ?
                    <ActiveInvest data={data}/> :
                    <FutureInvest/>
                }
        </div>
    );
};

export default Wallet;