import { createSlice } from '@reduxjs/toolkit';

const homeGridsSlice = createSlice({
  name: 'homeGrids',
  initialState: [],
  reducers: {
    setHomeGrids: (state, action) => action.payload,
  },
});

export default homeGridsSlice;
