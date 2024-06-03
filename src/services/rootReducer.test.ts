import { expect, describe } from '@jest/globals';
import { rootReducer } from './rootReducer';
import store from './store';

describe('Тесты rootReducer', () => {
  it('Проверка правильной настройки и работы rootReduce', () => {
    const newState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(store.getState()).toEqual(newState);
  });
});
