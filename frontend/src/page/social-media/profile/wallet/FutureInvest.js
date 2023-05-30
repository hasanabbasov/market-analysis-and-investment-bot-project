import React, {useEffect, useState} from 'react';
import BotTable from "../../../../page/invest-bot/invest-bot-table/BotTable"

const FutureInvest = () => {

    const [loading, setLoading] = useState(true)
    const [showButton, setShowButton] = useState('');
    const [positions,   setPositions] = useState([]); // Pozisyonları tutacak yeni state

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
        <div>
            <BotTable loading={loading} positions={positions}/>
        </div>
    );
};

export default FutureInvest;