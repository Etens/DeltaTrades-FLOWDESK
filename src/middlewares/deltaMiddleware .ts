import { Request, Response, NextFunction } from "express";
import { Trade } from "../models/trade";
import { KucoinTradeHistoryAPI } from "../services/tradeHistoryKucoin";

let deltaCumulative = 0;

export async function deltaMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const exchange = req.params.exchange;
  const tradingPair = req.params.tradingPair;
  exchange.toUpperCase();

  let trades: Trade[] = [];
  let api;
  if (exchange === "kucoin") {
    api = new KucoinTradeHistoryAPI();
    trades = await api.getPublicTradeHistory(tradingPair);
    // --- ADD HERE NEW EXCHANGE --
  } else {
    console.error(`Unknown exchange: ${exchange}`);
  }

  // --- DELTA CALCULATION ---
  for (const trade of trades) {
    if (trade.side === "buy") {
      deltaCumulative += trade.size;
    } else if (trade.side === "sell") {
      deltaCumulative -= trade.size;
    }
  }

  // --- SET DELTA IN RESPONSE ---
  res.locals.delta = Number(deltaCumulative.toFixed(2));
  next();
}
