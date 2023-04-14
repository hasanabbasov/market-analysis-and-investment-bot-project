import React from 'react';
import {Button, Modal} from "antd";

const ModalForChart = ({symb, symbols, setSymb, setSymbol,interval,setInterval, intervalValues,intervalNames, isModalOpen, setIsModalOpen , activeChart,setActiveChart}) => {

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(!isModalOpen);
        setActiveChart(true)
    };


    return (
        <div>
            <Button type="primary" onClick={showModal}>
                Open ModalForChart
            </Button>
            <Modal title="Lutfen gormek istediginiz Chart'i olusturun" open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(!isModalOpen)} width={1000} height={1000}>

                <p>Llk basta Interval ve Symbol secin</p>
                <div>
                    <select id="symbol" value={symb} onChange={(e) => setSymb(e.target.value)}>
                        {symbols.map((symbol) => (
                            <option value={symbol} key={symbol}>{symbol}</option>
                        ))}
                    </select>
                </div>

                <select value={interval} onChange={(e) => setInterval(e.target.value)}>
                    {intervalValues.map((value, index) => (
                        <option key={index} value={value}>
                            {intervalNames[index]}
                        </option>
                    ))}
                </select>
            </Modal>
        </div>
    );
};

export default ModalForChart;