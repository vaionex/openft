import { useState } from 'react'
import { InputMain } from '@/components/ui/inputs'
import validationSchema from './validationScheme'
import useYupValidationResolver from '@/hooks/useYupValidationResolver'
import { useForm, Controller } from 'react-hook-form'
import ButtonWLoading from '@/components/ui/button-w-loading'
import { DummyOne, DummyTwo } from './dummy'
import Link from 'next/link'

const GenerateForm = () => {
  const DESC_MAX_LENGTH = 200

  const [bsvPrice, setBsvPrice] = useState('')

  const [isPending, setIsPending] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [hidden, setHidden] = useState(false)

  const resolver = useYupValidationResolver(validationSchema)
  const { control, handleSubmit, formState, reset, watch } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver,
  })

  const { errors } = formState

  const generateArt = () => {
    setHidden(!hidden)
  }

  const dummyTwoData = [
    {
      id: 1,
      image:
        'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(89).webp',
    },
    {
      id: 2,
      image:
        'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(89).webp',
    },
    {
      id: 3,
      image:
        'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(89).webp',
    },
    {
      id: 4,
      image:
        'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(89).webp',
    },
  ]

  return (
    <form className="space-y-8 divide-y divide-gray-200">
      <div className="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
        <InputMain className="border-none sm:gap-1">
          <label className={'block text-sm font-medium text-gray-700 sm:mt-px'}>
            Start with a detailed description
            <span className="relative inline-block text-xs cursor-pointer font-medium min-h-[22px] min-w-p[85px] ml-[6px] px-2 py-[2px] bg-gray-100">
              Surprise me
            </span>
          </label>

          <div className="flex mt-1 rounded-md shadow-sm h-10">
            <div className="relative flex items-stretch flex-grow focus-within:z-10">
              <input
                type="text"
                className="flex-1 block w-full min-w-0 border-gray-200 rounded-none focus:ring-blue-500 focus:border-blue-500 rounded-l-md sm:text-sm"
              />
            </div>

            <button
              onClick={generateArt}
              type="button"
              className="relative inline-flex items-center px-4 py-2 -ml-px space-x-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
              Generate
            </button>
          </div>
          {!hidden && (
            <>
              <span className={'block text-sm font-normal text-gray-500'}>
                Or try using the example below.
              </span>

              <DummyOne />
            </>
          )}
        </InputMain>
        {hidden && (
          <>
            <DummyTwo data={dummyTwoData} />
            <InputMain className="sm:flex sm:justify-between sm:gap-8">
              <InputMain.Label
                label="Artwork name"
                sublabel="This will be displayed on your artwork."
                htmlFor="name"
                className="sm:w-[280px]"
              />
              <div className="mt-1 sm:mt-0 sm:w-full sm:max-w-[666px]">
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => {
                    return (
                      <InputMain.Input
                        id="name"
                        className="sm:col-span-2"
                        placeholder="e.g. My artwork"
                        onChange={() => {}}
                        inputContainer="md:h-11"
                        error={errors['name']?.message}
                        disabled={isPending}
                        {...field}
                      />
                    )
                  }}
                />
              </div>
            </InputMain>
            <InputMain className="sm:flex sm:justify-between sm:gap-8">
              <InputMain.Label
                label="Description"
                sublabel="A quick snapshot of your artwork."
                htmlFor="description"
                className="sm:w-[280px]"
              />
              <div className="mt-1 sm:mt-0 sm:w-full sm:max-w-[666px]">
                <Controller
                  name="description"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <InputMain.Textarea
                      id="description"
                      name="description"
                      rows={3}
                      placeholder="Write a short description of your artwork."
                      onChange={() => {}}
                      error={errors['description']?.message}
                      maxLength={DESC_MAX_LENGTH}
                      disabled={isPending}
                      {...field}
                    />
                  )}
                />
                <p className="mt-2 text-sm text-gray-500">
                  {watch('description')
                    ? DESC_MAX_LENGTH - watch('description').length
                    : DESC_MAX_LENGTH}{' '}
                  characters left
                </p>
              </div>
            </InputMain>
            <InputMain className="sm:flex sm:justify-between sm:gap-8">
              <InputMain.Label
                label="Starting price"
                sublabel="The price shown on your artwork."
                htmlFor="amount"
                className="sm:w-[280px]"
              />
              <div className="flex flex-col sm:flex-row mt-1 sm:mt-0 gap-4 w-full sm:max-w-[666px]">
                <Controller
                  name="amount"
                  control={control}
                  defaultValue=""
                  render={({ field }) => {
                    return (
                      <InputMain.Input
                        name="amount"
                        type="number"
                        id="amount"
                        className="relative w-full sm:w-1/2 h-11"
                        inputContainer="md:h-11"
                        autoComplete="given-name"
                        placeholder="e.g. $0.00"
                        error={errors['amount']?.message}
                        disabled={isPending}
                        inputIcon="$"
                        {...field}
                      />
                    )
                  }}
                />
                <InputMain.Input
                  name="bsv"
                  id="bsv"
                  disabled
                  value={bsvPrice}
                  className="mt-2 text-gray-500 sm:mt-0 relative w-full sm:w-1/2"
                  inputContainer="md:h-11"
                  placeholder="1 BSV"
                  tooltip={{
                    text: 'This conversion is based on coinmarketcap.',
                  }}
                />
              </div>
            </InputMain>
            <InputMain className="sm:flex sm:justify-between sm:gap-8">
              <InputMain.Label
                label="Supply"
                sublabel="The number of copies minted artwork."
                htmlFor="supply"
                className="sm:w-[280px]"
              />
              <div className="mt-1 sm:mt-0 sm:w-full sm:max-w-[666px]">
                <Controller
                  name="supply"
                  control={control}
                  defaultValue=""
                  render={({ field }) => {
                    return (
                      <InputMain.Input
                        id="supply"
                        type="number"
                        placeholder="e.g. 10"
                        className="sm:col-span-2 relative"
                        inputContainer="md:h-11"
                        tooltip={{
                          title: 'Supply',
                          text: 'Presently we only provide 1 supply for each NFT to preserve the originality of each NFT.',
                        }}
                        onChange={() => {}}
                        error={errors['supply']?.message}
                        disabled={isPending}
                        {...field}
                      />
                    )
                  }}
                />
              </div>
            </InputMain>
          </>
        )}

        <div className="flex flex-col items-center justify-end space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
          {isSuccess && (
            <span className="text-xs text-green-500">
              NFT successfully created!
            </span>
          )}
          {isError && (
            <span className="text-xs text-red-500">{errorMessage}</span>
          )}
          <div className="flex space-x-3">
            <div className="rounded-md">
              <Link href="/">
                <a className="flex items-center leading-5 justify-center w-full px-4 py-[10px] text-sm font-medium text-[#344054] bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                  Cancel
                </a>
              </Link>
            </div>
            <ButtonWLoading
              className={'text-sm px-4 py-[10px]'}
              isError={isError}
              isPending={isPending}
              text="Mint"
              type="submit"
            />
          </div>
        </div>
      </div>
    </form>
  )
}

export default GenerateForm
