export type ModeState = {
  mode: "light" | "dark";
};

export const initialState: ModeState = {
  mode: "light",
};

export type Token = {
  id: string;
  name: string;
  symbol: string;
  price: number;
  exchange: string;
};

export type TokenState = {
  tokens: Token[];
  loading: boolean;
};

export const initialTokenState: TokenState = {
  tokens: [
    {
      id: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
      price: 0,
      exchange: "ethusdt",
    },
    {
      id: "binancecoin",
      name: "Binance",
      symbol: "BNB",
      price: 0,
      exchange: "bnbusdt",
    },
    {
      id: "usd-coin",
      name: "USD Coin",
      symbol: "USDC",
      price: 0,
      exchange: "usdcusdt",
    },
    {
      id: "solana",
      name: "Solana",
      symbol: "SOL",
      price: 0,
      exchange: "solusdt",
    },
  ],
  loading: false,
};

export type ExchangeCardState = {
  amounts: Record<string, number | string>;
};

export const initialExchangeCardState: ExchangeCardState = {
  amounts: {},
};
