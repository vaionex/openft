/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @next/next/no-img-element */
import { useDispatch, useSelector } from 'react-redux'
import { InputMain } from '@/components/ui/inputs'
import { UsersCircleIcon } from '@/components/common/icons'
import { Controller, useForm } from 'react-hook-form'
import registrationFormSelector from '@/redux/selectors/registration-form'
import { setSocialsValues } from '@/redux/slices/registration-form'
import userSelector from '@/redux/selectors/user'
import ButtonWLoading from '@/components/ui/button-w-loading'
import ModalConfirm from '@/components/ui/modal-confirm'
import { WalletIcon, WarningIcon } from '@/components/common/icons'
import { setMnemonicPopup } from '@/redux/slices/user'
import ReCAPTCHA from 'react-google-recaptcha'
import { createRef, useState } from 'react'
import { toast } from 'react-toastify'

const inputAttributes = [
  {
    id: 'instagram',
    type: 'text',
    addon: 'https://instagram.com/',
    placeholder: 'username',
    name: 'instagram',
  },
  {
    id: 'facebook',
    type: 'text',
    addon: 'https://facebook.com/',
    placeholder: 'username',
    name: 'facebook',
  },
  {
    id: 'website',
    type: 'text',
    addon: 'https://',
    placeholder: 'yourwebsite.com',
    name: 'website',
  },
]

const defaultMnemonics = ['', '', '', '', '', '', '', '', '', '', '', '']

function RegistrationAddSocials({
  goToStep,
  mnemonicStatus,
  setMnemonicStatus,
  mnemonic,
}) {
  const recaptchaRef = createRef()
  const [captcha, setCaptcha] = useState('')
  const [submitCounter, setSubmitCounter] = useState(0)
  const dispatch = useDispatch()
  const { isPending, isError } = useSelector(userSelector)
  const { socialsValues } = useSelector(registrationFormSelector)
  const { control, handleSubmit } = useForm({
    defaultValues: socialsValues,
  })

  const onSubmit = async (data) => {
    if (submitCounter >= 5 && !captcha) {
      toast.error('Please Complete Captcha', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
      return
    } else {
      setSubmitCounter(submitCounter + 1)
    }
    dispatch(setSocialsValues(data))

    setCaptcha('')
    if (submitCounter >= 5) {
      setSubmitCounter(0)
    }
  }

  const onReCAPTCHAChange = (captchaCode) => {
    if (!captchaCode) {
      return
    }
    setCaptcha(captchaCode)
  }
  return (
    <div className="flex flex-col justify-center flex-1 mt-5 sm:mt-0 item-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <UsersCircleIcon className="w-auto mx-auto rounded-full h-14" />
        <h2 className="mt-6 text-3xl font-semibold text-center text-gray-900">
          Add your socials
        </h2>
        <p className="mt-3 text-center text-base font-normal text-gray-500">
          You are welcome to link to your own webpage <br /> with more details.
        </p>
      </div>
      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-2 bg-white sm:rounded-lg sm:px-10">
          <form className="space-y-6">
            {inputAttributes.map((inputAttribute) => (
              <InputMain
                key={inputAttribute.name}
                className="relative pb-0 border-none"
              >
                <Controller
                  name={inputAttribute.name}
                  control={control}
                  render={({ field }) => (
                    <InputMain.Input
                      id={inputAttribute.name}
                      variant="add-on"
                      addon={inputAttribute.addon}
                      placeholder={inputAttribute.placeholder}
                      className="mb-8 sm:mb-4"
                      type={inputAttribute.type}
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/\s/g, '')
                      }}
                      {...field}
                    />
                  )}
                />
              </InputMain>
            ))}
            {submitCounter >= 5 ? (
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                onChange={onReCAPTCHAChange}
              />
            ) : (
              ''
            )}
            <div className="flex gap-4">
              <button
                type="button"
                className="w-full font-semibold btn-secondary"
                onClick={() => goToStep(3)}
              >
                Back
              </button>
              <ButtonWLoading
                isError={isError}
                isPending={isPending}
                text="Finish"
                onClick={handleSubmit(onSubmit)}
                fullWidth
              />
            </div>
          </form>
        </div>
      </div>
      <ModalConfirm
        isOpen={mnemonicStatus}
        isLoadingConfirmBtn={mnemonic ? false : true}
        onClose={() => {
          setMnemonicStatus(false)
          dispatch(setMnemonicPopup(false))
        }}
        onConfirm={() => {
          setMnemonicStatus(false)
          dispatch(setMnemonicPopup(false))
        }}
        button1Text={"I've already backed it up"}
        cancelButton={false}
        icon={
          <WalletIcon className="w-12 h-12 text-green-500" aria-hidden="true" />
        }
        title={'Congratulatuions!'}
        content={
          <>
            <div>
              Your <strong>account and wallet</strong> are created. Here is your
              secret phrase. Write down or copy these words in the right order
              and save them somewhere safe.
            </div>
            <div className="mt-5 grid grid-cols-3 gap-4">
              {(mnemonic?.split(' ') ?? defaultMnemonics).map((mnc, idx) => {
                return (
                  <div
                    key={idx}
                    className="col-span-1 bg-gray-200 rounded-xl py-3 flex"
                  >
                    <div className="w-4 pl-1">{idx + 1}</div>
                    <div className="flex justify-center items-center flex-1 text-gray-700">
                      {mnc}
                      {!mnemonic && (
                        <div className="flex flex-col justify-center flex-1 mt-5 sm:mt-0 item-center">
                          <div className="flex justify-center space-x-2 animate-pulse">
                            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                          </div>
                          <span className="sr-only">Loading...</span>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="mt-10 text-start border-2 p-4 rounded-2xl">
              <WarningIcon
                className="w-12 h-12 text-red-500"
                aria-hidden="true"
              />

              <div className="ml-1">
                <h3 className="text-gray-700 font-medium text-lg mt-2">
                  Do not share your secret phrase!
                </h3>
                <p className="mt-3">
                  If someone has your secret phrase they will have full control
                  of your wallet.
                </p>
              </div>
            </div>
          </>
        }
      />
    </div>
  )
}

export default RegistrationAddSocials
