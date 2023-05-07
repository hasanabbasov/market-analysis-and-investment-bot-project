import React,{useState} from 'react'
import './DiscoveryPage.css'

const DiscoveryPage = () => {
    const [asset, setAsset] = useState('');
    const [amount, setAmount] = useState(0);
    const [response, setResponse] = useState(null);

    const handleTransfer = async () => {
        try {
            const result = await fetch(`http://127.0.0.1:5000/transferSpotToFuture/${asset}/${amount}`, {
                method: 'POST',
            });
            const data = await result.json();
            setResponse(data);
        } catch (error) {
            console.error('Transfer error:', error);
            setResponse({ error: 'Transfer işlemi sırasında bir hata oluştu.' });
        }
    };

    return (
        <div>
            <h2>Spot Hesabından Future Hesaba Transfer</h2>
            <label>
                Varlık:
                <input
                    type="text"
                    value={asset}
                    onChange={(e) => setAsset(e.target.value)}
                    placeholder="Örnek: BTC"
                />
            </label>
            <br />
            <label>
                Miktar:
                <input
                    type="number"
                    step="0.0001"
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                    placeholder="Örnek: 0.1"
                />
            </label>
            <br />
            <button onClick={handleTransfer}>Transfer Et</button>
            {response && (
                <div>
                    <h3>Sonuç:</h3>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default DiscoveryPage