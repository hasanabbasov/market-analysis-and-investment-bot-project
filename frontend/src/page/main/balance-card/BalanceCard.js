import React,{useEffect, useState} from 'react';
import './balanceCard.css'


const BalanceCard = () => {
    const [spotInfo, setSpotInfo] = useState();
    const [futureInfo, setFutureInfo] = useState();
    const [error, setError] = useState(false);
    const [totalWallet, setTotalWallet] = useState(0);

    useEffect(() => {
        if (spotInfo && futureInfo) {
            const total = Number(spotInfo.usdt_balance) + Number(futureInfo.totalWalletBalance);
            setTotalWallet(total.toFixed(8));
            console.log("totalWallet",totalWallet)
        }
    }, [spotInfo, futureInfo]);

    useEffect(() => {
        Promise.all([
            fetch('http://127.0.0.1:5000/usdt_spot_balance').then(res => res.json()),
            fetch('http://127.0.0.1:5000/usdt_future_balance').then(res => res.json())
        ])
            .then(data => {
                if (data) {
                    setSpotInfo(data[0]);
                    setFutureInfo(data[1]);
                }
                console.log("spotInfo: ", spotInfo);
                console.log("futureInfo: ", futureInfo);
                console.log("data: ", data);
            })
            .catch(err => setError(err.message));
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!spotInfo || !futureInfo) {
        return <div>Loading...</div>;
    }


    return (
        <div className="balance-card-background">
            <div className='balance-total-balance'>
                <h2>Total Balance</h2>
                <div>{totalWallet}</div>
            </div>
            <div>
                <h2>Spot total</h2>
                <div>{Number(spotInfo.usdt_balance)}</div>
            </div>
            <div>
                <h2>Future total</h2>
                <div>{Number(futureInfo.totalWalletBalance)}</div>
            </div>

        </div>
    );
};

export default BalanceCard;