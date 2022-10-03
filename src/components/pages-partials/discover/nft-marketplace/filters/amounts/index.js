import { useCallback, useEffect, useState } from 'react'
import { InputMain } from '@/components/ui/inputs'
import { connectRange } from 'react-instantsearch-dom'

const NFTMarketplaceAmountFilter = (props) => {
  const { currentRefinement, refine, onAmountFilter } = props

  const [errorMessage, setErrorMessage] = useState(null)
  const [values, setValues] = useState({
    min: '',
    max: '',
  })

  useEffect(() => {
    console.log(values)
    onAmountFilter.current = () => {
      if (values.min > values.max) {
        setErrorMessage('Min value should be less than max value')
        setValues({
          min: '',
          max: '',
        })
      } else {
        setErrorMessage('')
        refine({ min: values.min, max: values.max })
      }
    }
  }, [values])

  useEffect(() => {
    if (currentRefinement.min || currentRefinement.max) {
      setValues({ min: currentRefinement.min, max: currentRefinement.max })
    } else {
      setValues({ min: '', max: '' })
    }
  }, [currentRefinement.min, currentRefinement.max])

  const onInput = (e) => {
    e.target.validity.valid || (e.target.value = '')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="flex flex-col ">
      <span className="text-sm">Price Filter</span>
      <div className="grid grid-cols-2 gap-4">
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
      </div>
      {errorMessage && (
        <span className="w-full mt-2 text-xs text-red-500">{errorMessage}</span>
      )}
    </div>
  )
}

export default connectRange(NFTMarketplaceAmountFilter)
