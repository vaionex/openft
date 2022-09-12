import { useState } from 'react'
import { InputMain } from '@/components/ui/inputs'
import { connectRange } from 'react-instantsearch-dom'

const NFTMarketplaceAmountFilter = (props) => {
  const { min, max, currentRefinement, refine } = props
  const [errorMessage, setErrorMessage] = useState(null)
  const [values, setValues] = useState({
    min: '',
    max: '',
  })

  const onInput = (e) => {
    e.target.validity.valid || (e.target.value = '')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (min !== values.min || (max !== values.max && value === '')) {
      setValues({ ...values, [name]: value })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (values.min < min || values.max > max) {
      setErrorMessage(
        `Please enter a value between $${min} and $${max} for the price range.`,
      )
      return false
    }
    refine({ min: values.min, max: values.max })
  }

  const handleClear = (e) => {
    e.preventDefault()
    setValues({ min: '', max: '' })
    refine({ min: undefined, max: undefined })
  }

  return (
    <div className="flex flex-col ">
      <span className="text-sm">Price Filter</span>
      <div className="grid grid-cols-2 gap-4 mt-1 mb-4">
        <InputMain className="relative pb-0 border-none">
          <InputMain.Label
            htmlFor="min"
            label="Max Price"
            className="sr-only"
          />
          <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <InputMain.Input
            type="number"
            name="min"
            id="minPrice"
            placeholder="Min Price"
            value={values.min}
            onChange={handleChange}
            inputClassName="pl-7"
            min={0}
            onInput={onInput}
            // onInput={(e) => {
            //   e.target.validity.valid || (e.target.value = '')
            // }}
          />
        </InputMain>
        <InputMain className="relative pb-0 border-none">
          <InputMain.Label
            htmlFor="max"
            label="Min Price"
            className="sr-only"
          />
          <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <InputMain.Input
            type="number"
            name="max"
            id="maxPrice"
            placeholder="Max Price"
            inputClassName="pl-7"
            value={values.max}
            onChange={handleChange}
            onInput={onInput}
            min={0}
          />
        </InputMain>
        {errorMessage && (
          <span className="text-xs text-red-500">{errorMessage}</span>
        )}
      </div>

      <div className="flex gap-4 leading-[12px]">
        <button
          className="py-2 text-sm btn-secondary"
          onClick={(e) => handleClear(e)}
        >
          Clear
        </button>
        <button
          className="py-2 text-sm font-semibold lg:w-full btn-primary"
          onClick={(e) => handleSubmit(e)}
        >
          Apply price filter
        </button>
      </div>
    </div>
  )
}

export default connectRange(NFTMarketplaceAmountFilter)
