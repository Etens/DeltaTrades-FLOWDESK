import { Request, Response, NextFunction } from 'express';
import { Trade } from '../models/trade';

let deltaCumulative = 0;

export async function deltaMiddleware(req: Request, res: Response, next: NextFunction) {
  const trades: Trade[] = res.locals.trades;

  for (const trade of trades) {
    if (trade.side === 'buy') {
      deltaCumulative += trade.size;
    } else if (trade.side === 'sell') {
      deltaCumulative -= trade.size;
    }
  }

  res.locals.delta = deltaCumulative;
  next();
}
