import requests
import time
from datetime import datetime
from flask import Flask, render_template, request, json
from decouple import config

app = Flask(__name__)

IFTTT_WEBHOOKS_URL = config("IFTTT")
bitcoin_api_url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'

@app.route('/price', methods=['GET'])
def get_bitcoin_price():
    response = requests.get(bitcoin_api_url)
    response_json = response.json()
    return {"price": "{}".format(response_json['bitcoin']['usd'])}

def get_latest_bitcoin_price():
    response = requests.get(bitcoin_api_url)
    response_json = response.json()
    return response_json['bitcoin']['usd']

def post_ifttt_webhook(event, value):
    data = {'value1': value}
    ifttt_event_url = IFTTT_WEBHOOKS_URL.format(event)
    # Sends a HTTP POST request to the webhook URL
    requests.post(ifttt_event_url, json=data)

@app.route('/api', methods=['GET', 'POST'])
def enter_price_threshold():
    if request.method == 'POST':
        request_data = request.data
        return {"price": "{}".format(request_data)}
    else:
        return {"request": "{}".format(request.data)}

def main():
    bitcoin_history = []
    while True:
        price = get_latest_bitcoin_price()
        date = datetime.now()
        bitcoin_history.append({'date': date, 'price': price})

        # Send an emergency notification
        if price < int(BITCOIN_PRICE_THRESHOLD):
            post_ifttt_webhook('Bitcoin-price-emergency', price)

        # Send a Telegram notification
        # Once we have 5 items in our bitcoin_history send an update
        if len(bitcoin_history) == 5:
            post_ifttt_webhook('bitcoin_price_update', 
                               format_bitcoin_history(bitcoin_history))
            # Reset the history
            bitcoin_history = []

        # Sleep for 5 minutes 
        # (For testing purposes you can set it to a lower number)
        time.sleep(5 * 60)

if __name__ == '__main__':
    main()
