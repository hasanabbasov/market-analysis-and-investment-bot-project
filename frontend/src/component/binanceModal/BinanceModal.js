import React, {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Button, Modal} from "antd";
import {useState} from "react";
import './binance.css'

const BinanceModal = ({binanceInfoModalData}) => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const location = useLocation();




    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/binance/sendData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userId: binanceInfoModalData?.userId, apiKey:email , secrutyKey:name}),
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data)
                setIsModalOpen(false)
            })
            .catch((error) => console.log(error));

        window.load();
    };

    const showModal = () => {

    };

    const handleOk = () => {
        setIsModalOpen(false);
        navigate('/social-media');
    };

    const handleCancel = () => setIsModalOpen(false);
    return (
        <div>
            { binanceInfoModalData.apiKey === null && <Modal open={isModalOpen}
                                                                        onCancel={handleCancel}
                                                                        onOk={handleOk} width={1000} height={1000}>
                <h1>Please enter your Binance secret key and API key to proceed.</h1>
                <h3>If you do not want to link your Binance account, simply click on the "OK" button to proceed with social media.</h3>
                <form onSubmit={handleSubmit} style={{maxHeight: '300px', flexDirection: 'column', paddingTop: '80px'}}>
                    <div style={{width: '100%'}}>
                        <label style={{display: 'flex', alignItems: 'center'}}>
                            <h2 style={{paddingRight: '50px', width: '130px'}}>Secret Key:</h2>
                            <input
                                style={{width: '70%'}}
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                    </div>
                    <div style={{width: '100%'}}>
                        <label style={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
                            <h2 style={{paddingRight: '40px', width: '130px'}}>Api key:</h2>
                            <input
                                style={{width: '70%'}}
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button className='binance-submit-button' type="submit">Submit</button>
                        </label>
                    </div>

                </form>
            </Modal>}
        </div>
    );
};

export default BinanceModal;