import { deleteCookie, setCookie, getCookie } from '../../utils/cookie';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
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

// export const checkUserAuth = createAsyncThunk(
//   'user/checkAuth',
//   async (_, { dispatch }) => {
//     if (getCookie('accessToken')) {
//       dispatch(getUser());
//     }
//   }
// );

export const checkUserAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, { dispatch }): Promise<void> => {
    if (getCookie('accessToken')) {
      getUserApi()
        .then((res) => dispatch(setUser(res.user)))
        .catch((): void => {
          localStorage.removeItem('refreshToken');
          deleteCookie('accessToken');
        })
        .finally(() => dispatch(authCheck()));
    } else {
      dispatch(authCheck());
    }
  }
);

type TUserState = {
  isAuthChecked: boolean;
  user: TUser | null;
  error: string | null;
};

export const initialState: TUserState = {
  isAuthChecked: false,
  user: null,
  error: null
};

const UserSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    },
    authCheck: state => {
      state.isAuthChecked = true;
    }
  },
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
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message!;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
      });
    builder
      .addCase(logout.pending, (state) => {})
      .addCase(logout.rejected, (state, action) => {})
      .addCase(logout.fulfilled, (state) => {
        Object.assign(state, initialState);
        localStorage.removeItem('refreshToken');
        deleteCookie('accessToken');
      });
    builder
      .addCase(getUser.pending, (state, action) => {
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.error = action.error.message!;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
      });
    builder
      .addCase(updateUser.pending, (state) => {
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message!;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.error = null;
        state.user = action.payload.user;
      });
  }
});

export const userReducer  = UserSlice.reducer;
export const { setUser, authCheck } = UserSlice.actions;
export const { getUserState } = UserSlice.selectors;
