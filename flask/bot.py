import time

import pandas as pd
from typing import Union, List

import ta

from binance.client import Client
from binance.helpers import round_step_size
from binance.enums import *

timestamp = int(time.time() * 1000)


class BinanceClient:

    def __init__(self, api_key: str, api_secret: str, quote_asset: str, base_asset: str, interval: Enum,
                 aimed_cost_per_position: int):
        self.api_key = api_key
        self.api_secret = api_secret

        self.quote_asset = quote_asset
        self.base_asset = base_asset

        self.symbol_name = str(base_asset) + str(quote_asset)

        self.interval = interval
        self.aimed_cost_per_position = aimed_cost_per_position

        self.client = Client(api_key=api_key, api_secret=api_secret, tld='com', testnet=False)
        # self.client.API_URL = "https://testnet.binance.vision/api"

    def get_api_key(self):
        return self.api_key

    def get_api_secret(self):
        return self.api_secret

    def get_quote_asset(self):
        return self.quote_asset

    def get_base_asset(self):
        return self.base_asset

    def get_symbol_name(self):
        return self.symbol_name

    def get_interval(self):
        return self.interval

    def get_aimed_cost_per_position(self):
        return self.aimed_cost_per_position


class BinanceClientGetFunctions:

    @staticmethod
    def get_futures_exchange_info(user: BinanceClient) -> Union[dict, bool]:

        try:

            return user.client.futures_exchange_info()

        except Exception as e:

            print(e)

            return False

    @staticmethod
    def get_futures_account(user: BinanceClient) -> Union[dict, bool]:

        try:

            return user.client.futures_account()

        except Exception as e:

            print(e)

            return False

    @staticmethod
    def get_futures_symbol_ticker(user: BinanceClient, symbol: str) -> Union[dict, bool]:

        try:

            return user.client.futures_symbol_ticker(symbol=symbol)

        except Exception as e:

            print(e)

            return False

    @staticmethod
    def get_futures_position_information(user: BinanceClient, symbol: Union[str, None]) -> Union[dict, bool]:

        try:

            if symbol == None:
                return user.client.futures_position_information()

            return user.client.futures_position_information(symbol=symbol)

        except Exception as e:

            print(e)

            return False

    @staticmethod
    def get_futures_klines(user: BinanceClient, symbol: str, interval: Enum) -> Union[dict, bool]:

        # Parameter "limit" must remain as 1500 since it is the maximum available
        #   amount and since the indicators are tend to be more accurate with more data

        try:

            return user.client.futures_klines(symbol=symbol,
                                              interval=interval,
                                              limit=1500)

        except Exception as e:

            print(e)

            return False


class BinanceClientPostFunctions:

    @staticmethod
    def futures_create_order(user: BinanceClient, symbol: str, side: str, quantity: float, reduce_Only: bool) -> Union[
        dict, bool]:

        # Parameter "type" must remain as FUTURE_ORDER_TYPE_MARKET since the program designed is fit to market orders.

        try:

            user.client.futures_create_order(symbol=symbol,
                                             side=side,
                                             type=FUTURE_ORDER_TYPE_MARKET,
                                             quantity=quantity,
                                             reduce_Only=reduce_Only)

        except Exception as e:

            print(e)

            return False

    @staticmethod
    def futures_account_transfer(user: BinanceClient, asset: str, amount: float, type: Enum) -> Union[None, bool]:

        try:

            user.client.futures_account_transfer(asset=asset,
                                                 amount=amount,
                                                 type=type)

        except Exception as e:

            print(e)

            return False


