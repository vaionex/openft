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
} from 'firebase/auth'
import OtpModal from './otp'

let applicationVer
const UserSettingsMfaSection = () => {
  const [loading, setLoading] = useState(false)
  const [mfaLoading, setMfaLoading] = useState(false)
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [phone, setPhone] = useState(null)
  const [updateType, setUpdateType] = useState(null)
  const [enrolLen, setEnrolLen] = useState(0)
  const [phoneErrorMessage, setPhoneErrorMessage] = useState(null)
  const [verifyID, setVerifyID] = useState(null)
  const captchaContainer = useRef()
  const [msg, setMsg] = useState({
    type: null,
    content: null,
  })
  const { currentUser, isAuthenticated } = useSelector(userSelector)

  const disableMfa = async () => {
    try {
      setMfaLoading(true)
      const options = multiFactor(firebaseAuth.currentUser).enrolledFactors
      await multiFactor(firebaseAuth.currentUser)
        .unenroll(options[0])
        .then(() => router.reload())
    } catch (error) {
      console.log(error)
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
    setUpdateType('mfa')
    setMfaLoading(true)
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

    try {
      await multiFactor(firebaseAuth.currentUser)
        .getSession()
        .then(function (multiFactorSession) {
          const phoneInfoOptions = {
            phoneNumber: currentUser?.phoneNumber,
            session: multiFactorSession,
          }
          const phoneAuthProvider = new PhoneAuthProvider(firebaseAuth)
          phoneAuthProvider
            .verifyPhoneNumber(phoneInfoOptions, applicationVer)
            .then((verificationId) => {
              setVerifyID(verificationId)
              setIsOpen(true)
            })
            .catch((error) => {
              setPhoneErrorMessage(
                'Please login again to be able to perform this operation!',
              )
              applicationVer.render().then(function (widgetId) {
                grecaptcha.reset(widgetId)
              })
            })
        })
        .catch((error) => {
          console.log(error)
        })
    } catch (err) {
      console.log(err)
    } finally {
      setMfaLoading(false)
    }
  }

  const verifyPhone = () => {
    if (isPossiblePhoneNumber(phone)) {
      setUpdateType('mailVerify')
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
        .verifyPhoneNumber(phone, applicationVer)
        .then((verificationId) => {
          setVerifyID(verificationId)
          setIsOpen(true)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  useEffect(() => {
    if (firebaseAuth?.currentUser) {
      const mfaLen = multiFactor(firebaseAuth.currentUser).enrolledFactors
        .length
      setEnrolLen(mfaLen)
    }
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
            {!currentUser?.emailVerified ? (
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
                    class="flex-shrink-0 inline w-5 h-5 mr-3"
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
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clip-rule="evenodd"
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
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clip-rule="evenodd"
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
                    onClick={verifyPhone}
                    text="Update"
                    type="button"
                  />
                </div>
              </>
            )}
            <div id="recaptcha-container222" ref={captchaContainer}>
              <div id="recaptcha-container"></div>
            </div>
            <OtpModal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              router={router}
              verifyID={verifyID}
              setPhoneErrorMessage={setPhoneErrorMessage}
              type={updateType}
            />
          </div>
        </div>
      </div>
    </UserSettingsLayout>
  )
}

export default UserSettingsMfaSection
