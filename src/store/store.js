import { compose, legacy_createStore as createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from "redux-logger";
import thunk from "redux-thunk";

import { rootReducer } from "./root-reducer";

/* logger replacement
const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log('type: ', action.type);
  console.log('payload: ', action.payload);
  console.log('currentState: ', store.getState());

  next(action);

  console.log('next state: ',  store.getState());
};

const middleWares = [loggerMiddleware];

*/

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'], // Only persist these
  // blacklist: ['user'], // What you don't want to persist (from reducers)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV !== 'production' && logger, thunk].filter(Boolean);

const composedEnhancers = compose(applyMiddleware(...middleWares));

// export const store = createStore(rootReducer, undefined, composedEnhancers);
// export const store = createStore(rootReducer)
export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);
