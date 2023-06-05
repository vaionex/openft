/* eslint-disable no-unused-vars */
import {
  firebaseLogin,
  firebaseLoginMfa,
  firebaseLoginWithGoogle,
  firebaseLogout,
  firebaseRegister,
  firebaseUpdateProfile,
} from '@/firebase/utils'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  notificationObj: {
    'app-notification': {
      itemSold: false,
      purchases: false,
      priceChanges: false,
      itemUpdates: false,
    },
    'email-notification': {
      itemSoldEmail: false,
      purchasesEmail: false,
      priceChangesEmail: false,
      itemUpdatesEmail: false,
    },
  },
  isPending: false,
  isUserPending: true,
  errorMessage: null,
  isError: false,
  isAuthenticated: false,
  isSuccess: false,
  mnemonicPopup: false,
  dilist: false,
  isGoogle:false
}

export const login = createAsyncThunk(
  'auth/login',
  async (request, thunkAPI) => {
    try {
      const user = await firebaseLoginMfa(request).then(
        (userCredential) => userCredential,
      )
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
    console.log(request)
    try {
      const user = await firebaseRegister(request)
      if (user && !user?.error) {
        return user
      } else throw user?.error
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)

export const loginWithGoogle = createAsyncThunk(
  'auth/loginWithGoogle',
  async (request, thunkAPI) => {
    try {
      const user = await firebaseLoginWithGoogle(request)
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
      console.log(state, action, "state, action")
      state.currentUser = { ...state.currentUser, ...action.payload }
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload
    },
    setResetAuth: (state) => {
      state.currentUser = null
      state.isPending = false
      state.errorMessage = null
      state.isError = false
      state.isAuthenticated = false
    },
    setError: (state, action) => {
      state.errorMessage = action.payload
      state.isError = true
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
    setNotifications: (state, action) => {
      state.notificationObj = action.payload
    },
    setMnemonicPopup: (state, action) => {
      state.mnemonicPopup = action.payload
    },
    setDelist: (state, action) => {
      state.dilist = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.isPending = true
        state.errorMessage = null
        state.isError = false
      })
      .addCase(login.rejected, (state, action) => {
        state.isPending = false
        state.isUserPending = false
        state.errorMessage = action.payload
        state.isError = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isPending = false
        state.isUserPending = false
        state.currentUser = action.payload.user
        state.notificationObj = action.payload.userNotifications
      })
      .addCase(register.pending, (state, action) => {
        state.isPending = true
        state.errorMessage = null
        state.isError = false
      })
      .addCase(register.rejected, (state, action) => {
        state.isUserPending = false
        state.errorMessage = action.payload
        state.isError = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isUserPending = false
        state.currentUser = action.payload
      })
      .addCase(logout.pending, (state, action) => {
        state.isPending = true
        state.errorMessage = null
        state.isError = false
        state.isUserPending = true
      })
      .addCase(logout.rejected, (state, action) => {
        state.isPending = false
        state.isUserPending = false
        state.errorMessage = action.payload
        state.isError = true
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isPending = false
        state.currentUser = null
        state.isUserPending = false
        state.errorMessage = null
        state.isError = false
        state.isAuthenticated = false
      })
      .addCase(updateUser.pending, (state, action) => {
        state.isPending = true
        state.isGoogle = true
        state.errorMessage = null
        state.isError = false
        state.isSuccess = false
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isPending = false
        state.isUserPending = false
        state.isGoogle = false
        state.errorMessage = action.payload
        state.isError = true
        state.isSuccess = false
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isPending = false
        state.isGoogle = false
        state.isUserPending = false
        state.currentUser = { ...state.currentUser, ...action.payload }
        state.isSuccess = true
      })
      .addCase(loginWithGoogle.pending, (state, action) => {
        state.isPending = true
        state.isGoogle = true
        state.errorMessage = null
        state.isError = false
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.isPending = false
        state.isGoogle = false
        state.isUserPending = false
        state.errorMessage = action.payload
        state.isError = true
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.isPending = false
        state.isGoogle = false
        state.isUserPending = false
        state.currentUser = action.payload
      })
  },
})

export default userSlice
export const {
  setUserData,
  setAuthenticated,
  setResetAuth,
  setNotifications,
  setError,
  setSuccess,
  setPending,
  setUserPending,
  setMnemonicPopup,
  setDelist
} = userSlice.actions
