import React, {useState, useEffect} from 'react'

const Charts = () =>{
    const [data, setData] = useState();

    useEffect(() => {
        const exampleSocket = new WebSocket(
            "wss://stream.binance.com:9443/ws/btcusdt@trade"
        );

        exampleSocket.onmessage = (event) => {
            setData(JSON.parse(event.data));
        };

        // clean up the WebSocket connection on unmounting
        return () => {
            exampleSocket.close();
        };
    }, []); // dependency array should be empty, so that the effect only runs once

    return (
        <div>
            {data && (
                <p>
                    Latest trade: {data.s} - {data.p} - {data.q}
                </p>
            )}

        </div>
    );
};
export default Charts