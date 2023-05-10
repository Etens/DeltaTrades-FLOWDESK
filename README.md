-- CUMULATIVE DELTA FOR PUBLIC TRADES -- 
This project provides a REST API to calculate the cumulative delta for a specific trading pair. It fetches the public trade history from the Kucoin exchange, computes the cumulative delta from the historical trades, and returns it.

-- INSTALLATION --
To install and run the project locally, you will need NodeJS and Typescript installed. Clone the repository and install the dependencies using npm:
---- git clone https://github.com/Etens/cumulative-delta-trades
---- cd cumulative-delta
---- npm install

-- USAGE --
To start the server, run the following command:
---- npm start
By default, the server will listen on port 3000. You can change the port by setting the PORT environment variable.
To get the cumulative delta for a specific trading pair, make a GET request to the following endpoint:
---- /trades/:exchange/:tradingPair
Replace :exchange with the name of the exchange (currently only Kucoin is supported), and :tradingPair with the trading pair you want to get the cumulative delta for (e.g., BTC-USDT).
The response will be a JSON object with the following properties:
---- exchange: the name of the exchange
---- pair: the trading pair
---- delta: the cumulative delta for the trading pair