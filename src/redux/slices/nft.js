import { firebaseGetFirstNfts } from '@/firebase/utils'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  nft: null,
  isError: false,
  errorMessage: null,
  isPending: false,
  isSuccess: false,
}

const nftSlice = createSlice({
  name: 'nft',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
})

export default nftSlice
// export const {} = nftSlice.actions
