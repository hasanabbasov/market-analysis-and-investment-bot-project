import React, {useEffect, useState} from 'react';
import BotTable from "../../../../page/invest-bot/invest-bot-table/BotTable"

const FutureInvest = () => {

    const [loading, setLoading] = useState(true)
    const [positions,   setPositions] = useState([]); // Pozisyonları tutacak yeni state
    const userId = localStorage.getItem("currentUserId")

    useEffect(() => {
            const intervalId = setInterval(() => {
                fetch(`http://127.0.0.1:5000/futures_positions?userId=${userId}`)
                    .then((response) => response.json())
                    .then((data) => {
                        setPositions(data);
                        setLoading(true)
                    });
            }, 5000); // 5 saniyede bir

            // Cleanup function
            return () => clearInterval(intervalId);

    }, []); // Botun durumuna bağlı olarak güncelle
    return (
        <div style={{boxShadow:" 0px 2px 3px 1px #2C3E50",borderBottomLeftRadius:"14px", borderBottomRightRadius:"14px",borderTopLeftRadius:"0", borderTopRightRadius:"0"}}>
            <BotTable loading={loading} positions={positions}/>
        </div>
    );
};

export default FutureInvest;