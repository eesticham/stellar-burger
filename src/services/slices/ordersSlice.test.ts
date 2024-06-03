import { expect, describe } from '@jest/globals';
import { ordersReducer, getOrders, initialState } from './ordersSlice';

describe('getOrders tests', () => {
  //init
  const mockOrders = [
    {
      _id: '66265dd897ede0001d067240',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2024-04-22T12:53:44.491Z',
      updatedAt: '2024-04-22T12:53:45.116Z',
      number: 38633
    },
    {
      _id: '6626684097ede0001d067269',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный био-марсианский бургер',
      createdAt: '2024-04-22T13:38:08.720Z',
      updatedAt: '2024-04-22T13:38:09.308Z',
      number: 38637
    }
  ];

  it('getOrders fulfilled', () => {
    const action = {
      type: getOrders.fulfilled.type,
      payload: mockOrders
    };

    const expectedState = { ...initialState, orders: mockOrders };
    const newState = ordersReducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });
});
