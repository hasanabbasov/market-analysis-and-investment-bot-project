from flask import Flask, jsonify
from flask_cors import CORS
from binance.enums import *
from flask import request
from binance.client import Client
from binance.exceptions import BinanceAPIException
from datetime import datetime, timedelta
import threading
from flask_sqlalchemy import SQLAlchemy
from config import Config
from sqlalchemy import text
from ModelingWithMl import StockPredictor
import bot

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
CORS(app)

global_userId = 1
def get_user_data_from_db(user_id):
    with app.app_context():
        result = db.session.execute(text(f"SELECT api_key, secruty_key FROM binance WHERE user_id = :user_id LIMIT 1"), {'user_id': user_id})
        row = result.fetchone()
        if row:
            api_keys = row[0]
            security_keys = row[1]
            return  api_keys, security_keys
        else:
            raise Exception("API anahtarları bulunamadı.")


# Symbol: Pozisyonun geçerli olduğu varlık çifti.
# Size: Pozisyon büyüklüğü.
# Entry Price: Pozisyonun açılış fiyatı.
# Mark Price: Pozisyonun mevcut piyasa fiyatı.
# Unrealized PNL (ROE%): Gerçekleşmemiş kar veya zarar (Yatırım getirisi yüzdesi).
@app.route('/futures_positions', methods=['GET'])
def get_futures_positions():
    userId = request.args.get('userId')
    api_keys, security_keys = get_user_data_from_db(userId)
    client = Client(api_keys, security_keys)
    futures_positions = client.futures_position_information()
    open_positions = [position for position in futures_positions if float(position['positionAmt']) != 0]
    # Döndürmek istediğimiz bilgilere göre pozisyon bilgilerini filtreliyoruz
    formatted_positions = []
    for position in open_positions:
        formatted_position = {
            'Symbol': position['symbol'],
            'Size': float(position['positionAmt']),
            'Entry Price': float(position['entryPrice']),
            'Mark Price': float(position['markPrice']),
            'Unrealized PNL (ROE%)': float(position['unRealizedProfit'])
        }
        formatted_positions.append(formatted_position)
    return jsonify(formatted_positions)


# Bu kod bakiye bilgimi cekiyor ve ardindan piyasadaki fiyat bilgilerini ceker ve total fiyati ile carpar;

@app.route('/active_invest', methods=['GET'])
def get_active_invest():
    userId = request.args.get('userId')
    api_keys, security_keys = get_user_data_from_db(userId)
    client = Client(api_keys, security_keys)
    account_info = client.get_account()
    balances = {}
    for balance in account_info['balances']:
        asset = balance['asset'] + "USDT"
        free = float(balance['free'])
        locked = float(balance['locked'])
        total = free + locked

        if total > 0:  # sadece cüzdanınızda olan varlıkları kontrol ediyoruz
            try:
                avg_price_info = client.get_avg_price(symbol=asset)
                avg_price = float(avg_price_info['price'])
            except BinanceAPIException:
                avg_price = 0  # Eğer bir hata olursa, avg_price değerini 0 olarak ayarlıyoruz
            usd_value = total * avg_price
            balances[asset] = {'free': free, 'locked': locked, 'total': usd_value}

    filtered_data = {key: value for key, value in balances.items() if value["total"] != 0}
    return jsonify(filtered_data)


@app.route('/btc_price_last_24_hours', methods=['GET'])
def get_btc_price_last_24_hours():
    userId = request.args.get('userId')
    api_keys, security_keys = get_user_data_from_db(userId)
    client = Client(api_keys, security_keys)
    now = datetime.now()
    twenty_four_hours_ago = now - timedelta(hours=24)

    klines = client.get_historical_klines("BTCUSDT", Client.KLINE_INTERVAL_1HOUR,
                                          twenty_four_hours_ago.strftime("%d %b %Y %H:%M:%S"),
                                          now.strftime("%d %b %Y %H:%M:%S"))

    hourly_prices = {}
    for kline in klines:
        time_end = datetime.utcfromtimestamp(int(kline[6]) / 1000).strftime('%H:%00')  # kline data is in milliseconds
        avg_price = (float(kline[2]) + float(kline[3])) / 2  # Calculating average between high and low prices
        hourly_prices[time_end] = avg_price

    return jsonify(hourly_prices)


