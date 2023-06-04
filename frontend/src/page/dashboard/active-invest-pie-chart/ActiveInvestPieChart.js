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
                    backgroundColor: ['blue',
                        'aqua',
                        'purple',
                        'red',
                        'green',
                        'yellow',
                        'fuchsia',
                        'gray',
                        'lime',
                        'maroon',
                        'navy',
                        'olive',
                        'silver',
                        'teal',
                        'orange',
                        'deeppink',
                        'skyblue',
                        'mediumseagreen',
                        'orchid',
                        'chocolate',
                        'goldenrod',
                        'darkcyan',
                        'lightcoral',]
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

    const option = {
        plugins: {
            legend: {
                position: 'bottom', // Etiketlerin sağ tarafta listelenmesini sağlar
            },
        },
    };

    return (
        <div className='active-invest-pie-chart-background'>
            <div>
                <Pie data={pieData} options={option} style={{maxHeight:"300px", maxWidth:'350px'}}/>
            </div>
        </div>
    );
};

export default ActiveInvestPieChart;