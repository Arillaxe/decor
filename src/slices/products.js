import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    addProducts: (state, action) => [...state, ...action.payload.filter(({ _id: productId }) => !state.map(({ _id }) => _id).includes(productId))],
  },
});

export default productsSlice;
