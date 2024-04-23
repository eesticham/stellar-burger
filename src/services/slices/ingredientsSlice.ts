import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '../../utils/types';
import { getIngredientsApi } from '../../utils/burger-api';

export const getIngredients = createAsyncThunk(
  'ingredients/getAll',
  getIngredientsApi
);

type TIngredientsState = {
  ingredients: TIngredient[];
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  loading: boolean;
  error: string | null;
};

export const initialState: TIngredientsState = {
  ingredients: [],
  buns: [],
  mains: [],
  sauces: [],
  loading: true,
  error: null
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsSelector: (state) => {
      return state;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        if (action.error.message) {
          state.error = action.error.message;
        } else {
          state.error = null;
        }
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        const ingredients = action.payload;
        state.loading = false;
        state.ingredients = ingredients;
        if (ingredients) {
          state.buns = ingredients.filter(
            (ingredient) => ingredient.type === 'bun'
          );
          state.mains = ingredients.filter(
            (ingredient) => ingredient.type === 'main'
          );
          state.sauces = ingredients.filter(
            (ingredient) => ingredient.type === 'sauce'
          );
        }
      });
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;
export const { getIngredientsSelector } = ingredientsSlice.selectors;
