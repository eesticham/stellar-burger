import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch } from '../../services/store';
import {
  addConstructorItem,
  getIngredientsQuantitySelector
} from '../../services/slices/burgerConstructorSlice';
import { useSelector } from 'react-redux';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const handleAdd = () => {
      dispatch(addConstructorItem({ ...ingredient, id: uuidv4() }));
    };

    const q = useSelector(getIngredientsQuantitySelector);
    console.log('BurgerIngredient quantity selector ->', q);
    const count = q[ingredient._id];
    console.log('count ->', count);

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
