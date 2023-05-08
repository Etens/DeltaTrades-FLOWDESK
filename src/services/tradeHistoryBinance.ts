import axios from 'axios';
import { Trade } from '../models/trade';
import { TradeHistoryAPI } from './tradeHistoryAPI';

const BINANCE_API_BASE_URL = 'https://api.binance.com';

export class BinanceTradeHistoryAPI implements TradeHistoryAPI {
  async getPublicTradeHistory(tradingPair: string): Promise<Trade[]> {
    try {
      const response = await axios.get(
        `${BINANCE_API_BASE_URL}/api/v3/trades?symbol=${tradingPair}`,
      );
      const trades = response.data.map((trade: any) => {
        return {
          sequence: trade.id,
          timestamp: trade.time,
          price: parseFloat(trade.price),
          size: parseFloat(trade.qty),
          side: trade.isBuyerMaker ? 'sell' : 'buy',
        };
      });
      return trades;
    } catch (error) {
      console.error(`Error fetching public trade history: ${error}`);
      throw error;
    }
  }
}
