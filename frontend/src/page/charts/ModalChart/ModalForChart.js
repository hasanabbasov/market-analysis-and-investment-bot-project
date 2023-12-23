import React from 'react';
import {Button, Modal} from "antd";
import ModalBackFoto from "../../../styles/chart.png"

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
            <Button onClick={showModal} style={{background:'#2C3E50', color:'white'}}>
                Choose a chart.
            </Button>
            <Modal title="Please create the chart you want to see. First, you need to select the coin you want to view, and then choose the interval at which you want to see it. If you don't select an interval, it will be set to 5 minutes by default." open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(!isModalOpen)} width={1000} height={1000}>

                <h4>Select the Interval and Symbol from here.</h4>
                <div style={{display:"flex", paddingBottom:"25px"}}>
                    <div>
                        <select id="symbol" value={symb} onChange={(e) => setSymb(e.target.value)}>
                            {symbols.map((symbol) => (
                                <option value={symbol} key={symbol}>{symbol}</option>
                            ))}
                        </select>
                    </div>

                    <select  style={{marginLeft:"15px"}}  value={interval} onChange={(e) => setInterval(e.target.value)}>
                        {intervalValues.map((value, index) => (
                            <option key={index} value={value}>
                                {intervalNames[index]}
                            </option>
                        ))}
                    </select>
                </div>
                <img src={ModalBackFoto} style={{width: '950px', height: '500px'}} alt={""}/>
            </Modal>
        </div>
    );
};

export default ModalForChart;