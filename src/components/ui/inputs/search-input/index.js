import SvgSearchIcon from '@/components/common/icons/search-icon'
import { twMerge } from 'tailwind-merge'
import PropTypes from 'prop-types'

const SearchInput = ({ width, className }) => {
  return (
    <div className={twMerge('w-full max-w-lg lg:max-w-xs', width, className)}>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative text-sky-100 focus-within:text-gray-400">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <SvgSearchIcon
            className="flex-shrink-0 w-4 h-4 text-gray-400"
            aria-hidden="true"
          />
        </div>
        <input
          id="search"
          name="search"
          className="block w-full py-2 pl-10 pr-3 leading-5 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-white focus:placeholder-gray-500 focus:text-gray-900 sm:text-sm"
          placeholder="Search"
          type="search"
        />
      </div>
    </div>
  )
}

SearchInput.propTypes = {
  width: PropTypes.string,
  className: PropTypes.string,
}

export default SearchInput
