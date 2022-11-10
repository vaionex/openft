import { useState } from 'react'
import { InputMain } from '@/components/ui/inputs'
import validationSchema from './validationScheme'
import useYupValidationResolver from '@/hooks/useYupValidationResolver'
import { useForm, Controller } from 'react-hook-form'
import ButtonWLoading from '@/components/ui/button-w-loading'
import { DummyOne, DummyTwo } from './dummy'

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

          <div className="flex mt-1 rounded-md shadow-sm">
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
            <DummyTwo />
            <InputMain className="sm:grid-cols-3 border-none">
              <InputMain.Label
                label="Artwork name"
                sublabel="This will be displayed on your artwork."
                htmlFor="name"
              />
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
                      error={errors['name']?.message}
                      disabled={isPending}
                      {...field}
                    />
                  )
                }}
              />
            </InputMain>
            <InputMain className="sm:grid-cols-3 border-none">
              <InputMain.Label
                label="Description"
                sublabel="A quick snapshot of your artwork."
                htmlFor="description"
              />
              <div className="mt-1 sm:mt-0 sm:col-span-2">
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
            <InputMain className=" sm:grid-cols-3 border-none">
              <InputMain.Label
                label="Starting price"
                sublabel="The price shown on your artwork."
                htmlFor="amount"
              />

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
                className="mt-2 text-gray-500 sm:mt-0"
                placeholder="1 BSV"
                tooltip={{
                  text: 'This conversion is based on coinmarketcap.',
                }}
              />
            </InputMain>
            <InputMain className="sm:grid-cols-3">
              <InputMain.Label
                label="Supply"
                sublabel="The number of copies minted artwork."
                htmlFor="supply"
              />
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
                      className="sm:col-span-2"
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
          <ButtonWLoading
            isError={isError}
            isPending={isPending}
            text="Save"
            type="submit"
          />
        </div>
      </div>
    </form>
  )
}

export default GenerateForm
