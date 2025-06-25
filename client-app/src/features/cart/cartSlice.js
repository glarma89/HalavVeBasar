import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  productsByCategory: {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const { category, product } = action.payload;
      if (!state.productsByCategory[category]) {
        state.productsByCategory[category] = [];
      }
      state.productsByCategory[category].push(product);
    },
  },
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;