/* eslint-disable no-unused-vars */
import {
  firebaseLogin,
  firebaseLogout,
  firebaseRegister,
} from '@/firebase/utils'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  isPending: false,
  errorMessage: null,
  isAuthenticated: null,
  accessToken: null,
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

// export const updateUser = createAsyncThunk(
//   'user/signupUser',
//   async (request, thunkAPI) => {
//     try {
//       const user = await firebaseRegister(request)
//       if (user && !user?.error) return user
//       else throw user?.error
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error)
//     }
//   },
// )

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
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.isPending = true
      state.errorMessage = null
    },
    [login.rejected]: (state, action) => {
      state.isPending = false
      state.errorMessage = action.payload
    },
    [login.fulfilled]: (state, action) => {
      state.isPending = false
      state.currentUser = action.payload
    },
    [register.pending]: (state) => {
      state.isPending = true
      state.errorMessage = null
    },
    [register.rejected]: (state, action) => {
      state.isPending = false
      state.errorMessage = action.payload
    },
    [register.fulfilled]: (state, action) => {
      state.isPending = false
      state.currentUser = action.payload
    },
    [logout.pending]: (state) => {
      state.isPending = true
      state.errorMessage = null
    },
    [logout.rejected]: (state, action) => {
      state.isPending = false
      state.errorMessage = action.payload
    },
    [logout.fulfilled]: (state) => {
      state.isPending = false
      state.currentUser = null
      state.isPending = false
      state.errorMessage = null
      state.isAuthenticated = false
    },
  },
})

export default userSlice
export const { setUserData, setAuthenticated, setResetAuth } = userSlice.actions
