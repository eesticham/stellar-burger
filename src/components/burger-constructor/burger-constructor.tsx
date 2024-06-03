import { FC, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  newBurgerOrder,
  clearOrder
} from '../../services/slices/newOrderSlice';
import { clearConstructor } from '../../services/slices/burgerConstructorSlice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userIsAuth = useSelector((state) => state.userData.isAuthChecked);
  const constructorItems = useSelector((state) => state.burgerConstructor);
  const { orderRequest, order } = useSelector((state) => state.newOrder);

  const price = useMemo(() => {
    return (
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (sum: number, ingredient: TConstructorIngredient) =>
          sum + ingredient.price,
        0
      )
    );
  }, [constructorItems]);

  const onOrderClick = useCallback(() => {
    if (!userIsAuth) {
      navigate('/login');
    }

    if (constructorItems.bun && constructorItems.ingredients.length > 0) {
      const dataToOrder = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((ingredient) => ingredient._id),
        constructorItems.bun._id
      ];
      dispatch(newBurgerOrder(dataToOrder));
    }
  }, [userIsAuth, constructorItems, dispatch, navigate]);

  const closeOrderModal = () => {
    console.log('Closing order modal');
    dispatch(clearOrder());
    dispatch(clearConstructor());
    navigate('/');
  };

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={order}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
