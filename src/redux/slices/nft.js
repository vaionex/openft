import { firebaseGetFirstNfts } from '@/firebase/utils'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {}

const nftSlice = createSlice({
  name: 'nft',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
})

export default nftSlice
// export const {} = nftSlice.actions
