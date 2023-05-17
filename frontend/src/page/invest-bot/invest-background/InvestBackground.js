import React, {useState, useEffect} from 'react';
import Table from '../invest-bot-table/BotTable'
import {Paper} from '@material-ui/core'
import './invest.css'

const InvestBackground = () => {
    const [loading, setLoading] = useState(false)
    const [showButton, setShowButton] = useState(true);
    const [positions, setPositions] = useState([]); // Pozisyonları tutacak yeni state

    const startBot = () => {
        fetch('http://localhost:5000/start_bot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {

                setShowButton(false)
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const stopBot = () => {
        fetch('http://localhost:5000/stop_bot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setShowButton(true)
                setPositions([]); // Bot durdurulduğunda pozisyonları sıfırla
                setLoading(false)
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    // Botun durumu değiştiğinde pozisyonları güncelle
    useEffect(() => {
        if (!showButton) {
            const intervalId = setInterval(() => {
                fetch('http://localhost:5000/futures_positions')
                    .then((response) => response.json())
                    .then((data) => {
                        setPositions(data);
                        setLoading(true)
                    });
            }, 10000); // Her saniye pozisyonları güncelle

            // Cleanup function
            return () => clearInterval(intervalId);
        }
    }, [showButton]); // Botun durumuna bağlı olarak güncelle

    console.log("positions",positions)

    return (
        <div className='invest-bot-page-background'>
            <Paper style={{padding:'20px'}}>
                <h1>Bu bir yatirim Botudur</h1>
                <h2>Test Asamasindadir</h2>
            </Paper>
            { showButton ? <div>
                <button className='invest-bot-page-button-background' onClick={startBot}>
                    Botu Baslat!
                </button>
            </div> :
                <div style={{paddingTop: '20px'}}>
                    <button className='invest-bot-page-stop-button-background' onClick={stopBot}>
                        Botu Durdur!
                    </button>
                    <Table positions={positions} loading={loading}/>
                </div>
            }
        </div>
    );
};

export default InvestBackground;