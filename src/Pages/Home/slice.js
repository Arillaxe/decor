import { createSlice } from '@reduxjs/toolkit';

const homeSlice = createSlice({
  name: 'home',
  initialState: { products: [] },
  reducers: {
    setProducts: (state, action) => ({ ...state, products: action.payload }),
  },
});

export default homeSlice;
