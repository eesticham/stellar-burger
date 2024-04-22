import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { orderBurgerApi } from '../../utils/burger-api';

export const newBurgerOrder = createAsyncThunk(
  'order/new',
  async (data: string[]) => {
    const response = await orderBurgerApi(data);
    return response;
  }
);

type TNewOrderState = {
  order: TOrder | null;
  name: string;
  orderRequest: boolean;
};

export const initialState: TNewOrderState = {
  order: null,
  name: '',
  orderRequest: false
};

const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    clearOrder: (state) => (state = initialState)
  },
  selectors: {
    getNewOrderState: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(newBurgerOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(newBurgerOrder.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(newBurgerOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.order = action.payload.order;
        state.name = action.payload.name;
      });
  }
});

export const newOrderReducer = newOrderSlice.reducer;
export const { clearOrder } = newOrderSlice.actions;
export const { getNewOrderState } = newOrderSlice.selectors;
