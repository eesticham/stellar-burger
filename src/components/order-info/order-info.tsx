import { FC, useMemo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { useSelector } from '../../services/store';
import { getOrderByNumberApi } from '@api';

const initialOrder: TOrder = {
  _id: '',
  status: '',
  name: '',
  createdAt: '',
  updatedAt: '',
  number: 0,
  ingredients: ['']
};

export const OrderInfo: FC = () => {
  const [orderData, setOrderData] = useState<TOrder>(initialOrder);

  const ingredients: TIngredient[] = useSelector(
    (state) => state.ingredients.ingredients
  );
  const id = useParams().number;

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find(
            (element) => element._id === item
          );
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  useEffect(() => {
    getOrderByNumberApi(Number(id)).then((data) => {
      setOrderData(data.orders[0]);
    });
  }, []);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
