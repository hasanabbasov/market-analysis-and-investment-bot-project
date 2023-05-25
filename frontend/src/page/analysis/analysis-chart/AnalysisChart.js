import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';
import Loading from "../../../component/loading/Loading";

const AnalysisChart = ({symb, interval, refresh}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchData();
    }, [refresh]);

    async function fetchData() {
        setLoading(true);
        let realCloseData = [];
        let predictedCloseData = [];

        try {
            const realCloseResponse = await fetch(`http://localhost:5000/real_close?symbol=${symb}&interval=${interval}`);
            const realCloseResult = await realCloseResponse.json();
            realCloseData = realCloseResult.map((item, index) => ({
                name: index,
                'Real Close': item,
            }));

            const predictedCloseResponse = await fetch(`http://localhost:5000/predicted_close?symbol=${symb}&interval=${interval}`);
            const predictedCloseResult = await predictedCloseResponse.json();
            predictedCloseData = predictedCloseResult.map((item, index) => ({
                'Predicted Close': item,
            }));
        } catch (error) {
            console.error('Error:', error);
        }

        let data = realCloseData.map((item, index) => ({
            ...item,
            ...predictedCloseData[index],
        }));

        setData(data);
        setLoading(false);
    }


    return (
        <div style={{width:"100%", height:"100%", background:"#fff"}}>
            {!loading ? <LineChart
                width={window.innerWidth * 0.77}
                height={window.innerHeight * 0.5}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <YAxis scale="log" domain={['auto', 'auto']} allowDataOverflow={true}>
                    <Label value="Value" angle={-90} position="insideLeft" offset={-10}/>
                </YAxis>
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey="Real Close" stroke="#8884d8" activeDot={{r: 8}}/>
                <Line type="monotone" dataKey="Predicted Close" stroke="#82ca9d"/>
            </LineChart> : <Loading value={"analysis"}/>}
        </div>
    );
}

export default AnalysisChart;
