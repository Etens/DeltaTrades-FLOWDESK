import axios from 'axios';
import { Trade } from '../models/trade';
import { TradeHistoryAPI } from './tradeHistoryAPI';

const KUCOIN_API_BASE_URL = 'https://api.kucoin.com';

export class KucoinTradeHistoryAPI implements TradeHistoryAPI {
  async getPublicTradeHistory(tradingPair: string): Promise<Trade[]> {
    try {
      const response = await axios.get(
        `${KUCOIN_API_BASE_URL}/api/v1/market/histories?symbol=${tradingPair}`,
      );
      const trades = response.data.data.map((trade: any) => {
        return {
          sequence: trade.sequence,
          timestamp: trade.time,
          price: parseFloat(trade.price),
          size: parseFloat(trade.size),
          side: trade.side,
        };
      });
      return trades;
    } catch (error) {
      console.error(`Error fetching public trade history: ${error}`);
      throw error;
    }
  }
}
