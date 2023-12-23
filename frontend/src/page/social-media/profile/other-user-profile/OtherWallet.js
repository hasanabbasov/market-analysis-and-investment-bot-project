import React, {useEffect, useState} from 'react';
import {Paper} from "@material-ui/core";
import Tap from "../wallet/Tap";
import ActiveInvest from "../wallet/ActiveInvest";
import FutureInvest from "./OtherWalletActiveTrade";
import {useParams} from "react-router-dom";

const OtherWallet = () => {
    const [show, setShow] = useState('active');
    const [data, setData] = useState();
    // console.log("data active invest card: ", data)
    const {userId} = useParams()

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/active_invest?userId=${userId}`)
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


export default OtherWallet;