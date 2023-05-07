export interface Trade {
    id: string;
    symbol: string;
    side: 'buy' | 'sell';
    price: number;
    quantity: number;
    timestamp: number;
  }
  