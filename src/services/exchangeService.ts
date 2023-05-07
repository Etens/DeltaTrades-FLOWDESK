import axios from 'axios';
import { Trade } from '../models/trade';

const KUCOIN_API_BASE_URL = 'https://api.kucoin.com';

export async function getPublicTradeHistory(
  tradingPair: string,
): Promise<Trade[]> {
  try {
    const response = await axios.get(
      `${KUCOIN_API_BASE_URL}/api/v1/market/histories?symbol=${tradingPair}`,
    );
    const trades = response.data.data.map((trade: any) => {
      return {
        price: parseFloat(trade.price),
        amount: parseFloat(trade.size),
        timestamp: trade.time,
      };
    });
    return trades;
  } catch (error) {
    console.error(`Error fetching public trade history: ${error}`);
    throw error;
  }
}