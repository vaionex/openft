import { InputMain } from '@/components/ui/inputs'
import { useState } from 'react'
import { connectRange } from 'react-instantsearch-dom'

const NFTMarketplaceFilters = (props) => {
  const { min, max, currentRefinement, refine } = props
  const [errorMessage, setErrorMessage] = useState(null)
  const [values, setValues] = useState({
    min: '',
    max: '',
  })

  const numberRegex = /^[0-9\b]+$/

  const handleChange = (e) => {
    const { name, value } = e.target
    if (
      min !== values.min ||
      (max !== values.max && value === '') ||
      numberRegex.test(value)
    ) {
      setValues({ ...values, [name]: value })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (values.min < min || values.max > max) {
      setErrorMessage(
        `Please enter a value between ${min} and ${max} for the price range.`,
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
    <form className="flex flex-col gap-4">
      <h3 className="sr-only">Categories</h3>
      <h3>Filter</h3>
      <div className="grid grid-cols-2 gap-4 ">
        <InputMain className="pb-0 border-none">
          <InputMain.Label
            htmlFor="min"
            label="Max Price"
            className="sr-only"
          />
          <InputMain.Input
            type="number"
            name="min"
            id="minPrice"
            placeholder="$ Min Price"
            value={values.min}
            onChange={handleChange}
            min={min}
          />
        </InputMain>
        <InputMain className="pb-0 border-none">
          <InputMain.Label
            htmlFor="max"
            label="Min Price"
            className="sr-only"
          />
          <InputMain.Input
            type="number"
            name="max"
            id="maxPrice"
            placeholder="$ Max Price"
            value={values.max}
            onChange={handleChange}
            max={max}
          />
        </InputMain>
      </div>
      <span className="text-xs text-red-500">{errorMessage}</span>
      <div className="flex gap-4 leading-[18px]">
        <button className="btn-secondary" onClick={(e) => handleClear(e)}>
          Clear
        </button>
        <button
          className="w-full font-semibold btn-primary"
          onClick={(e) => handleSubmit(e)}
        >
          Apply filter
        </button>
      </div>
    </form>
  )
}

export default connectRange(NFTMarketplaceFilters)
