import { firebaseGetFirstNfts } from '@/firebase/utils'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  nft: null,
  totalPage: 1,
  currentPage: 0,
  isError: false,
  errorMessage: null,
  isPending: false,
  isSuccess: false,
  lastDoc: null,
  query: {}
}

const nftSlice = createSlice({
  name: 'nft',
  initialState,
  reducers: {
    setNfts: (state, action) => {
      state.nft = action.payload
    },
    setTotalPages: (state, action) => {
      state.totalPage = action.payload
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setLastDoc: (state, action) => {
      state.lastDoc = action.payload
    },
    setQuery: (state, action) => {
      state.query = { ...state.query, ...action.payload }
    },
    removeQuery: (state) => {
      state.query = {}
    },

  },
  extraReducers: (builder) => {


  },
})

export default nftSlice
export const { setNfts, setTotalPages, setCurrentPage, setLastDoc, setQuery, removeQuery } = nftSlice.actions
