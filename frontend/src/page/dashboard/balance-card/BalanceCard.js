import React, {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import './balanceCard.css'
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";


const BalanceCard = () => {
    const [spotInfo, setSpotInfo] = useState();
    const [futureInfo, setFutureInfo] = useState();
    const [error, setError] = useState(false);
    const [totalWallet, setTotalWallet] = useState(0);
    const [spotToFuture, setSpotToFuture] = useState("Spot")
    const [amountForTransfer, setAmountForTransfer] = useState('')
    const [refresWalletInfo, setRefresWalletInfo] = useState("");
    const [success, setSuccess] = useState(false);
    const userId = localStorage.getItem("currentUserId")

    console.log("amountForTransfer", amountForTransfer)

    useEffect(() => {
        if (spotInfo && futureInfo) {
            const total = Number(spotInfo.usdt_balance) + Number(futureInfo.totalWalletBalance);
            setTotalWallet(total.toFixed(8));
            // console.log("totalWallet",totalWallet)
        }
    }, [spotInfo, futureInfo]);

    useEffect(() => {
        Promise.all([
            fetch('http://127.0.0.1:5000/usdt_spot_balance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userId: userId})
            }).then(res => res.json()),
            fetch('http://127.0.0.1:5000/usdt_future_balance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userId: userId})
            }).then(res => res.json())
        ])
            .then(data => {
                if (data) {
                    setSpotInfo(data[0]);
                    setFutureInfo(data[1]);
                }
                // console.log("spotInfo: ", spotInfo);
                // console.log("futureInfo: ", futureInfo);
                // console.log("data: ", data);
            })
            .catch(err => setError(err.message));
    }, [refresWalletInfo]);


    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!spotInfo || !futureInfo) {
        return <div>Loading...</div>;
    }



    const SuccessesToast = () => {
        return (
            <div style={{position: "relative", top: "-40%"}}>
                <Stack sx={{width: '100%'}} spacing={2}>
                    <Alert variant="filled" severity="success">
                        Transfer Success!
                        <span  style={{cursor:"pointer" , paddingLeft:"15px", fontSize:"12px", color:"red"}} onClick={() => setSuccess(false)} >X</span>
                    </Alert>
                </Stack>
            </div>
        )
    }


    const transferToSpotOrFuture = (value) => {

        if (value === "Future") {
            fetch(`http://127.0.0.1:5000/transfer_to_futures`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    asset: "USDT",
                    amount: amountForTransfer,
                    type: 1,
                    userId: userId
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    setRefresWalletInfo(data)
                    setSuccess(true)
                })
                .catch((error) => console.log(error));
        } else {
            fetch(`http://127.0.0.1:5000/transfer_to_futures`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    asset: "USDT",
                    amount: amountForTransfer,
                    type: 2,
                    userId: userId
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    setRefresWalletInfo(data)
                    setSuccess(true)
                })
                .catch((error) => console.log(error));
        }
    }

    return (
        <Grid container spacing={1} className="balance-card-background">
            <Grid item xs={12}>
                <div className='balance-total-balance'>
                    <p className='balance-card-title-p'>Total Available Balance:</p>
                    <p>{totalWallet} $</p>
                </div>
                <div className='balance-total-balance'>
                    <p className='balance-card-title-p'>Spot total:</p>
                    <p>{Number(spotInfo.usdt_balance)} $</p>
                </div>
                <div className='balance-total-balance'>
                    <p className='balance-card-title-p'>Future total:</p>
                    <p>{Number(futureInfo.totalWalletBalance)} $</p>
                </div>
            </Grid>
            {spotToFuture === "Spot" ? <>
                    <div className="spot-to-future-background">
                        <div className="spot-to-future-button-active" onClick={() => setSpotToFuture("Future")}>Spot</div>
                        <ArrowForwardIosIcon/>
                        <div className="spot-to-future-button-passive" onClick={() => setSpotToFuture("Future")}>Future
                        </div>
                    </div>
                    <div className="spot-to-future-input-button-background">

                        <input className="spot-to-future-input" type={"number"} placeholder="10$"
                               onChange={(e) => setAmountForTransfer(e.target.value)}/>
                        <p className="spot-to-future-send-button" onClick={() => transferToSpotOrFuture("Future")}>Send To
                            Future</p>
                    </div>
                </>

                :
                <>
                    <div className="spot-to-future-background">
                        <div className="spot-to-future-button-passive" onClick={() => setSpotToFuture("Spot")}>Spot
                        </div>
                        <ArrowBackIosNewIcon/>
                        <div className="spot-to-future-button-active" onClick={() => setSpotToFuture("Spot")}>Future
                        </div>
                    </div>
                    <div className="spot-to-future-input-button-background">
                        <input className="spot-to-future-input" type={"number"} placeholder="10$"
                               onChange={(e) => setAmountForTransfer(e.target.value)}/>
                        <p className="spot-to-future-send-button" onClick={() => transferToSpotOrFuture("Spot")}>Send To
                            Spot</p>
                    </div>
                </>
            }
            { success &&
                SuccessesToast()
            }


        </Grid>
    );
};

export default BalanceCard;