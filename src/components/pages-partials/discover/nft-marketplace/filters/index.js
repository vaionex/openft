import NFTMarketplaceAmountFilter from './amounts'
import NftMarketplaceArtistFilter from './artists'

const NFTMarketplaceFilters = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative hidden lg:block">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center">
          <h3 className="sr-only">Filters</h3>
          <h3 className="px-3 font-medium text-gray-900 bg-white">Filters</h3>
        </div>
      </div>
      <ul role="list" className="divide-y divide-gray-200">
        <li className="pb-8">
          <NftMarketplaceArtistFilter attribute="userId" />
        </li>
        <li className="pt-8">
          <NFTMarketplaceAmountFilter attribute="amount" />
        </li>
      </ul>
    </div>
  )
}

export default NFTMarketplaceFilters
