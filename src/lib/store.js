import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import { slice as homeSlice } from '../Pages/Home';
import { slice as cartSlice } from '../Pages/Cart';

const store = configureStore({
  reducer: {
    home: homeSlice.reducer,
    cart: cartSlice.reducer,
  },
  middleware: [...getDefaultMiddleware(), logger],
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
