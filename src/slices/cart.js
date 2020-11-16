import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addItems: (state, action) => {
      const items = [...state, ...action.payload];

      localStorage.setItem('cart', JSON.stringify(items));

      return items;
    },
    setItems: (state, action) => {
      localStorage.setItem('cart', JSON.stringify(action.payload));

      return action.payload;
    },
  },
});

export default cartSlice;
