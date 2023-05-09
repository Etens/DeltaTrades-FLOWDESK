import { Request, Response, NextFunction } from 'express';
import { Trade } from '../models/trade';
import { KucoinTradeHistoryAPI } from '../services/tradeHistoryKucoin';
import { BinanceTradeHistoryAPI } from '../services/tradeHistoryBinance'; 

let deltaCumulative = 0;

export async function deltaMiddleware(req: Request, res: Response, next: NextFunction) {
  const exchange = req.params.exchange;
  const tradingPair = req.params.tradingPair;
  
  let trades: Trade[] = [];
  let api;

  if (exchange === 'kucoin') {
    api = new KucoinTradeHistoryAPI();
    trades = await api.getPublicTradeHistory(tradingPair);
  } else if (exchange === 'binance') {
    api = new BinanceTradeHistoryAPI();
    trades = await api.getPublicTradeHistory(tradingPair);
  } else {
    console.error(`Unknown exchange: ${exchange}`);
  }

  console.log(`Received ${trades.length} trades from ${exchange}`);

  for (const trade of trades) {
    if (trade.side === 'buy') {
      deltaCumulative += trade.size;
    } else if (trade.side === 'sell') {
      deltaCumulative -= trade.size;
    }
  }

  res.locals.delta = Number(deltaCumulative.toFixed(2));
  next();
}
