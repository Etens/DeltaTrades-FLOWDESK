import express from 'express';
import { TradeHistoryAPI } from '../services/tradeHistoryAPI';
import { deltaMiddleware } from '../middlewares/deltaMiddleware ';
import { KucoinTradeHistoryAPI } from '../services/tradeHistoryKucoin';

const router = express.Router();

function getExchangeAPI(exchangeName: string): TradeHistoryAPI {
  switch (exchangeName.toUpperCase()) {
    case 'KUCOIN':
      return new KucoinTradeHistoryAPI();
    // --- ADD HERE NEW EXCHANGE --
    default:
      throw new Error(`Unsupported exchange: ${exchangeName}`);
  }
}

async function getTrades(api: TradeHistoryAPI, exchangeName: string, tradingPair: string) {
  const trades = await api.getPublicTradeHistory(exchangeName, tradingPair);
  return trades;
}

router.get('/trades/:exchange/:tradingPair', async (req, res, next) => { 
  try {
    const exchangeName = req.params.exchange.toUpperCase();
    const tradingPair = req.params.tradingPair.toUpperCase();
    const api = getExchangeAPI(exchangeName);
    const trades = await getTrades(api, exchangeName, tradingPair);
    res.locals.trades = trades;
    next();
  } catch (error) {
    next(error);
  }
}, deltaMiddleware, (req, res) => {
  const exchangeName = req.params.exchange.toUpperCase();
  const tradingPair = req.params.tradingPair.toUpperCase();
  const delta = res.locals.delta;

  res.status(200).json({
    exchange: exchangeName,
    pair: tradingPair,
    delta: delta,
  });
});

export default router;