class BinanceClientBridgeFunctions:

    @staticmethod
    def get_from_futures_exchange_info(user: BinanceClient, target: str) -> dict:

        # "target" parameter(s) being used in the flow for now: "symbols" (see Enums.py)

        try:

            return BinanceClientGetFunctions.get_futures_exchange_info(user=user)[target]

        except Exception as e:

            print(e)

            pass

    @staticmethod
    def get_from_futures_account(user: BinanceClient, target: str) -> dict:

        # "target" parameter(s) being used in the flow for now: "assets" (see Enums.py)

        try:

            return BinanceClientGetFunctions.get_futures_account(user=user)[target]

        except Exception as e:

            print(e)

            pass

    @staticmethod
    def get_from_futures_symbol_ticker(user: BinanceClient, symbol: str, target: str) -> float:

        # "target" parameter(s) being used in the flow for now: "price" (see Enums.py)

        try:

            result = BinanceClientGetFunctions.get_futures_symbol_ticker(user=user,
                                                                         symbol=symbol)[target]

            if target == "price":
                return float(result)

            return result

        except Exception as e:

            print(e)

            pass

    @staticmethod
    def get_from_futures_position_information(user: BinanceClient, symbol: str, target: str) -> float:

        # "target" parameter(s) being used in the flow for now: "positionAmt" (see Enums.py)

        try:

            result = BinanceClientGetFunctions.get_futures_position_information(user=user,
                                                                                symbol=symbol)[0][target]

            if target == "positionAmt":
                return float(result)

            return result

        except Exception as e:

            print(e)

            pass

    @staticmethod
    def get_futures_klines_properly(user: BinanceClient, symbol: str, interval: Enum) -> pd.Series:

        try:

            klines = BinanceClientGetFunctions.get_futures_klines(user=user,
                                                                  symbol=symbol,
                                                                  interval=interval)

            opens = pd.Series([float(x[1]) for x in klines])
            highs = pd.Series([float(x[2]) for x in klines])
            lows = pd.Series([float(x[3]) for x in klines])
            closes = pd.Series([float(x[4]) for x in klines])
            volumes = pd.Series([float(x[5]) for x in klines])

            return opens, highs, lows, closes, volumes

        except Exception as e:

            print(e)

            pass


class BinanceClientPositionHandler:

    @staticmethod
    def get_symbols_in_position(user: BinanceClient) -> list:

        try:

            return [position["symbol"] for position in
                    BinanceClientGetFunctions.get_futures_position_information(user=user,
                                                                               symbol=None) if
                    float(position["positionAmt"]) != 0]

        except Exception as e:

            text = "An exception occured: {0} at the BinanceClientPositionHandler/get_symbols_in_position()".format(e)

            print(str(text))

    @staticmethod
    def get_position_type(user: BinanceClient, symbol: str) -> str:

        try:

            position_amount = BinanceClientBridgeFunctions.get_from_futures_position_information(user=user,
                                                                                                 symbol=symbol,
                                                                                                 target="positionAmt")

            if position_amount > 0:
                return "LONG"

            if position_amount < 0:
                return "SHORT"

            return "NEUTRAL"

        except Exception as e:

            text = "An exception occured: {0} at the BinanceClientPositionHandler/get_position_type()".format(e)

            print(str(text))


