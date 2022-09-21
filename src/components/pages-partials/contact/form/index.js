import { InputMain } from '@/components/ui/inputs'
import { Controller, useForm } from 'react-hook-form'
import useYupValidationResolver from '@/hooks/useYupValidationResolver'
import validationSchema from './validationScheme'
import { useRef, useState } from 'react'

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
    <div className="relative bg-white overflow-hidden">
      <div className="relative pt-6 pb-16 sm:pb-24 lg:pb-32">
        <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24 sm:px-6 lg:mt-32">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="order-1 py-10 lg:order-2 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <div className="lg:pr-8">
                <div className="max-w-md mx-auto sm:max-w-lg lg:mx-0">
                  <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                    Contact
                  </h2>
                  <p className="mt-4 text-lg text-gray-500 sm:mt-3">
                    Ask everything about how Openft can work for you.
                  </p>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-9 grid grid-cols-1 gap-y-3 sm:grid-cols-2 sm:gap-x-8"
                  >
                    <div>
                      <InputMain className="border-none pb-2 relative">
                        <InputMain.Label
                          label="First name"
                          htmlFor="first-name"
                        />
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
                                required
                                {...field}
                              />
                            )
                          }}
                        />
                        <span className="absolute text-[11px] text-red-600 -bottom-2 sm:-bottom-2 text-start ">
                          {errors['first-name']?.message}
                        </span>
                      </InputMain>
                    </div>
                    <div>
                      <InputMain className="border-none sm:pb-2 relative">
                        <InputMain.Label
                          label="Last name"
                          htmlFor="last-name"
                        />
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
                                required
                                {...field}
                              />
                            )
                          }}
                        />
                        <span className="absolute text-[11px] text-red-600 -bottom-2 sm:-bottom-2 text-start ">
                          {errors['last-name']?.message}
                        </span>
                      </InputMain>
                    </div>
                    <div className="sm:col-span-2">
                      <InputMain className="border-none justify-items-start sm:pb-2 relative">
                        <InputMain.Label label="Email" htmlFor="email" />
                        <Controller
                          name={'email'}
                          control={control}
                          render={({ field }) => {
                            return (
                              <InputMain.Input
                                id="email"
                                className="sm:col-span-2 w-full"
                                placeholder="you@company.com"
                                onChange={() => {}}
                                required
                                {...field}
                              />
                            )
                          }}
                        />
                        <span className="absolute text-[11px] text-red-600 -bottom-2 sm:-bottom-2 text-start ">
                          {errors['email']?.message}
                        </span>
                      </InputMain>
                    </div>
                    <div className="sm:col-span-2">
                      <InputMain className="border-none justify-items-start sm:pb-2 relative">
                        <InputMain.Label label="Company" htmlFor="company" />
                        <Controller
                          name={'company'}
                          control={control}
                          render={({ field }) => {
                            return (
                              <InputMain.Input
                                id="company"
                                className="sm:col-span-2 w-full"
                                placeholder="Your company"
                                onChange={() => {}}
                                required
                                {...field}
                              />
                            )
                          }}
                        />
                        <span className="absolute text-[11px] text-red-600 -bottom-2 sm:-bottom-2 text-start ">
                          {errors['company']?.message}
                        </span>
                      </InputMain>
                    </div>
                    <div className="sm:col-span-2">
                      <div className="flex justify-start">
                        <label
                          htmlFor="how-can-we-help"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Your request
                        </label>
                      </div>
                      <div className="sm:mt-4">
                        <textarea
                          ref={textAreaRef}
                          id="how-can-we-help"
                          name="how-can-we-help"
                          aria-describedby="how-can-we-help-description"
                          rows={4}
                          required
                          className="block w-full shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500 border border-gray-300 rounded-md"
                          defaultValue={''}
                          placeholder="Type your request ..."
                        />
                      </div>
                    </div>
                    <div className="relative flex items-start sm:col-span-2">
                      <div className="flex items-center h-5">
                        <Controller
                          name={'privacy'}
                          control={control}
                          render={({ field }) => {
                            return (
                              <input
                                id="privacy"
                                aria-describedby="privacy-policy"
                                name="privacy"
                                type="checkbox"
                                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                                {...field}
                              />
                            )
                          }}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="privacy"
                          className="font-medium text-gray-700"
                        >
                          You agree to our friendly{' '}
                        </label>
                        <a
                          id="privacy-policy"
                          href="#"
                          className="font-medium underline"
                        >
                          privacy policy.
                        </a>
                      </div>
                      <span className="absolute text-[11px] text-red-600 -bottom-3 sm:-bottom-3 text-start ">
                        {errors['privacy']?.message}
                      </span>
                    </div>

                    <div className="text-right sm:col-span-2">
                      <button className="btn-primary py-2.5 flex w-full border-none justify-center items-center font-normal">
                        Send message
                      </button>
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
            <div className="order-2 lg:order-1 mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full h-full rounded-3xl shadow-lg lg:max-w-md">
                <img
                  className="relative block w-full h-full bg-white rounded-3xl overflow-hidden"
                  src="/images/contact-page.webp"
                  alt=""
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
