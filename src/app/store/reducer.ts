import {
  SET_BALANCE,
  SET_WALLET_ADDRESS,
  TOGGLE_MODE,
  ToggleModeAction,
  WalletAction,
} from "./actionTypes";
import { ModeState, initialState } from "./state";

type ModeAction = ToggleModeAction;

export const modeReducer = (
  state: ModeState = initialState,
  action: ModeAction
): ModeState => {
  switch (action.type) {
    case TOGGLE_MODE:
      return {
        ...state,
        mode: state.mode === "light" ? "dark" : "light",
      };
    default:
      return state;
  }
};

import { SET_AMOUNT, ExchangeCardActions } from "./actionTypes";
import { ExchangeCardState, initialExchangeCardState } from "./state";

export const exchangeCardReducer = (
  state: ExchangeCardState = initialExchangeCardState,
  action: ExchangeCardActions
): ExchangeCardState => {
  switch (action.type) {
    case SET_AMOUNT:
      return {
        ...state,
        amounts: {
          ...state.amounts,
          [action.payload.id]: action.payload.amount,
        },
      };
    default:
      return state;
  }
};

import { SET_LOADING_ORDER_BOOK, LoadingActions } from "./actionTypes";

export type LoadingState = {
  orderBookLoading: boolean;
};

const initialLoadingState: LoadingState = {
  orderBookLoading: false,
};

export const loadingReducer = (
  state = initialLoadingState,
  action: LoadingActions
): LoadingState => {
  switch (action.type) {
    case SET_LOADING_ORDER_BOOK:
      return {
        ...state,
        orderBookLoading: action.payload,
      };
    default:
      return state;
  }
};

// metricsReducer.ts
import { UPDATE_METRICS, MetricsActions } from "./actionTypes";

export type MetricsState = {
  slippage: number;
  priceImpact: number;
  fees: number;
};

const initialMetricsState: MetricsState = {
  slippage: 0,
  priceImpact: 0,
  fees: 0,
};

export const metricsReducer = (
  state = initialMetricsState,
  action: MetricsActions
): MetricsState => {
  switch (action.type) {
    case UPDATE_METRICS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

import { ADD_TOKEN, SET_LOADING, TokenActions } from "./actionTypes";
import { TokenState, initialTokenState } from "./state";

export const tokenReducer = (
  state: TokenState = initialTokenState,
  action: TokenActions
): TokenState => {
  switch (action.type) {
    case ADD_TOKEN:
      return { ...state, tokens: [...state.tokens, action.payload] };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export type WalletState = {
  walletAddress: string | null;
  balance: string | null;
};

const initialWalletState: WalletState = {
  walletAddress: null,
  balance: null,
};

export const walletReducer = (
  state = initialWalletState,
  action: WalletAction
): WalletState => {
  switch (action.type) {
    case SET_WALLET_ADDRESS:
      return { ...state, walletAddress: action.payload };
    case SET_BALANCE:
      return { ...state, balance: action.payload };
    default:
      return state;
  }
};
