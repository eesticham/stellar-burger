import { expect, describe } from '@jest/globals';
import {
  constructorReducer,
  initialState,
  addConstructorItem,
  removeConstructorItem,
  moveConstructorItem
} from './burgerConstructorSlice';

describe('Проверка работы редьюсера конструктора бургера', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  const sauceAddedIngredient = {
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    id: 'testId',
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
  };

  const mainIngredientToAdd = {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    id: 'testId',
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  };

  const bunIngredientToAdd = {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    id: 'testId',
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  };

  const testInitialState = {
    ...initialState,
    ingredients: [sauceAddedIngredient]
  };

  it('addConstructorItem - bun', () => {
    const newState = constructorReducer(
      testInitialState,
      addConstructorItem(bunIngredientToAdd)
    );
    expect(newState.bun).toMatchObject({
      ...bunIngredientToAdd,
      id: newState.bun?.id
    });
  });

  it('addConstructorItem - main', () => {
    const newState = constructorReducer(
      testInitialState,
      addConstructorItem(mainIngredientToAdd)
    );

    // addConstructorItem insert a uuid generated id, so we need to use it to get Equal Match.
    // to be more precise we can replace index {1} by {array.length - 1} as "last added item".
    const expected = [
      ...testInitialState.ingredients,
      { ...mainIngredientToAdd, id: newState.ingredients[1].id }
    ];

    expect(newState.ingredients).toEqual(expected);
  });

  it('removeConstructorItem', () => {
    const newState = constructorReducer(
      testInitialState,
      removeConstructorItem(sauceAddedIngredient.id)
    );
    expect(newState).toEqual(initialState);
  });

  it('moveConstructorItem - up', () => {
    const filledState = {
      ...initialState,
      ingredients: [sauceAddedIngredient, mainIngredientToAdd]
    };

    // index 0 - sauce, index 1 - main. So after moving "up" main should get index 0.
    const newState = constructorReducer(
      filledState,
      moveConstructorItem({ index: 1, move: 'up' })
    );

    console.log(filledState);
    console.log(newState);

    expect(newState.ingredients[0]).toEqual(mainIngredientToAdd);
  });

  it('moveConstructorItem - down', () => {
    const filledState = {
      ...initialState,
      ingredients: [sauceAddedIngredient, mainIngredientToAdd]
    };

    // index 0 - sauce, index 1 - main. So after moving "down" sauce should get index 1.
    const newState = constructorReducer(
      filledState,
      moveConstructorItem({ index: 0, move: 'down' })
    );

    console.log(filledState);
    console.log(newState);

    expect(newState.ingredients[1]).toEqual(sauceAddedIngredient);
  });
});
