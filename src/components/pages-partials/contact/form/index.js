import NextLink from 'next/link'
import { InputMain } from '@/components/ui/inputs'
import { Controller, useForm } from 'react-hook-form'
import useYupValidationResolver from '@/hooks/useYupValidationResolver'
import validationSchema from './validationScheme'
import { useRef, useState } from 'react'
import Image from 'next/image'
import ButtonWLoading from '@/components/ui/button-w-loading'

export default function Form() {
  const textAreaRef = useRef(null)
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

  const onSubmit = (data) => {
    console.log(data)
    reset({ 'first-name': '', 'last-name': '', email: '', company: '' })
    textAreaRef.current.value = ''
    setMessage({
      msg: 'Success! 🎉 Thank you for contacting us!',
      type: 'success',
    })
  }
  return (
    <div className="min-h-full px-4 mx-auto max-w-7xl sm:px-6">
      <div className="lg:grid-cols-2 lg:grid lg:gap-16 min-h-[calc(100vh-(6rem+8rem))]">
        <div className="relative hidden mt-12 sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:block">
          <div className="relative w-full h-full mx-auto ">
            <Image
              className="relative block w-full h-full overflow-hidden bg-white "
              src="/images/contact-page.webp"
              alt=""
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center px-12 sm:text-center lg:text-left">
          <div className="">
            <div className="max-w-md mx-auto sm:max-w-lg lg:mx-0">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Contact
              </h2>
              <p className="mt-4 text-lg text-gray-500 sm:mt-3">
                Ask everything about how Openft can work for you.
              </p>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 mt-9 gap-y-3 sm:grid-cols-2 sm:gap-x-8"
              >
                <div>
                  <InputMain className="relative pb-2 border-none sm:gap-1">
                    <InputMain.Label label="First name" htmlFor="first-name" />
                    <Controller
                      name={'first-name'}
                      control={control}
                      render={({ field }) => {
                        return (
                          <InputMain.Input
                            id="first-name"
                            className="sm:col-span-2"
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
                    <InputMain.Label label="Last name" htmlFor="last-name" />
                    <Controller
                      name={'last-name'}
                      control={control}
                      render={({ field }) => {
                        return (
                          <InputMain.Input
                            id="last-name"
                            className="sm:col-span-2"
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
                    <InputMain.Label label="Email" htmlFor="email" />
                    <Controller
                      name={'email'}
                      control={control}
                      render={({ field }) => {
                        return (
                          <InputMain.Input
                            id="email"
                            className="w-full sm:col-span-2"
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
                    <InputMain.Label label="Company" htmlFor="company" />
                    <Controller
                      name={'company'}
                      control={control}
                      render={({ field }) => {
                        return (
                          <InputMain.Input
                            id="company"
                            className="w-full sm:col-span-2"
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
                    <InputMain.Label label="Ask everything" htmlFor="message" />
                    <Controller
                      name={'message'}
                      control={control}
                      render={({ field }) => {
                        return (
                          <InputMain.Textarea
                            id="message"
                            className="w-full "
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
                <div className="relative flex items-start my-2 sm:col-span-2">
                  <div className="flex items-center h-5 ">
                    <Controller
                      name={'privacy'}
                      control={control}
                      render={({ field }) => {
                        return (
                          <InputMain.Input
                            id="privacy"
                            type="checkbox"
                            inputClassName="cursor-pointer w-4 h-4 text-blue-600 rounded-md border-gray-300 focus:ring-blue-500"
                            onChange={() => {}}
                            error={errors['privacy']?.message}
                            {...field}
                          />
                        )
                      }}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="privacy"
                      className="font-medium text-gray-400"
                    >
                      You agree to our friendly{' '}
                    </label>
                    <NextLink href="/privacy">
                      <a id="privacy-policy" className="font-medium underline">
                        privacy policy.
                      </a>
                    </NextLink>
                  </div>
                </div>

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
