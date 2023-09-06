import UserSettingsLayout from '@/components/layout/user-settings-layout'
import { ArrowLeftIcon } from '@heroicons/react/outline'
import React, { useEffect, useRef, useState } from 'react'
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { firebaseVerifyMail, refreshSignIn } from '@/firebase/utils'
import { useDispatch, useSelector } from 'react-redux'
import userSelector from '@/redux/selectors/user'
import ButtonWLoading from '@/components/ui/button-w-loading'
import { InputMain } from '@/components/ui/inputs'
import { firebaseAuth } from '@/firebase/init'
import { useRouter } from 'next/router'
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'

import {
  RecaptchaVerifier,
  PhoneAuthProvider,
  multiFactor,
  updatePhoneNumber,
  PhoneMultiFactorGenerator,
  TotpMultiFactorGenerator,
} from 'firebase/auth'
import OtpModal from '@/components/ui/otp'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import useYupValidationResolver from '@/hooks/useYupValidationResolver'
import { Controller, useForm } from 'react-hook-form'
import { errorMessage } from '@/utils/error-message'
import { setUserData } from '@/redux/slices/user'
let applicationVer
let totpSecret
const UserSettingsMfaSection = () => {
  const [loading, setLoading] = useState(false)
  const [mfaLoading, setMfaLoading] = useState(false)
  const [totpLoading, setTotpLoading] = useState(false)
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [allowedCharacters, setAllowedCharacters] = useState('numeric')
  const [otpNumber, setOtpNumber] = useState('')
  const [phone, setPhone] = useState(null)
  const [type, setType] = useState('mfa')
  const [enrolLen, setEnrolLen] = useState(0)
  const dispatch = useDispatch()

  const [passwordVisible, setPasswordVisible] = useState(false)
  const captchaContainer = useRef()

  const [phoneErrorMessage, setPhoneErrorMessage] = useState(null)
  const [qrCode, setQrcode] = useState()
  const [verifyID, setVerifyID] = useState(null)
  const validationSchema = yup.object({
    phone_number: yup.string()
      .required('Mobile number is required'),
    password: yup.string()
      .required('password is required')
  })
  const resolver = useYupValidationResolver(validationSchema)
  const {
    control,

    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
  } = useForm({
    mode: 'onSubmit',
    resolver,
    reValidateMode: 'onChange',
  })
  const [msg, setMsg] = useState({
    type: null,
    content: null,
  })
  const { currentUser, isAuthenticated } = useSelector(userSelector)
  useEffect(() => {
    if (currentUser?.phoneNumber) {

      setValue("phone_number", currentUser?.phoneNumber)
    }
  }, [currentUser])
  const handleOnChange = (enteredOtp) => {
    setOtpNumber(enteredOtp)
  }
  const disableMfa = async () => {
    try {
      setMfaLoading(true)
      const options = multiFactor(firebaseAuth.currentUser).enrolledFactors.find(data => data.factorId === PhoneMultiFactorGenerator.FACTOR_ID)

      // const options = multiFactor(firebaseAuth.currentUser).enrolledFactors
      await multiFactor(firebaseAuth.currentUser)
        .unenroll(options)
        .then(() => {
          toast.success('MFA disabled')
          setEnrol()

          // router.reload()
        })
    } catch (error) {
      console.log(error)

      setPhoneErrorMessage(
        'Please login again to be able to perform this operation!',
      )
    } finally {
      setMfaLoading(false)
    }
  }
  const disableTotp = async () => {
    try {
      setTotpLoading(true)
      const options = multiFactor(firebaseAuth.currentUser).enrolledFactors.find(data => data.factorId === TotpMultiFactorGenerator.FACTOR_ID)
      await multiFactor(firebaseAuth.currentUser)

        .unenroll(options)
        .then(() => {
          toast.success('Totp disabled')
          setEnrol()

          // router.reload()
        })
    } catch (error) {
      console.log(error)

      setPhoneErrorMessage(
        'Please login again to be able to perform this operation!',
      )
    } finally {
      setTotpLoading(false)
    }
  }
  const verifyMailHandler = async () => {
    setLoading(true)
    const res = await firebaseVerifyMail()
    if (res) {
      setMsg({
        type: 'success',
        content: 'A verification link has been sent to your email account.',
      })
    } else {
      setMsg({
        type: 'error',
        content: 'Something went wrong ! Please try again later.',
      })
    }
    setLoading(false)
  }

  const enableMfa = async () => {
    setMfaLoading(true)
    setType('mfa')

    try {
      console.log(111)
      await multiFactor(firebaseAuth.currentUser)
        .getSession()
        .then(function (multiFactorSession) {
          console.log(222)

          const phoneInfoOptions = {
            phoneNumber: currentUser?.phoneNumber,
            session: multiFactorSession,
          }
          console.log('phoneInfoOptions', phoneInfoOptions)
          const phoneAuthProvider = new PhoneAuthProvider(firebaseAuth)
          phoneAuthProvider
            .verifyPhoneNumber(phoneInfoOptions, window.recaptchaVerifier)
            .then((verificationId) => {
              console.log(333)

              setVerifyID(verificationId)
              setIsOpen(true)
            })
            .catch((error) => {
              console.log('Err 1', error)
              setPhoneErrorMessage(
                'Please login again to be able to perform this operation!',
              )
              // window.recaptchaVerifier.render().then(function (widgetId) {
              //   grecaptcha.reset(widgetId)
              // })
            })
        })
        .catch((error) => {
          // recaptchaVerifier.clear()
          // window.recaptchaVerifier.render().then(function (widgetId) {
          //   grecaptcha.reset(widgetId)
          // })
          console.log('Err 2', error)
        })
    } catch (err) {
      console.log(err)
      // recaptchaVerifier.render().then(function (widgetId) {
      //   grecaptcha.reset(widgetId)
      // })
    } finally {
      setMfaLoading(false)
    }
  }
  function handleError(error) {
    let msg = errorMessage[error.code] || error.message
    toast.error(msg)
  }
  const enableTotp = async () => {
    setTotpLoading(true)
    setType('TOTP')

    try {
      console.log(111)
      await multiFactor(firebaseAuth.currentUser)
        .getSession()
        .then(async function (multiFactorSession) {
          totpSecret = await TotpMultiFactorGenerator.generateSecret(
            multiFactorSession,
          )
          const url = totpSecret.generateQrCodeUrl(
            firebaseAuth.currentUser.email,
            'openft',
          )
          setIsOpen(true)

          setQrcode(url)
        })
        .catch((error) => {
          console.log('error: ', error)
          handleError(error)
        })
    } catch (err) {
      console.log('err: ', err)
      handleError(err)
    } finally {
      setTotpLoading(false)
    }
  }
  const updatePhoneNumberMFA = async (data) => {
    setType('phone')
    // setVerifyLoading(true)
    await refreshSignIn(data.password)

    if (applicationVer && captchaContainer.current) {
      applicationVer.clear()
      applicationVer = null
      document.getElementById('recaptcha-container222').innerHTML =
        '<div id="recaptcha-container"></div>'
    }
    applicationVer = new RecaptchaVerifier(
      'recaptcha-container',
      { size: 'invisible' },
      firebaseAuth,
    )

    const provider = new PhoneAuthProvider(firebaseAuth)
    provider
      .verifyPhoneNumber(data.phone_number, applicationVer)
      .then((verificationId) => {
        setVerifyID(verificationId)
        setIsOpen(true)
        console.log('works')
      })
      .catch((err) => {
        handleError(err)
      })
  }

  const verifyTotpCode = () => {
    console.log('otpNumber: ', otpNumber)
    console.log('totpSecret: ', totpSecret)
    if (totpSecret) {
      const multiFactorAssertion =
        TotpMultiFactorGenerator.assertionForEnrollment(totpSecret, otpNumber)

      // router.reload()
      multiFactor(firebaseAuth.currentUser)
        .enroll(multiFactorAssertion, 'Totp device')
        .then(() => {
          toast.success('TOTP enabled')
          setEnrol()
          setIsOpen(false)
          setQrcode()
        })
        .catch((error) => {
          handleError(error)
        })
    }
  }
  const verifymfacode = () => {
    const phoneCredential = PhoneAuthProvider.credential(verifyID, otpNumber)
    const multiFactorAssertion =
      PhoneMultiFactorGenerator.assertion(phoneCredential)
    multiFactor(firebaseAuth?.currentUser)
      .enroll(multiFactorAssertion, 'personel number')
      .then(() => {
        toast.success('MFA enabled')
        setEnrol()
        // router.reload()
      })
      .catch((error) => {
        handleError(error)
      })
  }
  const verifyUpdateCode = () => {
    const phoneCredential = PhoneAuthProvider.credential(verifyID, otpNumber)

    updatePhoneNumber(firebaseAuth?.currentUser, phoneCredential)
      .then(() => {
        toast.success('Phone number added successfully!')
        dispatch(setUserData({ phoneNumber: getValues('phone_number') }))
        setIsOpen(false)

        // router.reload()
      })
      .catch((err) => {
        handleError(err)
      })
  }
  const getEnroll = (type) => {
    const mfaLen = multiFactor(firebaseAuth.currentUser).enrolledFactors
    return mfaLen.some(data => data.factorId === type)
  }
  const setEnrol = () => {
    if (firebaseAuth?.currentUser) {
      const mfaLen = multiFactor(firebaseAuth.currentUser).enrolledFactors
        .length
      setEnrolLen(mfaLen)
    }
  }
  useEffect(() => {
    if (firebaseAuth?.currentUser) {
      setEnrol()
    }
  }, [])

  useEffect(() => {
    const appVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
      },
      firebaseAuth,
    )
    window.recaptchaVerifier = appVerifier
  }, [])

  return (
    <UserSettingsLayout>
      <div>
        <div className="md:grid md:grid-cols-9 md:gap-24 ">
          <div className="mt-5 mb-16 md:mb-0 md:mt-0 md:col-span-5">
            <div className="sm:pb-5">
              <span className="block text-lg font-medium text-gray-700">
                Update your number
                <span className="block text-sm font-normal text-gray-500">
                  We will send a code to your mobile number to verify your
                  account.
                </span>
              </span>
            </div>
            {currentUser?.providerUserInfo?.[0]?.providerId === 'google.com' ? (
              <div
                className="flex py-1 mb-2 text-sm text-red-500 rounded-lg"
                role="alert"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 inline w-5 h-5 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Info</span>
                <div>
                  {' '}
                  This feature is currently only active for users who sign in
                  with email and password.
                </div>
              </div>

            ) : !currentUser?.emailVerified ? (
              <div className="py-2">
                <div
                  className={`flex px-2 md:pr-10 md:pl-6 mt-2 text-sm ${msg.type === 'success'
                    ? 'text-green-700'
                    : msg.type === 'error'
                      ? 'text-red-700'
                      : 'text-blue-700'
                    } rounded-lg`}
                  role="alert"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 inline w-5 h-5 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Info</span>
                  <div>
                    <span className="font-medium">
                      {msg.type
                        ? msg.content
                        : 'Verify your email address to use the multi factor features.'}
                    </span>
                  </div>
                </div>
                <div className="flex justify-end mt-2">
                  <ButtonWLoading
                    isPending={loading}
                    onClick={verifyMailHandler}
                    disabled={loading ? true : false}
                    text="Verify"
                    type="button"
                  />
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(updatePhoneNumberMFA)}>

                <>
                  <InputMain className="relative border-none sm:pb-2 sm:gap-1">
                    <InputMain.Label
                      label="Password"
                      htmlFor="password"
                      required
                    />
                    <Controller
                      name={'password'}
                      control={control}
                      render={({ field }) => {
                        return (

                          <div className='relative \ mt-1'>
                            <div className='relative flex items-center mt-1'>

                              <InputMain.Input
                                id="password"
                                name="password"
                                type={passwordVisible ? 'text' : 'password'}
                                autoComplete="current-password"
                                // required
                                className="block  w-full py-3 placeholder-gray-400  rounded-md shadow-sm appearance-none focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                // onChange={handleChange}
                                placeholder="Enter current password"
                                inputClassName="md:h-11"
                                // error={errors['password']?.message}
                                {...field}
                              />
                              <span
                                className="absolute cursor-pointer right-3 mr-2"
                                onClick={() => setPasswordVisible(!passwordVisible)}
                              >
                                {!passwordVisible ? (
                                  <EyeOffIcon className="w-6 h-6 text-gray-400" />
                                ) : (
                                  <EyeIcon className="w-6 h-6 text-gray-400" />
                                )}
                              </span>
                            </div>
                            {errors['password']?.message && (
                              <div className="mt- text-xs text-red-600 text-start">
                                <span className="text-xs text-red-600 ">{errors['password']?.message}</span>
                              </div>
                            )}
                          </div>
                        )
                      }}
                    />
                  </InputMain>
                  <InputMain className="relative border-none sm:pb-2 sm:gap-1">
                    <InputMain.Label
                      label="Phone Number"
                      htmlFor="phone_number"
                      required
                    />
                    <Controller
                      name={'phone_number'}
                      control={control}
                      render={({ field }) => {
                        return (
                          <>
                            <PhoneInput
                              international
                              defaultCountry="IN"
                              countryCallingCodeEditable={false}
                              placeholder="Enter phone number"
                              className="w-full pt-3 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-bright-gray"
                              // value={phone}
                              {...field}
                            // onChange={setPhone}
                            />
                            {errors['phone_number']?.message && (
                              <div className="mt-2 text-xs text-red-600 text-start">
                                <span className="text-xs text-red-600 ">{errors['phone_number']?.message}</span>
                              </div>
                            )}
                          </>
                        )
                      }}
                    />
                  </InputMain>


                  <div
                    className={`flex py-2 mb-2 text-sm ${enrolLen > 0 ? 'text-green-500' : 'text-yellow-500'
                      } rounded-lg`}
                    role="alert"
                  >
                    <svg
                      aria-hidden="true"
                      className="flex-shrink-0 inline w-5 h-5 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                      {enrolLen > 0
                        ? 'The multi factor authentication operation is currently open.'
                        : 'The multi factor authentication operation is currently closed. We recommend used it for safety.'}
                    </div>
                  </div>  
                  {phoneErrorMessage && (
                    <div
                      className="flex py-1 mb-2 text-sm text-red-500 rounded-lg"
                      role="alert"
                    >
                      <svg
                        aria-hidden="true"
                        className="flex-shrink-0 inline w-5 h-5 mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="sr-only">Info</span>
                      <div>{phoneErrorMessage}</div>
                    </div>
                  )}

                  <div className="flex justify-end gap-3 mt-10 border-none">
                    {currentUser?.phoneNumber &&
                      currentUser?.emailVerified &&
                      (!getEnroll("phone")) && (
                        <ButtonWLoading
                          isPending={mfaLoading}
                          disabled={mfaLoading ? true : false}
                          onClick={enableMfa}
                          text="Enable MFA"
                          type="button"
                        />
                      )}
                    {
                      currentUser?.emailVerified &&
                      (!getEnroll("totp")) && (
                        <ButtonWLoading
                          isPending={totpLoading}
                          disabled={totpLoading ? true : false}
                          onClick={enableTotp}
                          text="Enable TOTP"
                          type="button"
                        />
                      )}

                    {currentUser?.phoneNumber &&
                      currentUser?.emailVerified &&
                      getEnroll("phone") && (
                        <ButtonWLoading
                          isPending={mfaLoading}
                          disabled={mfaLoading ? true : false}
                          onClick={disableMfa}
                          text="Disable MFA"
                          type="button"
                        />
                      )}
                    {
                      currentUser?.emailVerified &&
                      getEnroll("totp") && (
                        <ButtonWLoading
                          isPending={totpLoading}
                          disabled={totpLoading ? true : false}
                          onClick={disableTotp}
                          text="Disable TOTP"
                          type="button"
                        />
                      )}

                    <ButtonWLoading
                      isPending={loading}
                      // disabled={errors}
                      // onClick={updatePhoneNumberMFA}
                      text="Update"
                      type="submit"
                    />
                  </div>
                </>
              </form>

            )}

            <div id="recaptcha-container222" ref={captchaContainer}>
              <div id="recaptcha-container"></div>
            </div>
            <OtpModal
              setQrcode={setQrcode}
              qrcode={qrCode}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              handleOnChange={handleOnChange}
              handler={type === 'mfa' ? verifymfacode : type === "TOTP" ? verifyTotpCode : verifyUpdateCode}
              allowedCharacters={allowedCharacters}
              otpNumber={otpNumber}
            />
          </div>
        </div>
      </div>
    </UserSettingsLayout>
  )
}

export default UserSettingsMfaSection
