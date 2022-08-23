import { createDraftSafeSelector } from '@reduxjs/toolkit'

const selectNft = (state) => state.nft

const nftSelector = createDraftSafeSelector(
  selectNft,
  (nft) => nft
)

export default nftSelector
