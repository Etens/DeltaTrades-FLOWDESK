import express from 'express';
import { getPublicTradeHistory } from '../services/exchangeService';
import { deltaMiddleware } from '../middlewares/deltaMiddleware ';

const router = express.Router();

router.get('/trades/:tradingPair', async (req, res, next) => {
  try {
    const tradingPair = req.params.tradingPair.toUpperCase();
    const trades = await getPublicTradeHistory(tradingPair);

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
