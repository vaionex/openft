import NextLink from 'next/link'
import { InputMain } from '@/components/ui/inputs'
import { Controller, useForm } from 'react-hook-form'
import useYupValidationResolver from '@/hooks/useYupValidationResolver'
import validationSchema from './validationScheme'
import { createRef, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import ButtonWLoading from '@/components/ui/button-w-loading'
import ReCAPTCHA from 'react-google-recaptcha'

import { firebaseAddDocWithRandomID } from '@/firebase/utils'
import { toast } from 'react-toastify'

export default function Form() {
  const textAreaRef = useRef(null)
  const recaptchaRef = createRef()
  const [captcha, setCaptcha] = useState('')
  const [submitCounter, setSubmitCounter] = useState(0)
  const [checked, setChecked] = useState(false)
  const [message, setMessage] = useState(false)
  const resolver = useYupValidationResolver(validationSchema)
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver,
  })

  const onReCAPTCHAChange = (captchaCode) => {
    if (!captchaCode) {
      return
    }
    setCaptcha(captchaCode)
  }

  const onSubmit = async (formData) => {
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
    const data = {
      company: formData.company,
      email: formData?.email,
      first_name: formData['first-name'],
      last_name: formData['last-name'],
      message: formData?.message,
    }
    await firebaseAddDocWithRandomID('contact', data)
    setMessage({
      msg: 'Thanks for reaching out 🎉. One of our representative will reach out to you shortly',
      type: 'success',
    })
    // form reset
    resetAllData()
  }

  const resetAllData = () => {
    reset({
      'first-name': '',
      'last-name': '',
      email: '',
      company: '',
    })
    textAreaRef.current.value = ''
    setChecked(false)
    setCaptcha('')
    if (submitCounter >= 5) {
      setSubmitCounter(0)
    }

    setTimeout(() => {
      setMessage(false)
    }, 5000)
  }
  return (
    <div className="min-h-full px-4 mx-auto max-w-7xl sm:px-6  2xl:mt-14">
      <div className="lg:grid-cols-2 lg:grid lg:gap-x-16 xl:gap-x-[112px]">
        <div className="relative hidden mt-12 sm:max-w-lg xl:max-w-[576px] min-h-[816px] sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:block 2xl:flex 2xl:items-center ">
          <div className="relative w-full h-full mx-auto">
            <Image
              className="relative object-cover block w-full h-full overflow-hidden bg-white rounded-3xl"
              src="/images/contact-page.webp"
              alt=""
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center px-0 sm:text-center lg:text-left ">
          <div className="">
            <div className="max-w-md mx-auto sm:max-w-lg xl:max-w-[480px] lg:mx-0">
              <h2 className="text-3xl text-mirage font-semibold tracking-tight sm:text-4xl">
                Contact us
              </h2>
              <p className="mt-4 text-lg text-mist sm:mt-3">
                Ask everything about how Nftana can work for you.
              </p>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 mt-9 gap-y-3 sm:grid-cols-2 sm:gap-x-8"
              >
                <div>
                  <InputMain className="relative pb-2 border-none sm:gap-1">
                    <InputMain.Label
                      label="First name"
                      htmlFor="first-name"
                      required
                    />
                    <Controller
                      name={'first-name'}
                      control={control}
                      render={({ field }) => {
                        return (
                          <InputMain.Input
                            id="first-name"
                            className="sm:col-span-2"
                            inputClassName="md:h-11"
                            placeholder="First name"
                            onChange={() => {}}
                            error={errors['first-name']?.message}
                            {...field}
                          />
                        )
                      }}
                    />
                  </InputMain>
                </div>
                <div>
                  <InputMain className="relative border-none sm:pb-2 sm:gap-1">
                    <InputMain.Label
                      label="Last name"
                      htmlFor="last-name"
                      required
                    />
                    <Controller
                      name={'last-name'}
                      control={control}
                      render={({ field }) => {
                        return (
                          <InputMain.Input
                            id="last-name"
                            className="sm:col-span-2"
                            inputClassName="md:h-11"
                            placeholder="Last name"
                            onChange={() => {}}
                            error={errors['last-name']?.message}
                            {...field}
                          />
                        )
                      }}
                    />
                  </InputMain>
                </div>
                <div className="sm:col-span-2">
                  <InputMain className="relative border-none justify-items-start sm:pb-2 sm:gap-1">
                    <InputMain.Label label="Email" htmlFor="email" required />
                    <Controller
                      name={'email'}
                      control={control}
                      render={({ field }) => {
                        return (
                          <InputMain.Input
                            id="email"
                            className="w-full sm:col-span-2"
                            inputClassName="md:h-11"
                            placeholder="you@company.com"
                            onChange={() => {}}
                            error={errors['email']?.message}
                            {...field}
                          />
                        )
                      }}
                    />
                  </InputMain>
                </div>
                <div className="sm:col-span-2">
                  <InputMain className="relative border-none justify-items-start sm:pb-2 sm:gap-1">
                    <InputMain.Label
                      label="Company"
                      htmlFor="company"
                      required
                    />
                    <Controller
                      name={'company'}
                      control={control}
                      render={({ field }) => {
                        return (
                          <InputMain.Input
                            id="company"
                            className="w-full sm:col-span-2"
                            inputClassName="md:h-11"
                            placeholder="Your company"
                            onChange={() => {}}
                            error={errors['company']?.message}
                            {...field}
                          />
                        )
                      }}
                    />
                  </InputMain>
                </div>
                <div className="sm:col-span-2">
                  <InputMain className="relative border-none justify-items-start sm:pb-2 sm:gap-1">
                    <InputMain.Label
                      label="Ask everything"
                      htmlFor="message"
                      required
                    />
                    <Controller
                      name={'message'}
                      control={control}
                      render={({ field }) => {
                        return (
                          <InputMain.Textarea
                            id="message"
                            className="w-full"
                            placeholder="Type here..."
                            rows={6}
                            onChange={() => {}}
                            error={errors['message']?.message}
                            {...field}
                            ref={textAreaRef}
                          />
                        )
                      }}
                    />
                  </InputMain>
                </div>
                <div className="relative flex  my-2 sm:col-span-2">
                  <div className="flex items-center h-4 sm:h-5 ">
                    <Controller
                      name={'privacy'}
                      control={control}
                      render={({ field }) => {
                        return (
                          <InputMain.Input
                            id="privacy"
                            type="checkbox"
                            checked={checked}
                            inputContainer={'sm:w-5 w-4'}
                            inputClassName="cursor-pointer w-4 sm:w-5 w-4 sm:h-5 text-blue-600 rounded-md border-gray-300 focus:ring-blue-500"
                            onClick={() => setChecked(!checked)}
                            error={errors['privacy']?.message}
                            {...field}
                          />
                        )
                      }}
                    />
                  </div>
                  <div
                    className={`ml-8 ${
                      errors['privacy']?.message ? '-mt-2.5' : ''
                    } inset-0 absolute text-sm text-left`}
                  >
                    <label htmlFor="privacy" className="font-medium text-mist">
                      You agree to our friendly{' '}
                    </label>
                    <NextLink href="/privacy">
                      <a
                        id="privacy-policy"
                        className="font-medium underline text-mist"
                      >
                        privacy policy.
                      </a>
                    </NextLink>
                  </div>
                </div>
                {submitCounter >= 5 ? (
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    onChange={onReCAPTCHAChange}
                  />
                ) : (
                  ''
                )}
                <div className="sm:col-span-2">
                  <ButtonWLoading type="submit" fullWidth text="Send message" />
                </div>
                {message && (
                  <p
                    className={`text-sm w-full py-2 sm:col-span-2 text-start ${
                      message.type === 'success'
                        ? 'text-green-400'
                        : 'text-red-500'
                    }`}
                  >
                    {message.msg}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
