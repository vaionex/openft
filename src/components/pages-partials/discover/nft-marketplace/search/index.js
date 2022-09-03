import { MagnifyGlassIcon } from '@/components/common/icons'
import { InputMain } from '@/components/ui/inputs'

const NFTMarketplaceSearch = ({ initialSearchValue, onChange, onSubmit }) => {
  return (
    <form className="flex items-center w-full gap-2" onSubmit={onSubmit}>
      <InputMain className="relative w-full pb-0 border-none">
        <span className="absolute inset-y-0 left-0 z-10 flex items-center pl-3 pointer-events-none">
          <MagnifyGlassIcon className="w-5 h-5 text-gray-400 " />
        </span>
        <InputMain.Label htmlFor="search" label="Search" className="sr-only" />
        <InputMain.Input
          type="text"
          name="search"
          id="search"
          placeholder="Search"
          value={initialSearchValue}
          inputClassName="pl-10 min-h-[44px]"
          onChange={onChange}
        />
      </InputMain>
      <button className="p-3 rounded-md btn-primary">
        <span className="sr-only">Search Button</span>
        <MagnifyGlassIcon className="w-5 h-5 text-white" />
      </button>
    </form>
  )
}

export default NFTMarketplaceSearch
