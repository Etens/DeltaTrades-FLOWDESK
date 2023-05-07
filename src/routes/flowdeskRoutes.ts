import express from 'express';
import { getPublicTradeHistory } from '../services/exchangeService';

const router = express.Router();

router.get('/trades/:tradingPair', async (req, res, next) => {
  try {
    const tradingPair = req.params.tradingPair.toUpperCase();
    const trades = await getPublicTradeHistory(tradingPair);
    res.status(200).json(trades);
  } catch (error) {
    next(error);
  }
});

export default router;
