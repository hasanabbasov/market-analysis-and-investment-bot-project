import React, {useState, useEffect} from 'react';
import Table from '../invest-bot-table/BotTable'
import {Paper} from '@material-ui/core'
import './invest.css'

const InvestBackground = () => {
    const [showButton, setShowButton] = useState(true);

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
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

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
                    <Table/>
                </div>
            }
        </div>
    );
};

export default InvestBackground;