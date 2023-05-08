import { Trade } from '../models/trade';

export interface TradeHistoryAPI {
  getPublicTradeHistory(tradingPair: string): Promise<Trade[]>;
}
