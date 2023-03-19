// import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import thunk from "redux-thunk";
import authentication from "./reducers/authentication";
import positions from "./reducers/positions";
import ui from "./reducers/ui";
import currentPosition from "./reducers/current-position";
import currentUser from "./reducers/current-user";
import watchedStocks from './reducers/watched-stocks';
import ledger from './reducers/ledger';
import trades from './reducers/trades';
import currentWatchedStock from './reducers/current-watched-stock'
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
import storage from 'redux-persist/lib/storage';
import Trading from './TradingReducer';
import { combineReducers } from 'redux';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

const persistConfig = {
  key: 'counter',
  storage,
};


const reducers = combineReducers({ authentication,
  positions,
  ui,
  currentPosition,
  currentUser,
  watchedStocks,
  currentWatchedStock,
  ledger,
  Trading,
  trades });
  const persistedReducer = persistReducer(persistConfig, reducers);
// const reducer = combineReducers({
//   authentication,
//   positions,
//   ui,
//   currentPosition,
//   currentUser,
//   watchedStocks,
//   currentWatchedStock,
//   ledger,
//   trades
// });



// export const store = configureStore({
//   reducer: {
//     authentication,
//     positions,
//     ui,
//     currentPosition,
//     currentUser,
//     watchedStocks,
//     currentWatchedStock,
//     ledger,
//     trades
//   },
// });

// const configureStore = (initialState) => {
//   return createStore(
//     reducer,
//     initialState,
//     composeEnhancers(applyMiddleware(thunk))
//   );
// };

// export default store;
export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
          serializableCheck: {
              ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
      }),
});
