import React, {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Button, Modal} from "antd";
import {useState} from "react";
import './binance.css'

const BinanceModal = ({apikey}) => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const apiKey = localStorage.getItem("apiKey");
    // console.log("apiKey",apiKey)
    // console.log("apikey",apikey)
    const userid = localStorage.getItem("currentUserId")


    const handleSubmit = (e) => {
        // console.log("name", name)
        // console.log("email", email)

        e.preventDefault();
        fetch('/binance/sendData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userId: userid, apiKey:email , secrutyKey:name}),
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data)
                setIsModalOpen(false)
            })
            .catch((error) => console.log(error));
    };

    //update
    // const handleSubmit = (e) => {
    //     console.log("name",name)
    //     console.log("email",email)
    //     e.preventDefault();
    //     fetch(`http://localhost:8080/binance/update`, {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({ id: count, userId: userid, apiKey:name, secrutyKey:email }),
    //     })
    //         .then((response) => response.json())
    //         .then((data) => console.log(data))
    //         .catch((error) => console.error(error));
    // }

    const showModal = () => {

    };

    const handleOk = () => {
        setIsModalOpen(false);
        navigate('/social-media');
    };

    const handleCancel = () => setIsModalOpen(false);
    return (
        <div>
            { (apiKey === undefined) && <Modal open={isModalOpen}
                                                                        onCancel={handleCancel}
                                                                        onOk={handleOk} width={1000} height={1000}>
                <h1>Lutfen Devam Etmek icin Binance Secret key ve Api key'lerini girin</h1>
                <h3>Binance hesabinizi baglamak istemezseniz sadece sosial medyadan devem etmek icin ok butonuna
                    tiklayin</h3>
                <form onSubmit={handleSubmit} style={{maxHeight: '200px', flexDirection: 'column', paddingTop: '80px'}}>
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