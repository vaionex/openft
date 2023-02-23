import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { CameraIcon } from '@heroicons/react/outline'
import registrationFormSelector from '@/redux/selectors/registration-form'
import ImageUploadDragAndDrop from '@/components/ui/image-upload-drag-n-drop'
import {
  clearPhotoValues,
  setPhotoValues,
  setReadyToGo,
} from '@/redux/slices/registration-form'
import ButtonWLoading from '@/components/ui/button-w-loading'
import ModalConfirm from '@/components/ui/modal-confirm'
import { WalletIcon, WarningIcon } from '@/components/common/icons'
import userSelector from '@/redux/selectors/user'
import { setMnemonicPopup } from '@/redux/slices/user'
import ReCAPTCHA from 'react-google-recaptcha'
import { createRef, useState } from 'react'
import { toast } from 'react-toastify'
import { firebaseUpdateDoc } from '@/firebase/utils'
import { useEffect } from 'react'

const defaultMnemonics = ['', '', '', '', '', '', '', '', '', '', '', '']

const ImageInputAttributes = [
  {
    id: 'coverImage',
    name: 'coverImage',
    title: 'Cover Image',
    text: 'Click to upload cover photo',
    subinfo: 'Max Size - 4MB',
    limits: {
      // maxWidth: 3840,
      // maxHeight: 2160,
      maxSize: 4, //MB
    },
    aspect: 4 / 3,
  },
  {
    id: 'profileImage',
    name: 'profileImage',
    title: 'Profile Image',
    text: 'Click to upload profile photo',
    subinfo: 'Max Size - 1MB',
    limits: {
      // maxWidth: 400,
      // maxHeight: 400,
      maxSize: 1, //MB
    },
    aspect: 1 / 1,
  },
]

const RegistrationUploadPhoto = ({
  goToStep,
  mnemonicStatus,
  setMnemonicStatus,
  mnemonic,
  paymail,
  currentUser
}) => {
  const dispatch = useDispatch()
  const recaptchaRef = createRef()
  const [captcha, setCaptcha] = useState('')
  const [submitCounter, setSubmitCounter] = useState(0)
  const { isPending, isError } = useSelector(userSelector)
  const { photoValues } = useSelector(registrationFormSelector)

  const handleClear = (id) => {
    dispatch(clearPhotoValues(id))
  }

  const setImageToState = ({ id, file }) => {
    dispatch(
      setPhotoValues({
        [id]: { ...file },
      }),
    )
  }

  const handleCapcha = () => {
    if (submitCounter >= 4 && !captcha) {
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
    } else if (submitCounter >= 4) {
      setSubmitCounter(0)
    } else {
      setSubmitCounter(submitCounter + 1)
    }
  }

  const onSubmit = async () => {
    handleCapcha()
    dispatch(setReadyToGo(true))
    setCaptcha('')
  }

  const onReCAPTCHAChange = (captchaCode) => {
    if (!captchaCode) return
    setCaptcha(captchaCode)
  }

  useEffect(() => {
    if (mnemonic) {
      (async () => {
        if (paymail) {
          await firebaseUpdateDoc("users", currentUser?.uid, { paymail })
        }
      })()
    }
  }, [mnemonic])

  return (
    <div className="flex flex-col justify-center flex-1 mt-5 sm:mt-0 item-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <CameraIcon className="w-auto rounded-full mx-auto p-3 bg-blue-50 text-blue-600 h-14 stroke-[1.5]" />
        <h2 className="mt-6 text-3xl font-semibold text-center text-gray-900">
          Upload your photo
        </h2>
        <p className="mt-3 text-base font-normal text-center text-gray-500">
          Beautify your profile, it also will
          <br /> be visible to the public
        </p>
      </div>

      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-2 bg-white sm:rounded-lg sm:px-10">
          <form className="space-y-6">
            {ImageInputAttributes.map((inputAttribute) => (
              <ImageUploadDragAndDrop
                key={inputAttribute.id}
                attributes={inputAttribute}
                handleClear={() => handleClear(inputAttribute.id)}
                isSelected={!!photoValues[inputAttribute.id]}
                setImageToState={setImageToState}
                photoValues={photoValues && photoValues}
              />
            ))}
            {submitCounter >= 4 && (
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                onChange={onReCAPTCHAChange}
              />
            )}
            <div className="flex gap-4">
              <button
                type="button"
                className="w-full font-semibold btn-secondary"
                onClick={() => goToStep(2)}
              >
                Back
              </button>
              <ButtonWLoading
                isError={isError}
                isPending={isPending}
                text="Finish"
                onClick={() => onSubmit()}
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
        title={'Congratulations!'}
        content={
          <>
            <div>
              Your <strong>account and wallet</strong> are created. Here is your
              secret phrase. Write down or copy these words in the right order
              and save them somewhere safe.
            </div>
            <div className="grid grid-cols-3 gap-4 mt-5">
              {(mnemonic?.split(' ') ?? defaultMnemonics).map((mnc, idx) => {
                return (
                  <div
                    key={idx}
                    className="flex col-span-1 py-3 bg-gray-200 rounded-xl"
                  >
                    <div className="w-4 pl-1">{idx + 1}</div>
                    <div className="flex items-center justify-center flex-1 text-gray-700">
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
            <div className="p-4 mt-10 border-2 text-start rounded-2xl">
              <WarningIcon
                className="w-12 h-12 text-red-500"
                aria-hidden="true"
              />

              <div className="ml-1">
                <h3 className="mt-2 text-lg font-medium text-gray-700">
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

export default RegistrationUploadPhoto
