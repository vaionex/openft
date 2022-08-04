import React, { useRef } from 'react'
import FormInput from '../form-input'

const ContributeForm = () => {
  const firstName = useRef('')
  const lastName = useRef('')
  const email = useRef('')
  const request = useRef('')
  const company = useRef('')
  const isPolicyAccepted = useRef(false)

  return (
    <div className="min-h-full flex flex-col justify-center py-12 px-6 lg:px-8 gap-4">
      <div>
        <h1 className="text-gray-900 text-2xl">Contribute</h1>
        <p className="text-gray-500">
          Submit your request details in the form below.
        </p>
      </div>
      <FormInput
        label={'First Name'}
        id="fname"
        name="fname"
        type="text"
        // autoComplete="email"
        ref={firstName}
        required
        className="w-full p-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        placeholder="First name"
      />
      <FormInput
        label={'Last Name'}
        id="lname"
        name="lname"
        type="text"
        // autoComplete="email"
        ref={lastName}
        required
        className="block w-full p-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        placeholder="Last name"
      />

      <FormInput
        label={'Email'}
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        ref={email}
        required
        className="block w-full p-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        placeholder="your@company.com"
      />
      <FormInput
        label={'Company'}
        id="company"
        name="company"
        type="text"
        ref={company}
        // autoComplete="email"
        required
        className="block w-full p-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        placeholder="Your company"
      />

      <div>
        <label
          htmlFor={'request'}
          className="block text-sm font-medium text-gray-700"
        >
          {'Your request'}
        </label>
        <textarea
          id="request"
          name="request"
          className={
            'w-full p-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-primary focus:border-primary sm:text-sm'
          }
          placeholder="Type you request..."
          ref={request}
        />
      </div>

      <div className="form-check">
        <input
          className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          type="checkbox"
          id="privacyCheckbox"
          ref={isPolicyAccepted}
        />
        <label
          className="form-check-label inline-block text-gray-500 text-sm"
          htmlFor="privacyCheckbox"
        >
          You agree to our friendly <a>privacy policy</a>
        </label>
      </div>
      <button className="btn-primary py-2.5 flex w-full border-none justify-center items-center font-normal">
        Send message
      </button>
    </div>
  )
}

export default ContributeForm
