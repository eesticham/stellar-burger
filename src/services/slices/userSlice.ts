import { deleteCookie, setCookie, getCookie } from '../../utils/cookie';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginUserApi,
  updateUserApi,
  logoutApi,
  getUserApi
} from '../../utils/burger-api';
import { TUser } from '@utils-types';

export const register = createAsyncThunk('user/register', registerUserApi);
export const login = createAsyncThunk('user/login', loginUserApi);
export const logout = createAsyncThunk('user/logout', logoutApi);
export const updateUser = createAsyncThunk('user/update', updateUserApi);
export const getUser = createAsyncThunk('user/request', getUserApi);

export const checkUserAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(getUser());
    }
  }
);

type TUserState = {
  isAuthChecked: boolean;
  user: TUser;
  error: string | null;
};

export const initialState: TUserState = {
  isAuthChecked: false,
  user: {
    email: '',
    name: ''
  },
  error: null
};

const UserSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {},
  selectors: {
    getUserState: (state) => {
      return state;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {})
      .addCase(register.rejected, (state, action) => {
        state.error = action.error.message!;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
      });
    builder
      .addCase(login.pending, (state) => {
        state.isAuthChecked = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message!;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.error = null;
        state.user = action.payload.user;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
      });
    builder
      .addCase(logout.pending, (state) => {})
      .addCase(logout.rejected, (state, action) => {})
      .addCase(logout.fulfilled, (state) => {
        state = initialState;
        localStorage.removeItem('refreshToken');
        deleteCookie('accessToken');
      });
    builder
      .addCase(getUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message!;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.error = null;
        state.user = action.payload.user;
      });
    builder
      .addCase(updateUser.pending, (state) => {
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message!;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.error = null;
        state.user = action.payload.user;
      });
  }
});

export const userReducer = UserSlice.reducer;
export const { getUserState } = UserSlice.selectors;
