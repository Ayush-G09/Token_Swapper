import {
  ADD_TOKEN,
  AddTokenAction,
  SET_AMOUNT,
  SET_LOADING,
  SET_LOADING_ORDER_BOOK,
  SetAmountAction,
  SetLoadingAction,
  SetLoadingOrderBookAction,
  TOGGLE_MODE,
  ToggleModeAction,
  UPDATE_METRICS,
  UpdateMetricsAction,
} from "./actionTypes";
import { Token } from "./state";

export const toggleMode = (): ToggleModeAction => ({
  type: TOGGLE_MODE,
});

export const addToken = (token: Token): AddTokenAction => ({
  type: ADD_TOKEN,
  payload: token,
});

export const setLoading = (isLoading: boolean): SetLoadingAction => ({
  type: SET_LOADING,
  payload: isLoading,
});

export const setLoadingOrderBook = (
  isLoading: boolean
): SetLoadingOrderBookAction => ({
  type: SET_LOADING_ORDER_BOOK,
  payload: isLoading,
});

export const updateMetrics = (metrics: {
  slippage: number;
  priceImpact: number;
  fees: number;
}): UpdateMetricsAction => ({
  type: UPDATE_METRICS,
  payload: metrics,
});

export const setAmount = (
  id: string,
  amount: number | string
): SetAmountAction => ({
  type: SET_AMOUNT,
  payload: { id, amount },
});