# Bu örnekte, tüm çiftlerin 24 saatlik fiyat değişimlerini alıyoruz ve en çok değer kazanan veya kaybeden ilk 10 çifti döndürüyoruz.
# symbol: İlgili ticaret çiftinin adını temsil eder. Bu örnekte "BTCUSDT", Bitcoin'in Amerikan Doları karşısındaki değerini temsil eder.
#
# priceChange: Son 24 saat içindeki fiyat değişimini temsil eder.
#
# priceChangePercent: Son 24 saatteki fiyat değişim yüzdesini temsil eder.
#
# weightedAvgPrice: Son 24 saat boyunca hacim ağırlıklı ortalama fiyatı temsil eder.
#
# prevClosePrice: Önceki 24 saatlik periyodun kapanış fiyatını temsil eder.
#
# lastPrice: En son gerçekleşen ticaretin fiyatını temsil eder.
#
# lastQty: En son gerçekleşen ticaretin miktarını temsil eder.
#
# bidPrice: Şu anda geçerli olan en yüksek alış fiyatını temsil eder.
#
# bidQty: En yüksek alış fiyatındaki miktarı temsil eder.
#
# askPrice: Şu anda geçerli olan en düşük satış fiyatını temsil eder.
#
# askQty: En düşük satış fiyatındaki miktarı temsil eder.
#
# openPrice: Son 24 saatlik periyodun açılış fiyatını temsil eder.
#
# highPrice: Son 24 saat içindeki en yüksek fiyatı temsil eder.
#
# lowPrice: Son 24 saat içindeki en düşük fiyatı temsil eder.
#
# volume: Son 24 saatte ticareti gerçekleştirilen Bitcoin miktarını temsil eder.
#
# quoteVolume: Son 24 saatte ticareti gerçekleştirilen Amerikan Doları miktarını temsil eder.
@app.route('/top_change', methods=['GET'])
def get_top_change():
    userId = request.args.get('userId')
    api_keys, security_keys = get_user_data_from_db(userId)
    client = Client(api_keys, security_keys)
    tickers = client.get_ticker()

    # Tüm çiftler için 24 saatlik fiyat değişimlerini alın
    price_changes = {}
    for ticker in tickers:
        symbol = ticker['symbol']
        change = ticker['priceChangePercent']
        price_changes[symbol] = float(change)

    # En çok değer kazanan 10 çifti ve en çok değer kaybeden 10 çifti bulun
    top_gainers = dict(sorted(price_changes.items(), key=lambda item: item[1], reverse=True)[:10])
    top_losers = dict(sorted(price_changes.items(), key=lambda item: item[1])[:10])

    return jsonify({'gainers': top_gainers, 'losers': top_losers})


@app.route('/top_volume', methods=['GET'])
def get_top_volume():
    userId = request.args.get('userId')
    api_keys, security_keys = get_user_data_from_db(userId)
    client = Client(api_keys, security_keys)
    tickers = client.get_ticker()

    # Tüm çiftler için 24 saatlik işlem hacmini alın
    volume_changes = {}
    for ticker in tickers:
        symbol = ticker['symbol']
        volume = ticker['weightedAvgPrice']
        volume_changes[symbol] = float(volume)

    # En yüksek işlem hacmine sahip 20 çifti ve en düşük işlem hacmine sahip
    top_high_volume = dict(sorted(volume_changes.items(), key=lambda item: item[1], reverse=True)[:19])
    # top_low_volume = dict(sorted(volume_changes.items(), key=lambda item: item[1])[:10])

    return jsonify({'high_volume': top_high_volume})


# TODO
# burasi 1002 hatasi veriyor arastir

@app.route('/futures_income_history')
def futures_income_history():
    userId = request.args.get('userId')
    api_keys, security_keys = get_user_data_from_db(userId)
    client = Client(api_keys, security_keys)
    asset = 'USDT'
    amount = float(1)
    types = "1"
    account_info = client.futures_account_transfer(asset=asset, amount=amount, type=types)
    print("account_info", account_info)
    return account_info


# profile karti icin kullaniliyor
@app.route('/usdt_future_balance', methods=['POST'])
def get_account_future_balance():
    data = request.json
    userId = data.get('userId')
    api_keys, security_keys = get_user_data_from_db(userId)
    client = Client(api_keys, security_keys)
    try:
        # Binance vadeli hesap bakiyesini alın
        futures_account = client.futures_account()
        # Sadece availableBalance ve totalWalletBalance bilgilerini içeren bir JSON nesnesi oluşturun
        result = {'availableBalance': futures_account['availableBalance'],
                  'totalWalletBalance': futures_account['totalWalletBalance']}
        return result
    except BinanceAPIException as e:
        return str(e)


@app.route('/usdt_spot_balance', methods=['POST'])
def get_account_spot_balance():
    data = request.json
    userId = data.get('userId')
    api_keys, security_keys = get_user_data_from_db(userId)
    client = Client(api_keys, security_keys)
    try:
        # Binance spot hesap bakiyesini alın
        account = client.get_account()
        print("account", account)
        # Sadece USDT varlığının bakiyesini alın
        usdt_balance = next(item for item in account['balances'] if item['asset'] == 'USDT')['free']
        print("usdt_balance", usdt_balance)
        return {'usdt_balance': usdt_balance}
    except BinanceAPIException as e:
        return str(e)


