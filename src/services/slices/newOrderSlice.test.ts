import { expect, describe } from '@jest/globals';
import { newOrderReducer, initialState, newBurgerOrder } from './newOrderSlice';

describe('new order slice tests', () => {
  // init
  const mockOrder = {
    success: true,
    name: 'Флюоресцентный люминесцентный бургер',
    order: {
      ingredients: [
        {
          _id: '643d69a5c3f7b9001cfa093d',
          name: 'Флюоресцентная булка R2-D3',
          type: 'bun',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa093e',
          name: 'Филе Люминесцентного тетраодонтимформа',
          type: 'main',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/meat-03.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-03-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa093d',
          name: 'Флюоресцентная булка R2-D3',
          type: 'bun',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
          __v: 0
        }
      ],
      _id: '6642733097ede0001d06a71d',
      owner: {
        name: 'Max Power',
        email: 'eestichameleon@yandex.ru',
        createdAt: '2024-04-22T10:54:12.082Z',
        updatedAt: '2024-04-22T17:08:19.064Z'
      },
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2024-05-13T20:08:16.157Z',
      updatedAt: '2024-05-13T20:08:16.809Z',
      number: 39990,
      price: 2964
    }
  };

  it('newBurgerOrder pending', () => {
    const action = {
      type: newBurgerOrder.pending.type
    };

    const expectedState = { ...initialState, orderRequest: true };
    const newState = newOrderReducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  it('newBurgerOrder fulfilled', () => {
    const action = {
      type: newBurgerOrder.fulfilled.type,
      payload: mockOrder
    };

    const expectedState = {
      ...initialState,
      orderRequest: false,
      order: mockOrder.order,
      name: mockOrder.name
    };
    const newState = newOrderReducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  it('newBurgerOrder rejected', () => {
    const action = {
      type: newBurgerOrder.rejected.type
    };

    const expectedState = { ...initialState, orderRequest: false };
    const newState = newOrderReducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });
});
