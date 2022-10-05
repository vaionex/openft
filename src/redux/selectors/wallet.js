import { createDraftSafeSelector } from '@reduxjs/toolkit'

const selectWallet = (state) => state.wallet

const walletSelector = createDraftSafeSelector(selectWallet, (wallet) => wallet)

export default walletSelector