# Slect Box icin kullaniliyor
@app.route('/usdt_symbols')
def get_usdt_symbols():
    userId = request.args.get('userId')
    api_keys, security_keys = get_user_data_from_db(userId)
    client = Client(api_keys, security_keys)
    exchange_info = client.get_exchange_info()
    exchange_info_symbols = exchange_info['symbols']
    USDT_symbols = []
    for symbol in exchange_info_symbols:
        if symbol['quoteAsset'] == 'USDT':
            USDT_symbols.append(symbol['symbol'])
    print("USDT_symbols: ", USDT_symbols)
    return jsonify(USDT_symbols)


@app.route('/top')
def get_top_gainers():
    api_keys, security_keys = get_user_data_from_db(10)
    client = Client(api_keys, security_keys)
    # Get all USDT trading pairs
    exchange_info = client.get_exchange_info()
    usdt_pairs = [pair['symbol'] for pair in exchange_info['symbols'] if pair['quoteAsset'] == 'USDT']
    print("usdt_pairs", usdt_pairs)
    # Get klines for each USDT trading pair in the last 10 minutes
    klines = {}
    for pair in usdt_pairs:
        klines[pair] = client.get_klines(symbol=pair, interval=Client.KLINE_INTERVAL_1MINUTE, limit=10)
        print(" klines[pair]", klines[pair])
    # Calculate price difference for each USDT trading pair
    print("klines", klines)
    price_diffs = {}
    for pair in klines:
        start_price = float(klines[pair][0][1])
        print("start_price", start_price)
        end_price = float(klines[pair][-1][4])
        print("end_price", end_price)
        price_diff = (end_price - start_price) / start_price * 100
        price_diffs[pair] = round(price_diff, 2)
        print("price_diffs", price_diffs)

    # Sort trading pairs by price difference
    sorted_pairs = sorted(price_diffs.items(), key=lambda x: x[1], reverse=True)

    # Get top 10 gainers
    top_gainers = sorted_pairs[:10]
    print("top_gainers", top_gainers)
    # Add a column for increase or decrease and percentage change
    results = []
    for pair in top_gainers:
        change = 1 if float(klines[pair[0]][-1][4]) > float(klines[pair[0]][0][1]) else 0
        percentage_change = f"{pair[1]}%"
        results.append({'symbol': pair[0], 'percentage_change': percentage_change, 'change': change})

    return {'top_gainers': top_gainers, 'results': results}


@app.route('/new-list')
def get_new_listing():
    api_keys, security_keys = get_user_data_from_db(10)
    client = Client(api_keys, security_keys)
    # Calculate date range
    end_date = datetime.utcnow()
    start_date = end_date - timedelta(days=90)

    # Get all USDT trading pairs
    exchange_info = client.get_exchange_info()
    usdt_pairs = [pair['symbol'] for pair in exchange_info['symbols'] if pair['quoteAsset'] == 'USDT']

    # Get klines for each USDT trading pair in the last 3 months
    klines = {}
    for pair in usdt_pairs:
        klines[pair] = client.get_historical_klines(symbol=pair, interval=Client.KLINE_INTERVAL_1DAY,
                                                    start_str=start_date.strftime("%d %b %Y"),
                                                    end_str=end_date.strftime("%d %b %Y"))

    # Get list of coins that were listed in the last 3 months
    new_listings = []
    for pair in klines:
        if len(klines[pair]) > 0:
            listed_date = datetime.fromtimestamp(klines[pair][0][0] / 1000)
            if listed_date >= start_date and listed_date <= end_date:
                new_listings.append(pair)

    return str(new_listings)


# TODO
@app.route('/transfer_to_futures', methods=['POST'])
def transfer_to_futures():
    data = request.get_json()
    userId = data.get('userId')
    api_keys, security_keys = get_user_data_from_db(userId)
    client = Client(api_keys, security_keys)
    try:
        asset = data.get('asset')
        amount = data.get('amount')
        type = data.get("type")
        print("asset", asset)
        print("amount", amount)
        print("type", type)
        print("", )
        if not asset or not amount:
            return jsonify({'error': 'Asset ve amount parametreleri gereklidir.'}), 400
        # Transferi gerçekleştir
        result = client.futures_account_transfer(asset=asset, amount=amount, type=type)
        return jsonify(result)
    except BinanceAPIException as e:
        return jsonify({'error': str(e)}), 400


