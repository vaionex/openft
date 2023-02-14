import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  balance: null,
  address: '',
  addressPath0: '',
  mnemonic: null,
  wallethistory: [],
  walletid: '00000000-0000-0000-0000-000000000000',
  paymail: '',
  addresses: [],
  bsvRate: null,
}

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    updateWalletHistory: (state, action) => {
      state.wallethistory = action.payload
    },
    clearWalletData: (state, action) => {
      state.balance = null
      state.address = ''
      state.addressPath0 = ''
      state.mnemonic = null
      state.wallethistory = []
      state.walletid = '00000000-0000-0000-0000-000000000000'
      state.paymail = ''
    },
    updateMnemonic: (state, action) => {
      state.mnemonic = action.payload
    },
    updateBalance: (state, action) => {
      state.balance = action.payload
    },
    updateAddress: (state, action) => {
      state.address = action.payload
    },
    updateAllAddresses: (state, action) => {
      state.addresses = action.payload
    },
    updateAddressPath0: (state, action) => {
      state.addressPath0 = action.payload
    },
    updatePaymail: (state, action) => {
      state.paymail = action.payload
    },
    updateBsvRate: (state, action) => {
      state.bsvRate = action.payload
    },
  },
})

export default walletSlice
export const {
  updateWalletHistory,
  clearWalletData,
  updateMnemonic,
  updateBalance,
  updateAddress,
  updateAddressPath0,
  updatePaymail,
  updateAllAddresses,
  updateBsvRate,
} = walletSlice.actions
