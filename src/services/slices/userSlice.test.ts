import { expect, describe } from '@jest/globals';
import {
  userReducer,
  initialState,
  register,
  login,
  logout,
  updateUser,
  getUser
} from './userSlice';

describe('user slice tests', () => {
  const mockUser = {
    email: 'mail',
    name: 'name'
  };

  describe('register tests', () => {
    //init
    const mockRegister = {
      email: 'mail',
      name: 'name',
      password: 'pass'
    };

    it('register fulfilled', () => {
      const action = {
        type: register.fulfilled.type,
        payload: { user: mockRegister }
      };

      const expectedState = {
        ...initialState,
        isAuthChecked: true,
        user: mockRegister
      };
      const newState = userReducer(initialState, action);

      expect(newState).toEqual(expectedState);
    });

    it('register rejected', () => {
      const errorMessage = 'Registration failed';
      const action = {
        type: register.rejected.type,
        error: { message: errorMessage }
      };

      const expectedState = {
        ...initialState,
        isAuthChecked: false,
        error: errorMessage
      };
      const newState = userReducer(initialState, action);

      expect(newState).toEqual(expectedState);
    });
  });

  describe('login tests', () => {
    afterAll(() => {
      // unfortunately unaccessable
      // deleteCookie("access");
      // localStorage.clear();
    });

    //init
    const mockLogin = {
      email: 'mail',
      password: 'pass'
    };

    it('login fulfilled', () => {
      const action = {
        type: login.fulfilled.type,
        payload: { user: mockLogin }
      };

      const expectedState = {
        ...initialState,
        isAuthChecked: true,
        user: mockLogin
      };
      const newState = userReducer(initialState, action);

      expect(newState).toEqual(expectedState);
    });

    it('login rejected', () => {
      const errorMessage = 'Login failed';
      const action = {
        type: login.rejected.type,
        error: { message: errorMessage }
      };

      const expectedState = {
        ...initialState,
        isAuthChecked: false,
        error: errorMessage
      };
      const newState = userReducer(initialState, action);

      expect(newState).toEqual(expectedState);
    });
  });

  describe('logout tests', () => {
    it('logout fulfilled', () => {
      const action = {
        type: logout.fulfilled.type
      };

      const expectedState = { ...initialState };
      const newState = userReducer(initialState, action);

      expect(newState).toEqual(expectedState);
    });
  });

  describe('getUser tests', () => {
    it('getUser fulfilled', () => {
      const action = {
        type: getUser.fulfilled.type,
        payload: { user: mockUser }
      };

      const expectedState = {
        ...initialState,
        isAuthChecked: true,
        user: mockUser
      };
      const newState = userReducer(initialState, action);

      expect(newState).toEqual(expectedState);
    });

    it('getUser rejected', () => {
      const errorMessage = 'failed';
      const action = {
        type: getUser.rejected.type,
        error: { message: errorMessage }
      };

      const expectedState = {
        ...initialState,
        isAuthChecked: true,
        error: errorMessage
      };
      const newState = userReducer(initialState, action);

      expect(newState).toEqual(expectedState);
    });
  });

  describe('updateUser tests', () => {
    it('updateUser fulfilled', () => {
      const action = {
        type: updateUser.fulfilled.type,
        payload: { user: mockUser }
      };

      const expectedState = {
        ...initialState,
        isAuthChecked: true,
        error: null,
        user: mockUser
      };
      const newState = userReducer(initialState, action);

      expect(newState).toEqual(expectedState);
    });

    it('updateUser rejected', () => {
      const errorMessage = 'failed';
      const action = {
        type: updateUser.rejected.type,
        error: { message: errorMessage }
      };

      const expectedState = {
        ...initialState,
        isAuthChecked: false,
        error: errorMessage
      };
      const newState = userReducer(initialState, action);

      expect(newState).toEqual(expectedState);
    });
  });
});