class BinanceClientOrderHandler:

    @classmethod
    def place_order(cls, user: BinanceClient, symbol: str, order_type: str, position_type: str) -> None:

        try:

            if order_type == "OPEN":

                if position_type == "LONG":
                    BinanceClientOrderHandler.__open_long(user=user,
                                                          symbol=symbol)

                if position_type == "SHORT":
                    BinanceClientOrderHandler.__open_short(user=user,
                                                           symbol=symbol)

            if order_type == "CLOSE":

                if position_type == "LONG":
                    BinanceClientOrderHandler.__close_long(user=user,
                                                           symbol=symbol)

                if position_type == "SHORT":
                    BinanceClientOrderHandler.__close_short(user=user,
                                                            symbol=symbol)

        except Exception as e:

            text = "An exception occured: {0} at the BinanceClientOrderHandler/place_order()".format(e)

            print(str(text))

    @classmethod
    def neutral_all(cls, user: BinanceClient) -> None:

        try:

            symbols_in_position = BinanceClientPositionHandler.get_symbols_in_position(
                user=user)

            for curr_symbol in symbols_in_position:

                curr_position_type = BinanceClientPositionHandler.get_position_type(user=user,
                                                                                    symbol=curr_symbol)

                if curr_position_type == "LONG":
                    cls.__close_long(user=user,
                                     symbol=curr_symbol)

                if curr_position_type == "SHORT":
                    cls.__close_short(user=user,
                                      symbol=curr_symbol)

        except Exception as e:

            text = "An exception occured: {0} at the BinanceClientOrderHandler/neutrall_all()".format(e)

            print(str(text))

    @staticmethod
    def __open_short(user: BinanceClient, symbol: str) -> None:

        quantity = BinanceClientOrderQtyHandler.calculate_order_qty(user=user,
                                                                    symbol=symbol,
                                                                    order_type="OPEN")

        order = BinanceClientPostFunctions.futures_create_order(user=user,
                                                                symbol=symbol,
                                                                side=SIDE_SELL,
                                                                quantity=quantity,
                                                                reduce_Only=False)

        if order is not False:
            print("position open/close process is succeed", "order", order, "quantity", quantity)

    @staticmethod
    def __open_long(user: BinanceClient, symbol: str) -> None:

        quantity = BinanceClientOrderQtyHandler.calculate_order_qty(user=user,
                                                                    symbol=symbol,
                                                                    order_type="OPEN")

        order = BinanceClientPostFunctions.futures_create_order(user=user,
                                                                symbol=symbol,
                                                                side=SIDE_BUY,
                                                                quantity=quantity,
                                                                reduce_Only=False)

        if order is not False:
            print("position open/close process is succeed", "order", order, "quantity", quantity)

    @staticmethod
    def __close_short(user: BinanceClient, symbol: str) -> None:

        quantity = BinanceClientOrderQtyHandler.calculate_order_qty(user=user,
                                                                    symbol=symbol,
                                                                    order_type="CLOSE")

        order = BinanceClientPostFunctions.futures_create_order(user=user,
                                                                symbol=symbol,
                                                                side=SIDE_BUY,
                                                                quantity=quantity,
                                                                reduce_Only=True)

        if order is not False:
            print("position open/close process is succeed", "order", order, "quantity", quantity)

    @staticmethod
    def __close_long(user: BinanceClient, symbol: str) -> None:

        quantity = BinanceClientOrderQtyHandler.calculate_order_qty(user=user,
                                                                    symbol=symbol,
                                                                    order_type="CLOSE")

        order = BinanceClientPostFunctions.futures_create_order(user=user,
                                                                symbol=symbol,
                                                                side=SIDE_SELL,
                                                                quantity=quantity,
                                                                reduce_Only=True)

        if order is not False:
            print("position open/close process is succeed", "order", order, "quantity", quantity)


class BinanceClientOrderQtyHandler:

    @classmethod
    def calculate_order_qty(cls, user: BinanceClient, symbol: str, order_type: str) -> Union[float, None]:

        try:

            if order_type == "OPEN":
                return cls.__calculate_qty_to_open_order(user=user,
                                                         symbol=symbol)

            if order_type == "CLOSE":
                return cls.__calculate_qty_to_close_order(user=user,
                                                          symbol=symbol)

        except Exception as e:

            text = "An exception occured: {0} at the BinanceClientOrderQtyHandler/calculate_order_qty()".format(e)

            print(str(text))

