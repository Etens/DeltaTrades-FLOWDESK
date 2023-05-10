export interface Trade {
  sequence: number;
  time: number;
  price: number;
  size: number;
  side: "buy" | "sell";
}
