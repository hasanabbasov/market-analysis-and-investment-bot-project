import pandas as pd
import plotly.graph_objects as go
from binance.client import Client
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsRegressor


# The workings of the code are as follows:
#
# Data Retrieval: The fetch_data method is used to fetch the last 1500 data points for the specified symbol.
# Each row of data corresponds to a 1-5-15-minute time interval and includes the opening (open),
# highest (high), lowest (low), and closing (close) prices.
#
# Data Preparation: The prepare_features method is used to append the next closing price (next_close) to each row.
# This is the target variable we are trying to predict.
#
# Model Training: The train_model method is used to train the model.
# At this stage, the model uses the opening, closing, highest,
# and lowest prices as input and tries to predict the next closing price.
# The model is trained using a K-Nearest Neighbors Regressor,
# which makes predictions based on the average of the target values of the specified number of (in this case 5) nearest neighbors.
#
# Prediction: The predict_next_close method is used for the model to make a prediction about the next closing price based on the given input data.

class StockPredictor:

    # Bu method'da Binance modelinden son 1500 datayi cekiyoruz. 1500 cekmemizin sebebi Binance'in bize verdiyi max limit bu.
    @classmethod
    def fetch_data(cls, user, symbol, timeframe):
        klines = user.futures_klines(symbol=symbol, interval=timeframe, limit=1500)
        opens = pd.Series([float(x[1]) for x in klines])
        highs = pd.Series([float(x[2]) for x in klines])
        lows = pd.Series([float(x[3]) for x in klines])
        closes = pd.Series([float(x[4]) for x in klines])

        cls.data = pd.DataFrame({'open': opens, 'high': highs, 'low': lows, 'close': closes})

    @staticmethod
    def prepare_features():
        if StockPredictor.data is not None:
            StockPredictor.data['next_close'] = StockPredictor.data['close'].shift(-1)
            StockPredictor.data = StockPredictor.data.dropna()  # Remove rows with NaN values

    @staticmethod
    def train_model():
        X = StockPredictor.data[['open', 'close', 'high', 'low']]
        y = StockPredictor.data['next_close']

        X_train, _, y_train, _ = train_test_split(X, y, test_size=0.2, random_state=1)

        # Adjust the number of neighbors as needed
        StockPredictor.model = KNeighborsRegressor(n_neighbors=5)
        StockPredictor.model.fit(X_train, y_train)

    @staticmethod
    def predict_next_close(input_data):
        return StockPredictor.model.predict(input_data)

    @staticmethod
    def plot_predictions():
        last_20_real_close = StockPredictor.data['close'].tail(20)
        last_20_input_data = StockPredictor.data[['open', 'close', 'high', 'low']].tail(20)
        next_close_prediction = StockPredictor.predict_next_close(last_20_input_data)
        next_day_prediction = pd.Series(next_close_prediction, index=last_20_real_close.index)

        fig = go.Figure()
        fig.add_trace(go.Scatter(x=last_20_real_close.index, y=next_day_prediction, name='Predicted Close'))
        fig.add_trace(go.Scatter(x=last_20_real_close.index, y=last_20_real_close.shift(-1), name='Real Close'))

        fig.update_layout(
            xaxis=dict(title='Time'),
            yaxis=dict(title='Close Price'),
            title='Real Close vs. Predicted Close',
            showlegend=True
        )
        fig.show()


def main():
    # Example usage
    StockPredictor.fetch_data(user=Client(), symbol="MASKUSDT", timeframe="1m")
    StockPredictor.prepare_features()
    StockPredictor.train_model()

    # Prepare input data for prediction (last row of historical data)
    input_data = StockPredictor.data[['open', 'close', 'high', 'low']].tail(1)
    next_close_prediction = StockPredictor.predict_next_close(input_data)
    print("Next Close Price Prediction:", next_close_prediction)

    # Plot the last 20 elements of real close values and predictions
    StockPredictor.plot_predictions()


if __name__ == "__main__":
    main()
