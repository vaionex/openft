import React from 'react'
import { connectStateResults, Hits } from 'react-instantsearch-dom'
import NFTProducts from '..'
import NFTMarketplacePagination from '../../pagination'

const NFTMarketplaceResults = ({ searchResults }) => {
  return (
    <>
      {searchResults && searchResults.nbHits > 0 ? (
        <>
          <div className="h-full nft-market-products">
            <Hits hitComponent={NFTProducts} />
          </div>
          <NFTMarketplacePagination />
        </>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          No NFTs found
        </div>
      )}
    </>
  )
}

export default connectStateResults(NFTMarketplaceResults)