#
# BinanceClient örneği ve sembol bilgisi parametre olarak alınır.
# current_lot_price değişkeni, BinanceClientBridgeFunctions modülündeki get_from_futures_symbol_ticker işlevi kullanılarak kullanıcının belirli sembol için güncel fiyatını alır.
# current_wallet_balance değişkeni, BianceClientPropertyHandler modülündeki get_asset_property işlevi kullanılarak kullanıcının cüzdan bakiyesini alır.
# step_size değişkeni, BianceClientPropertyHandler modülündeki get_symbol_property işlevi kullanılarak sembol için adım büyüklüğünü alır.
# notional değişkeni, BianceClientPropertyHandler modülündeki get_symbol_property işlevi kullanılarak sembol için minimum değeri alır.
# aimed_quantity, kullanıcının hedeflediği her bir pozisyon için hesaplanan miktarı belirli bir adım büyüklüğüne yuvarlar.
# aimed_cost, hedeflenen miktarı güncel fiyatla çarparak elde eder.
# Eğer hedeflenen maliyet, mevcut cüzdan bakiyesinden yüksekse, "Hesap, {} sembolü için sipariş açmak için yeterli bakiyeye sahip değil." şeklinde bir hata mesajı yazdırır ve None değeri döndürür.
# Eğer hedeflenen maliyet, minimum notional değerinden düşükse, "Hedeflenen maliyet, {} sembolü için minimum notional değerinden düşüktür." şeklinde bir hata mesajı yazdırır ve None değeri döndürür.
# Eğer hedeflenen miktar, adım büyüklüğünden düşükse, "Hedeflenen miktar, {} sembolü için adım büyüklüğünden düşüktür." şeklinde bir hata mesajı yazdırır ve None değeri döndürür.
# Yukarıdaki hata kontrollerinden geçen durumlarda, hesaplanan miktarı ondalık bir sayı olarak döndürür.
    @staticmethod
    def __calculate_qty_to_open_order(user: BinanceClient, symbol: str) -> Union[float, None]:

        current_lot_price = BinanceClientBridgeFunctions.get_from_futures_symbol_ticker(user=user,
                                                                                        symbol=symbol,
                                                                                        target="price")

        current_wallet_balance = BianceClientPropertyHandler.get_asset_property(user=user,
                                                                                asset=user.get_quote_asset(),
                                                                                target="availableBalance")

        step_size = BianceClientPropertyHandler.get_symbol_property(user=user,
                                                                    symbol=symbol,
                                                                    target="stepSize")

        notional = BianceClientPropertyHandler.get_symbol_property(user=user,
                                                                   symbol=symbol,
                                                                   target="notional")

        aimed_quantity = round_step_size(
            user.get_aimed_cost_per_position() / current_lot_price, step_size)

        aimed_cost = aimed_quantity * current_lot_price

        if aimed_cost > current_wallet_balance:
            text = "The account does not have enough balance to open order for {}.".format(
                symbol)

            print(str(text))

            return

        if aimed_cost < notional:
            text = "The aimed cost to open order for {} is lower than the minimum notional.".format(
                symbol)

            print(str(text))

            return

        if aimed_quantity < step_size:
            text = "The aimed quantity to open order for {} is lower than the step size.".format(
                symbol)

            print(str(text))

            return

        return float(round(aimed_quantity, 6))

    @staticmethod
    def __calculate_qty_to_close_order(user: BinanceClient, symbol: str) -> float:

        quantity_owned = float(abs(BinanceClientBridgeFunctions.get_from_futures_position_information(user=user,
                                                                                                      symbol=symbol,
                                                                                                      target="positionAmt")))

        step_size = BianceClientPropertyHandler.get_symbol_property(user=user,
                                                                    symbol=symbol,
                                                                    target="stepSize")

        if quantity_owned % step_size != 0:
            # If rounding is needed

            quantity_rounded = round_step_size(quantity_owned, step_size)

            if quantity_rounded <= quantity_owned:
                # If round_step_size() rounded it down and so there is no logical errors

                aimed_quantity = quantity_rounded

            else:
                # If round_step_size() rounded it up and so the rounded quantity must be decreased with amount of 1 step size

                aimed_quantity = quantity_rounded - step_size

        else:

            aimed_quantity = quantity_owned

        return float(round(aimed_quantity, 6))


class BianceClientPropertyHandler:

    @staticmethod
    def get_asset_property(user: BinanceClient, asset: str, target: str) -> float:

        try:

            result = list(filter(lambda curr_dict: curr_dict["asset"] == asset,
                                 BinanceClientBridgeFunctions.get_from_futures_account(user=user,
                                                                                       target="assets")))[0][target]

            if target == "availableBalance" or "walletBalance" or "unrealizedProfit" or "marginBalance":
                return float(result)

            return result

        except Exception as e:

            text = "An exception occured: {0} at the BianceClientPropertyHandler/get_asset_property()".format(e)

            print(str(text))

    @staticmethod
    def get_symbol_property(user: BinanceClient, symbol: str, target: str) -> float:

        try:

            if target == "notional":
                return float([info["filters"][5]["notional"] for info in
                              BinanceClientBridgeFunctions.get_from_futures_exchange_info(user=user,
                                                                                          target="symbols") if
                              info["symbol"] == symbol][0])

            if target == "stepSize":
                return float([info["filters"][2]["stepSize"] for info in
                              BinanceClientBridgeFunctions.get_from_futures_exchange_info(user=user,
                                                                                          target="symbols") if
                              info["symbol"] == symbol][0])

        except Exception as e:

            text = "An exception occured: {0} at the BianceClientPropertyHandler/get_symbol_property()".format(e)

            print(str(text))


