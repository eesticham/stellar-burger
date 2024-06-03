import { expect, describe } from '@jest/globals';
import { feedsReducer, initialState, getFeeds } from './feedsSlice';

describe('Проверка работы редьюсера ленты', () => {
  // init
  const mockFeedsOrders = {
    success: true,
    orders: [
      {
        _id: '66424b8a97ede0001d06a6e2',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093f',
          '643d69a5c3f7b9001cfa0946',
          '643d69a5c3f7b9001cfa0940',
          '643d69a5c3f7b9001cfa093c'
        ],
        status: 'done',
        name: 'Краторный бессмертный минеральный био-марсианский метеоритный бургер',
        createdAt: '2024-05-13T17:19:06.116Z',
        updatedAt: '2024-05-13T17:19:06.671Z',
        number: 39988
      },
      {
        _id: '66424b6897ede0001d06a6e1',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa0948',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa0942',
          '643d69a5c3f7b9001cfa0949',
          '643d69a5c3f7b9001cfa094a',
          '643d69a5c3f7b9001cfa0944',
          '643d69a5c3f7b9001cfa0945',
          '643d69a5c3f7b9001cfa093f',
          '643d69a5c3f7b9001cfa0943',
          '643d69a5c3f7b9001cfa0942',
          '643d69a5c3f7b9001cfa093c'
        ],
        status: 'done',
        name: 'Антарианский space астероидный краторный бессмертный био-марсианский альфа-сахаридный экзо-плантаго традиционный-галактический spicy люминесцентный бургер',
        createdAt: '2024-05-13T17:18:32.032Z',
        updatedAt: '2024-05-13T17:18:32.512Z',
        number: 39987
      }
    ],
    total: 39614,
    totalToday: 156
  };

  it('getFeeds - fulfilled', () => {
    const action = {
      type: getFeeds.fulfilled.type,
      payload: mockFeedsOrders
    };
    const expectedState = {
      ...initialState,
      orders: mockFeedsOrders.orders,
      total: mockFeedsOrders.total,
      totalToday: mockFeedsOrders.totalToday
    };
    const newState = feedsReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('getFeeds - rejected', () => {
    const action = {
      type: getFeeds.rejected.type
    };
    const expectedState = {
      ...initialState,
      orders: [],
      total: 0,
      totalToday: 0
    };
    const newState = feedsReducer(initialState, action);

    expect(newState).toEqual(expectedState);
  });
});
