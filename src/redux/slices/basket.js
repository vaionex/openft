import { firebaseGetFirstNfts } from '@/firebase/utils'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  basket: {},
  open: false,
  errorMessage: null,
  isPending: false,
  isSuccess: false,
}

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload
    },
    addBasket: (state, action) => {
      state.basket = { ...state.basket, ...action.payload }
    },
    removeBasket: (state, action) => {
      state.basket = { ...action.payload }
    },
    clearBasket: (state) => {
      state.basket = null
    },
  },
})

export default basketSlice
export const {
  setDetailsValues,
  setOpen,
  addBasket,
  removeBasket,
  clearBasket,
} = basketSlice.actions
