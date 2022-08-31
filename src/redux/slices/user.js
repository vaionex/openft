/* eslint-disable no-unused-vars */
import {
  firebaseLogin,
  firebaseLogout,
  firebaseRegister,
  firebaseUpdateProfile,
} from '@/firebase/utils'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  isPending: false,
  isUserPending: true,
  errorMessage: null,
  isAuthenticated: false,
  isSuccess: false,
}

export const login = createAsyncThunk(
  'auth/login',
  async (request, thunkAPI) => {
    try {
      const user = await firebaseLogin(request)
      if (user && !user?.error) return user
      else throw user?.error
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await firebaseLogout()
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message })
  }
})

export const register = createAsyncThunk(
  'user/signupUser',
  async (request, thunkAPI) => {
    try {
      const user = await firebaseRegister(request)
      if (user && !user?.error) return user
      else throw user?.error
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (request, thunkAPI) => {
    try {
      const user = await firebaseUpdateProfile(request)
      if (user && !user?.error) return user
      else throw user?.error
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload }
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload
    },
    setResetAuth: (state) => {
      state.currentUser = null
      state.isPending = false
      state.errorMessage = null
      state.isAuthenticated = false
    },
    setError: (state, action) => {
      state.errorMessage = action.payload
    },
    setSuccess: (state, action) => {
      state.isSuccess = action.payload
    },
    setPending: (state, action) => {
      state.isPending = action.payload
    },
    setUserPending: (state, action) => {
      state.isUserPending = action.payload
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.isPending = true
      state.errorMessage = null
    },
    [login.rejected]: (state, action) => {
      state.isPending = false
      state.isUserPending = false
      state.errorMessage = action.payload
    },
    [login.fulfilled]: (state, action) => {
      state.isPending = false
      state.isUserPending = false
      state.currentUser = action.payload
    },
    [register.pending]: (state) => {
      state.isPending = true
      state.errorMessage = null
    },
    [register.rejected]: (state, action) => {
      state.isPending = false
      state.isUserPending = false
      state.errorMessage = action.payload
    },
    [register.fulfilled]: (state, action) => {
      state.isPending = false
      state.isUserPending = false
      state.currentUser = action.payload
    },
    [logout.pending]: (state) => {
      state.isPending = true
      state.errorMessage = null
    },
    [logout.rejected]: (state, action) => {
      state.isPending = false
      state.isUserPending = false
      state.errorMessage = action.payload
    },
    [logout.fulfilled]: (state) => {
      state.isPending = false
      state.currentUser = null
      state.isUserPending = false
      state.errorMessage = null
      state.isAuthenticated = false
    },
    [updateUser.pending]: (state) => {
      state.isPending = true
      state.errorMessage = null
      state.isSuccess = false
    },
    [updateUser.rejected]: (state, action) => {
      state.isPending = false
      state.isUserPending = false
      state.errorMessage = action.payload
      state.isSuccess = false
    },
    [updateUser.fulfilled]: (state, action) => {
      state.isPending = false
      state.isUserPending = false
      state.currentUser = action.payload
      state.isSuccess = true
    },
  },
})

export default userSlice
export const {
  setUserData,
  setAuthenticated,
  setResetAuth,
  setError,
  setSuccess,
  setPending,
  setUserPending,
} = userSlice.actions