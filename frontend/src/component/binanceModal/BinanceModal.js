import React from 'react';
import {Button, Modal} from "antd";
import {useState} from "react";

const BinanceModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const userid = localStorage.getItem("currentUserId")

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/binance/sendData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: userid, apiKey:name, secrutyKey:email }),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.log(error));
    };

    const showModal = () => {

    };

    const handleOk = () => {

    };
    return (
        <div>
            <Modal title="Lutfen Devam Etmek icin Binance Secret key ve Apı key'lerini girin" open={isModalOpen} onOk={handleOk} width={1000} height={1000}>
                <form onSubmit={handleSubmit} style={{maxHeight:'200px'}}>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </Modal>
        </div>
    );
};

export default BinanceModal;