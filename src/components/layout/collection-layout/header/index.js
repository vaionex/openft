import { SearchInput } from '@/components/ui/inputs'
import { InputMain } from '@/components/ui/inputs'
import { MagnifyGlassIcon } from '@/components/common/icons'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const CollectionHeader = ({ collection, setfilteredCollection }) => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleChange = (event) => {
    const newSearchQuery = event.target.value
    setSearchQuery(newSearchQuery)

    // Perform the search within the current collection

    if (newSearchQuery.trim() === '') {
      setfilteredCollection(collection)
    } else {
      const filtered = collection.filter((item) =>
        item.name.toLowerCase().includes(newSearchQuery.toLowerCase()),
      )
      setfilteredCollection(filtered)
    }
  }

  return (
    <div className="relative pt-12 pb-6">
      <div className="flex flex-col justify-between px-4 mx-auto xs:flex-row max-w-7xl sm:px-0">
        <div className="flex items-center justify-between gap-4 mb-3 xs:mb-0">
          <h1 className="text-3xl font-medium text-mirage">Settings</h1>
        </div>
        <div>
          <form className="flex items-center w-full gap-3">
            <InputMain className="relative w-full pb-0 border-none">
              <span className="absolute inset-y-0 left-0 z-10 flex items-center pl-3 pointer-events-none">
                <MagnifyGlassIcon className="w-5 h-5 text-gray-400 " />
              </span>
              <InputMain.Label
                htmlFor="search"
                label="Search"
                className="sr-only"
              />
              <InputMain.Input
                type="text"
                name="search"
                id="search"
                placeholder="Search"
                inputClassName="pl-10 min-h-[44px]"
                onChange={handleChange}
                value={searchQuery}
              />
            </InputMain>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CollectionHeader
