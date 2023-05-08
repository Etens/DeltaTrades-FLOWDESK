import express from 'express';
import { TradeHistoryAPI } from '../services/tradeHistoryAPI';
import { deltaMiddleware } from '../middlewares/deltaMiddleware ';
import { KucoinTradeHistoryAPI } from '../services/tradeHistoryKucoin';

const router = express.Router();

async function getTrades(api: TradeHistoryAPI, tradingPair: string) {
  const trades = await api.getPublicTradeHistory(tradingPair);
  return trades;
}

router.get('/trades/:tradingPair', async (req, res, next) => {
  try {
    const tradingPair = req.params.tradingPair.toUpperCase();
    const api = new KucoinTradeHistoryAPI();
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
