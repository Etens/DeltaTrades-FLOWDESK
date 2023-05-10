import { Trade } from "../models/trade";

export interface TradeHistoryAPI {
  getPublicTradeHistory(
    exchange: string,
    tradingPair: string
  ): Promise<Trade[]>;
}
