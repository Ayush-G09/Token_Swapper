import { Token } from "./state";

export const TOGGLE_MODE = "TOGGLE_MODE";

export type ToggleModeAction = {
  type: typeof TOGGLE_MODE;
};

export const ADD_TOKEN = "ADD_TOKEN";
export const SET_LOADING = "SET_LOADING";

export type AddTokenAction = {
  type: typeof ADD_TOKEN;
  payload: Token;
};

export type SetLoadingAction = {
  type: typeof SET_LOADING;
  payload: boolean;
};

export type TokenActions = AddTokenAction | SetLoadingAction;

export const SET_LOADING_ORDER_BOOK = "SET_LOADING_ORDER_BOOK";

export type SetLoadingOrderBookAction = {
  type: typeof SET_LOADING_ORDER_BOOK;
  payload: boolean;
};

export type LoadingActions = SetLoadingOrderBookAction;

export const UPDATE_METRICS = "UPDATE_METRICS";

export type UpdateMetricsAction = {
  type: typeof UPDATE_METRICS;
  payload: {
    slippage: number;
    priceImpact: number;
    fees: number;
  };
};

export type MetricsActions = UpdateMetricsAction;

export const SET_AMOUNT = "SET_AMOUNT";

export type SetAmountAction = {
  type: typeof SET_AMOUNT;
  payload: {
    id: string; // Unique identifier for the ExchangeCard
    amount: number | string;
  };
};

export type ExchangeCardActions = SetAmountAction;

export const SET_WALLET_ADDRESS = "SET_WALLET_ADDRESS";
export const SET_BALANCE = "SET_BALANCE";

export type WalletAction =
  | { type: typeof SET_WALLET_ADDRESS; payload: string | null }
  | { type: typeof SET_BALANCE; payload: string | null };

export const setWalletAddress = (address: string | null) => ({
  type: SET_WALLET_ADDRESS,
  payload: address,
});

export const setBalance = (balance: string | null) => ({
  type: SET_BALANCE,
  payload: balance,
});
