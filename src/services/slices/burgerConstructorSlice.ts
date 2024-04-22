import { createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '../../utils/types';
import { getIngredients } from './ingredientsSlice';

type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

type IngredientsQuantity = {
  [key: string]: number;
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addConstructorItem: (state, action) => {
      const type = action.payload.type;

      if (type === 'bun') {
        state.bun = action.payload;
      } else if (type === 'main' || type === 'sauce') {
        state.ingredients.push(action.payload);
      }
    },
    removeConstructorItem: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (el) => el.id !== action.payload
      );
    },
    moveConstructorItem: (state, action) => {
      const index = action.payload.index;
      const move = action.payload.move;

      if (move === 'up') {
        [state.ingredients[index], state.ingredients[index - 1]] = [
          state.ingredients[index - 1],
          state.ingredients[index]
        ];
      } else if (move === 'down') {
        [state.ingredients[index], state.ingredients[index + 1]] = [
          state.ingredients[index + 1],
          state.ingredients[index]
        ];
      }
    },
    clearConstructor: (state) => (state = initialState)
  },
  selectors: {
    getConstructorSelector: (state) => {
      state;
    },
    getIngredientsQuantitySelector: (state) => {
      const quantities: IngredientsQuantity = {};
      if (state.bun) {
        quantities[state.bun._id] = (quantities[state.bun._id] || 0) + 2;
      }

      state.ingredients.forEach((el) => {
        quantities[el._id] = (quantities[el._id] || 0) + 1;
      });

      return quantities;
    }
  }
});

export const constructorReducer = burgerConstructorSlice.reducer;
export const { getConstructorSelector, getIngredientsQuantitySelector } =
  burgerConstructorSlice.selectors;
export const {
  addConstructorItem,
  removeConstructorItem,
  moveConstructorItem,
  clearConstructor
} = burgerConstructorSlice.actions;
