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

const options = {
    plugins: {
        legend: {
            labels: {
                // Etiketin rengini belirtir
                color: 'rgb(0,0,0)',
                // Etiketin font-weight'unu belirtir
                font: {
                    weight: 'bold'
                }
            }
        }
    },
    scales: {
        y:{},
        x:{}
    }
}

const LineChartBalanceHistory = ({bitcoinHoursData}) => {
    // `bitcoinHoursData` nesnesini anahtarlar (saatler) ve değerler (fiyatlar) olarak ayır
    const hours = Object.keys(bitcoinHoursData);
    const prices = Object.values(bitcoinHoursData);

    // Veriyi güncelle
    const data = {
        labels: hours,
        datasets: [{
            axis: 'y',
            label: 'Bitcoin 24 hours Data',

            data: prices,
            fill: true,
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgb(4,102,173)',
            ],
            borderWidth: 4,
            tension:1
        }]
    };

    return (
        <div style={{paddingTop:'13px', width:"100%"}}>
            <div className='line-chart-balance-history'>
                <Line data={data} options={options}/>
            </div>
        </div>
    );
};

export default LineChartBalanceHistory;
