import express from 'express';
import { TradeHistoryAPI } from '../services/tradeHistoryAPI';
import { deltaMiddleware } from '../middlewares/deltaMiddleware ';
import { KucoinTradeHistoryAPI } from '../services/tradeHistoryKucoin';
import { BinanceTradeHistoryAPI } from '../services/tradeHistoryBinance'; 

const router = express.Router();

function getExchangeAPI(exchangeName: string): TradeHistoryAPI {
  switch (exchangeName.toUpperCase()) {
    case 'KUCOIN':
      return new KucoinTradeHistoryAPI();
    case 'BINANCE':
      return new BinanceTradeHistoryAPI();
    // Add more exchanges here
    default:
      throw new Error(`Unsupported exchange: ${exchangeName}`);
  }
}

async function getTrades(api: TradeHistoryAPI, tradingPair: string) {
  const trades = await api.getPublicTradeHistory('exchange name', tradingPair);
  return trades;
}

router.get('/trades/:exchange/:tradingPair', async (req, res, next) => { 
  try {
    const tradingPair = req.params.tradingPair.toUpperCase();
    const exchange = req.params.exchange.toUpperCase();

    const api = getExchangeAPI(exchange);

    const trades = await getTrades(api, tradingPair);

    res.locals.trades = trades;
    next();
  } catch (error) {
    next(error);
  }
}, deltaMiddleware, (req, res) => {
  const tradingPair = req.params.tradingPair.toUpperCase();
  const delta = res.locals.delta;

  res.status(200).json({
    pair: tradingPair,
    delta: delta,
  });
});

export default router;
