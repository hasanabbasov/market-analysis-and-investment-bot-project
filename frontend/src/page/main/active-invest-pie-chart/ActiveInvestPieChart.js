import React from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
 Legend
} from 'chart.js';
import './activeInvestPieChart.css'
import { Pie } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const ActiveInvestPieChart = (data) => {

    const transformData = (inputData) => {
        const outputData = {
            labels: [],
            datasets: [
                {
                    data: [],
                    backgroundColor: ['aqua', 'bloodorange', 'purple', 'red', 'green', 'yellow']
                }
            ]
        };

        for (const symbol in inputData) {
            outputData.labels.push(symbol);
            outputData.datasets[0].data.push(inputData[symbol]?.total);
        }

        return outputData;
    };

    const pieData = transformData(data.data)

    const option = {}

    return (
        <div className='active-invest-pie-chart-background'>
            <div style={{padding: '20px', width: '350px'}}>
                <Pie data={pieData} options={option}/>
            </div>
        </div>
    );
};

export default ActiveInvestPieChart;