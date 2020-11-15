import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addItem: (state, action) => ({ ...state, items: [...state.items, action.payload] }),
  },
});

export default cartSlice;
