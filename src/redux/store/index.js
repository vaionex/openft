import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../slices/user'
import registrationFormSlice from '../slices/registration-form'
import walletSlice from '../slices/wallet'
import nftSlice from '../slices/nft'

const reducer = {
  // Add your reducers here
  user: userSlice.reducer,
  wallet: walletSlice.reducer,
  registrationForm: registrationFormSlice.reducer,
  nft: nftSlice.reducer,
}

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store
