import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import {
  cartSlice, 
  categoriesSlice,
  homeGridsSlice,
  productsSlice,
} from '../slices';

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    categories: categoriesSlice.reducer,
    homeGrids: homeGridsSlice.reducer,
    products: productsSlice.reducer,
  },
  middleware: [...getDefaultMiddleware(), logger],
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
