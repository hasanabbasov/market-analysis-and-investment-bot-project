import React from 'react';
import {Line} from 'react-chartjs-2';
import './lineChartBalanceHistory.css'
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale, //x
    LinearScale, //y
    PointElement
} from "chart.js";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
)

const data = {
    labels: ['Mon','Wen','Sat'],
    datasets: [{
        axis: 'y',
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: true,
        backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
            'rgb(54, 162, 235)',
        ],
        borderWidth: 1,
        tension:0.4
    }]
};

const options = {
    plugins: {
        legend: true
    },
    scales: {
        y:{},
        x:{}
    }
}

const LineChartBalanceHistory = () => {
    return (
        <div style={{paddingTop:'20px'}}>
            <div className='line-chart-balance-history'><p>Line Chart</p>
                <Line data={data} options={options}/></div>
        </div>
    );
};

export default LineChartBalanceHistory;