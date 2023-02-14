import UserSettingsLayout from '@/components/layout/user-settings-layout'
import { ArrowLeftIcon } from '@heroicons/react/outline'
import React, { useEffect, useRef, useState } from 'react'
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { firebaseVerifyMail } from '@/firebase/utils'
import { useSelector } from 'react-redux'
import userSelector from '@/redux/selectors/user'
import ButtonWLoading from '@/components/ui/button-w-loading'
import { InputMain } from '@/components/ui/inputs'
import { firebaseAuth } from '@/firebase/init'
import { useRouter } from 'next/router'
import {
  RecaptchaVerifier,
  PhoneAuthProvider,
  multiFactor,
  updatePhoneNumber,
  PhoneMultiFactorGenerator,
} from 'firebase/auth'
import OtpModal from '@/components/ui/otp'
import { toast } from 'react-toastify'

const UserSettingsMfaSection = () => {
  const [loading, setLoading] = useState(false)
  const [mfaLoading, setMfaLoading] = useState(false)
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [allowedCharacters, setAllowedCharacters] = useState('numeric')
  const [otpNumber, setOtpNumber] = useState('')
  const [phone, setPhone] = useState(null)
  const [type, setType] = useState('mfa')
  const [enrolLen, setEnrolLen] = useState(0)
  const [phoneErrorMessage, setPhoneErrorMessage] = useState(null)
  const [verifyID, setVerifyID] = useState(null)

  const [msg, setMsg] = useState({
    type: null,
    content: null,
  })
  const { currentUser, isAuthenticated } = useSelector(userSelector)
  const handleOnChange = (enteredOtp) => {
    setOtpNumber(enteredOtp)
  }
  const disableMfa = async () => {
    try {
      setMfaLoading(true)
      const options = multiFactor(firebaseAuth.currentUser).enrolledFactors
      await multiFactor(firebaseAuth.currentUser)
        .unenroll(options[0])
        .then(() => {
          toast.success('MFA disabled')
          router.reload()
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
    // if (!window.recaptchaVerifier) {
    //   window.recaptchaVerifier = new RecaptchaVerifier(
    //     'recaptcha-container',
    //     {
    //       size: 'invisible',
    //     },
    //     firebaseAuth,
    //   )
    // }

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

  const updatePhoneNumberMFA = () => {
    if (isPossiblePhoneNumber(phone)) {
      setType('phone')

      // if (!window.recaptchaVerifier) {
      //   window.recaptchaVerifier = new RecaptchaVerifier(
      //     'recaptcha-container',
      //     {
      //       size: 'invisible',
      //     },
      //     firebaseAuth,
      //   )
      // }

      try {
        const provider = new PhoneAuthProvider(firebaseAuth)
        provider
          .verifyPhoneNumber(phone, window.recaptchaVerifier)
          .then((verificationId) => {
            setVerifyID(verificationId)
            setIsOpen(true)
          })
          .catch((err) => {
            console.log('err 111', err)
            if (err.code === 'auth/invalid-phone-number') {
              toast.error('Invalid phone number')
            } else if (err.code == 'auth/code-expired') {
              toast.error('Code expired')
            }
            // window.recaptchaVerifier.render().then(function (widgetId) {
            //   grecaptcha.reset(widgetId)
            // })
          })
      } catch (err) {
        console.log('err 44', err)
        // window.recaptchaVerifier.render().then(function (widgetId) {
        //   grecaptcha.reset(widgetId)
        // })
      }
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

        router.reload()
      })
      .catch((error) => {
        console.log('err 2', error)

        if (error.code == 'auth/requires-recent-login') {
          console.log('eeeeeeeeeee')
        } else if (error.code == 'auth/invalid-verification-code') {
          toast.error('Invalid verification code')
        }
      })
  }

  const verifyUpdateCode = () => {
    const phoneCredential = PhoneAuthProvider.credential(verifyID, otpNumber)

    updatePhoneNumber(firebaseAuth?.currentUser, phoneCredential)
      .then(() => {
        toast.success('Phone number added successfully!')
        router.reload()
      })
      .catch((err) => {
        if (err.code == 'auth/account-exists-with-different-credential') {
          setPhoneErrorMessage(
            'Please login again to be able to perform this operation!',
          )
        } else if (err.code == 'auth/invalid-verification-code') {
          toast.error('Invalid verification code')
        } else if (err.code == 'auth/code-expired') {
          toast.error('Code expired')
        }
        console.log('err 999', err)
      })
  }

  useEffect(() => {
    if (firebaseAuth?.currentUser) {
      const mfaLen = multiFactor(firebaseAuth.currentUser).enrolledFactors
        .length
      setEnrolLen(mfaLen)
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
            <div className="sm:border-b sm:border-gray-200 sm:pb-5">
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
                  className={`flex px-2 md:pr-10 md:pl-6 mt-2 text-sm ${
                    msg.type === 'success'
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
                        : 'Verify your email address to use the multi factor feature.'}
                    </span>
                  </div>
                </div>
                <div className="mt-2 flex justify-end">
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
              <>
                <InputMain className="sm:flex sm:justify-between sm:gap-8 mt-5">
                  <InputMain.Label
                    label="Phone Number"
                    htmlFor="name"
                    className="sm:w-[280px]"
                  />
                  <div className="mt-1 sm:mt-0 sm:w-full sm:max-w-[666px]">
                    <InputMain.Input
                      id="name"
                      className="sm:col-span-2"
                      placeholder={currentUser?.phoneNumber}
                      onChange={() => {}}
                      inputContainer="md:h-11"
                      disabled={true}
                    />
                  </div>
                </InputMain>
                <div className="flex mt-10 rounded-md">
                  <PhoneInput
                    international
                    defaultCountry="US"
                    countryCallingCodeEditable={false}
                    placeholder="Enter phone number"
                    className="focus:ring-blue-500 focus:border-blue-500 w-full sm:text-sm border-[#EAECF0]  rounded-md"
                    value={phone}
                    onChange={setPhone}
                  />
                </div>

                <div
                  className={`flex py-2 mb-2 text-sm ${
                    enrolLen > 0 ? 'text-green-500' : 'text-yellow-500'
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

                <div className="flex justify-end gap-3 border-none mt-10">
                  {currentUser?.phoneNumber &&
                    currentUser?.emailVerified &&
                    enrolLen === 0 && (
                      <ButtonWLoading
                        isPending={mfaLoading}
                        disabled={mfaLoading ? true : false}
                        onClick={enableMfa}
                        text="Enable MFA"
                        type="button"
                      />
                    )}

                  {currentUser?.phoneNumber &&
                    currentUser?.emailVerified &&
                    enrolLen > 0 && (
                      <ButtonWLoading
                        isPending={mfaLoading}
                        disabled={mfaLoading ? true : false}
                        onClick={disableMfa}
                        text="Disable MFA"
                        type="button"
                      />
                    )}

                  <ButtonWLoading
                    isPending={loading}
                    disabled={
                      loading ||
                      !phone ||
                      (phone && !isPossiblePhoneNumber(phone))
                        ? true
                        : false
                    }
                    onClick={updatePhoneNumberMFA}
                    text="Update"
                    type="button"
                  />
                </div>
              </>
            )}

            <div id="recaptcha-container"></div>

            <OtpModal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              handleOnChange={handleOnChange}
              handler={type === 'mfa' ? verifymfacode : verifyUpdateCode}
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