# Chart Uzerinde coin alim satim yapar
@app.route('/buy', methods=['POST'])
def buy():
    data = request.json
    userId = data['userId']
    print("userId", userId)
    api_keys, security_keys = get_user_data_from_db(userId)
    client = Client(api_keys, security_keys)
    symbol = data['symb']
    amount = data['amount']
    print("symbol", symbol)
    print("amount", amount)
    try:
        order = client.create_order(
            symbol=symbol,
            side=SIDE_BUY,
            type=ORDER_TYPE_MARKET,
            quantity=amount)
    except Exception as e:
        # Hata durumunda JSON formatında hata mesajı gönder
        return jsonify({'error': str(e)}), 400
    return 'buy'


@app.route('/sell', methods=['POST'])
def sell():
    data = request.json
    userId = data['userId']
    api_keys, security_keys = get_user_data_from_db(userId)
    client = Client(api_keys, security_keys)
    symbol = data['symb']
    amount = data['amount']
    print("symbol", symbol)
    print("amount", amount)
    try:
        order = client.create_order(
            symbol=symbol,
            side=SIDE_SELL,
            type=ORDER_TYPE_MARKET,
            quantity=amount)
    except Exception as e:
        # Hata durumunda JSON formatında hata mesajı gönder
        return jsonify({'error': str(e)}), 400
    return 'sell'


@app.route('/chart-history/post', methods=['POST'])
def chart_history_post():
    data = request.json
    date = data['date']
    lastDate = data['lastDate']

    # chart_history(date, lastDate)
    print("date1 : ", date)
    print("lastDate1 : ", lastDate)
    return lastDate


@app.route('/chart-history', methods=['GET'])
def chart_history():
    userId = request.args.get('userId')
    api_keys, security_keys = get_user_data_from_db(userId)
    client = Client(api_keys, security_keys)
    date = str(request.args.get('date'))
    lastDate = str(request.args.get('lastDate'))
    symbol = request.args.get('symbol')
    interval = request.args.get('interval')
    kline_interval = getattr(Client, interval)
    print("date", date)
    print("lastDate", lastDate)
    print("symbol", symbol)
    print("interval", interval)

    take_sticks_datas = client.get_historical_klines(symbol, kline_interval, lastDate, date)
    # print("take_sticks_datas:", take_sticks_datas)
    divided_take_sticks_datas = []
    for data in take_sticks_datas:
        take_sticks_data = {
            "time": data[0] / 1000,
            "open": float(data[1]),
            "high": float(data[2]),
            "low": float(data[3]),
            "close": float(data[4])
        }
        divided_take_sticks_datas.append(take_sticks_data)
    return jsonify(divided_take_sticks_datas)


# Trader botunu baslatir ve durdurur
@app.route('/start_bot', methods=['POST'])
def start_bot_route():
    userId = request.args.get('userId')
    api_keys, security_keys = get_user_data_from_db(userId)
    client = Client(api_keys, security_keys)
    symbol = request.args.get('symbol')
    symbol = symbol.rstrip('USDT')
    print("symbol", symbol)
    interval = request.args.get('interval')
    print("symbol", symbol)
    print("interval", interval)
    if request.method == 'POST':
        user = bot.BinanceClient(
            api_key=api_keys,
            api_secret=security_keys,
            quote_asset="USDT",
            base_asset=symbol,
            interval=KLINE_INTERVAL_1MINUTE,
            aimed_cost_per_position=10
        )
        # Botu başlatmak için bir arka plan iş parçacığı oluşturun
        bot_thread = threading.Thread(target=bot.start_bot, args=(user,))
        bot_thread.start()
        return jsonify({"status": "success", "message": "Bot başlatıldı."}), 200


@app.route('/stop_bot', methods=['POST'])
def stop_bot_route():
    bot.stop_bot()
    return jsonify({"status": "success", "message": "Bot durduruldu."}), 200


# Ml analysis'i baslatir ve durdurur
@app.route('/real_close', methods=['GET'])
def get_real_close():
    symbol = request.args.get('symbol')
    interval = request.args.get('interval')

    # Fetch and prepare the data
    StockPredictor.fetch_data(user=Client(), symbol=symbol, timeframe=interval)
    StockPredictor.prepare_features()

    last_20_real_close = StockPredictor.data['close'].tail(20).tolist()

    return jsonify(last_20_real_close)


@app.route('/predicted_close', methods=['GET'])
def get_predicted_close():
    symbol = request.args.get('symbol')
    interval = request.args.get('interval')

    # Fetch and prepare the data
    StockPredictor.fetch_data(user=Client(), symbol=symbol, timeframe=interval)
    StockPredictor.prepare_features()

    # Train the model
    StockPredictor.train_model()

    # Prepare input data for prediction (last 20 rows of historical data)
    input_data = StockPredictor.data[['open', 'close', 'high', 'low']].tail(21)
    next_close_predictions = StockPredictor.predict_next_close(input_data).tolist()

    return jsonify(next_close_predictions)


if __name__ == '__main__':
    app.run(debug=True)
