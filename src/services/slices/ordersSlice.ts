import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi } from '../../utils/burger-api';

export const getOrders = createAsyncThunk('orders/userOrders', getOrdersApi);

type TOrders = {
  orders: TOrder[];
};

export const initialState: TOrders = {
  orders: []
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    getOrdersState: (state) => {
      return state;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {})
      .addCase(getOrders.rejected, (state, action) => {
        // is it ok to add a console.log about error?
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      });
  }
});

export const ordersReducer = ordersSlice.reducer;
export const { getOrdersState } = ordersSlice.selectors;