class Ema:
    WINDOW = 89

    @classmethod
    def calculate_ema(cls, closes: pd.Series) -> pd.Series:
        return pd.Series(ta.trend.EMAIndicator(close=closes,
                                               window=cls.WINDOW).ema_indicator(), dtype=float)


class Strategy:

    @classmethod
    def determinator(cls, user: BinanceClient, symbol: str):

        _, _, _, closes, _ = BinanceClientBridgeFunctions.get_futures_klines_properly(user=user, symbol=symbol,
                                                                                      interval=user.get_interval())

        return cls.ema_controller(closes=closes)

    @staticmethod
    def ema_controller(closes: pd.Series):

        ema = Ema.calculate_ema(closes=closes)
        current_ema = ema.iloc[-1]

        current_close = closes.iloc[-1]

        if current_close > current_ema:
            return "LONG"

        if current_close < current_ema:
            return "SHORT"


class TradingSequenceHandler:

    @classmethod
    def run(cls, user: BinanceClient):

        symbol_name = user.get_symbol_name()

        current_position_type = BinanceClientPositionHandler.get_position_type(user=user, symbol=symbol_name)

        position_type = Strategy.determinator(user=user, symbol=symbol_name)

        if current_position_type == "LONG":

            if position_type == "SHORT":
                BinanceClientOrderHandler.place_order(user=user, symbol=symbol_name, order_type="CLOSE",
                                                      position_type="LONG")
                BinanceClientOrderHandler.place_order(user=user, symbol=symbol_name, order_type="OPEN",
                                                      position_type="SHORT")

            if position_type == "LONG":
                pass

        if current_position_type == "SHORT":

            if position_type == "LONG":
                BinanceClientOrderHandler.place_order(user=user, symbol=symbol_name, order_type="CLOSE",
                                                      position_type="SHORT")
                BinanceClientOrderHandler.place_order(user=user, symbol=symbol_name, order_type="OPEN",
                                                      position_type="LONG")

            if position_type == "SHORT":
                pass

        if current_position_type == "NEUTRAL":

            if position_type == "LONG":
                BinanceClientOrderHandler.place_order(user=user, symbol=symbol_name, order_type="OPEN",
                                                      position_type="LONG")

            if position_type == "SHORT":
                BinanceClientOrderHandler.place_order(user=user, symbol=symbol_name, order_type="OPEN",
                                                      position_type="SHORT")


class SequenceController:
    bot_enabled = True

    @classmethod
    def set_bot_enabled(cls, enabled: bool) -> bool:
        cls.bot_enabled = enabled

    @classmethod
    def get_bot_enabled(cls):
        return cls.bot_enabled


def start_bot(user: BinanceClient):
    SequenceController().set_bot_enabled(True)
    main(user)


def stop_bot():
    SequenceController().set_bot_enabled(False)


def main(user: BinanceClient):
    while True:

        if SequenceController.get_bot_enabled():

            current_time = time.localtime()

            if current_time.tm_sec == 0:

                if current_time.tm_min % 1 == 0:
                    TradingSequenceHandler.run(user=user)

                    print("It is 15 mins")
                time.sleep(1)


if __name__ == "__main__":
    user = BinanceClient(api_key="zZbx7snepP5Sq0VXpKRGqvxADBXsDnw3IU14IBzmwKN9GdqFANxsYXgFgSG2KOFv",
                         api_secret="jB0HqOKW8W6TP0oHAf2TBWtv1lc8bUKgLKo8lJKUGo2mCCiqN8xvFynZfvqtMT5k",
                         quote_asset="USDT",
                         base_asset="MASK",
                         interval=KLINE_INTERVAL_1MINUTE,
                         aimed_cost_per_position=10)

    print(BinanceClientGetFunctions.get_futures_position_information(user, 'MASKUSDT'))

    main(user=user)
