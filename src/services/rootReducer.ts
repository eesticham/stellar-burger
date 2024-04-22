import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from './slices/ingredientsSlice';
import { constructorReducer } from './slices/burgerConstructorSlice';
import { userReducer } from './slices/userSlice';
import { newOrderReducer } from './slices/newOrderSlice';
import { ordersReducer } from './slices/ordersSlice';
import { feedsReducer } from './slices/feedsSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  userData: userReducer,
  newOrder: newOrderReducer,
  orders: ordersReducer,
  feeds: feedsReducer
});
