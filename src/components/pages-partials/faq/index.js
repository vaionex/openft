import SharedLayout from '@/components/layout/shared-layout'
import React from 'react'
import Image from 'next/image'

const FAQMain = () => {
  return (
    <SharedLayout title="FAQ">
      <div className="relative bg-gray-900">
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <Image
            alt=""
            className="absolute inset-0 object-cover w-full h-full"
            src="/images/faq-hero.jpg"
            layout="fill"
            priority={true}
          />
        </div>

        <div className="relative flex flex-col items-center max-w-4xl px-6 py-24 mx-auto text-center lg:px-0">
          <p className="font-semibold text-gray-200">FAQ</p>
          <h1 className="mt-3 mb-6 text-4xl font-bold tracking-tight text-white lg:text-6xl">
            Everything you need to know
          </h1>
          <p className="max-w-md text-xl text-white">
            Need something cleared up? Here are our most frequently asked
            questions.
          </p>
        </div>
      </div>

      <div className="max-w-2xl px-4 py-24 mx-auto sm:pt-24 sm:pb-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="max-w-3xl">
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Everything you need to know about the Openft and how to get the
            source code. Can’t find the answer you’re looking for? Please ask to
            our friendly team.
          </p>
        </div>
      </div>
    </SharedLayout>
  )
}

export default FAQMain
