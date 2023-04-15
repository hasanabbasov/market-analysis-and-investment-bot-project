import React from 'react';
import {Button, Modal} from "antd";
import {useState} from "react";

const BinanceModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {

    };

    const handleOk = () => {

    };
    return (
        <div>
            <Modal title="Lutfen Devam Etmek icin Binance Secret key ve Apı key'lerini girin" open={isModalOpen} onOk={handleOk} width={1000} height={1000}>
            </Modal>
        </div>
    );
};

export default BinanceModal;