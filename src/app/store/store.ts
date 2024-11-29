import { createStore, combineReducers } from "redux";
import {
  exchangeCardReducer,
  loadingReducer,
  metricsReducer,
  modeReducer,
  tokenReducer,
  walletReducer,
} from "./reducer";

const rootReducer = combineReducers({
  mode: modeReducer,
  wallet: walletReducer,
  token: tokenReducer,
  loading: loadingReducer,
  metrics: metricsReducer,
  exchangeCard: exchangeCardReducer,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
