import SharedLayout from '@/components/layout/shared-layout'
import React from 'react'
import Image from 'next/image'
import {
  BlockIcon,
  CodeIcon,
  DirectionIcon,
  DocIcon,
} from '@/components/common/icons'
import NextLink from 'next/link'

const list = [
  {
    name: 'Where can I get the Nftana source code?',
    description:
      'We developed the code in public, and the code is available for download at https://github.com/vaionex/openft.',
    icon: <CodeIcon className="w-12 h-12" />,
  },
  {
    name: 'What do I need to run the code?',
    description:
      'All you need is a free firebase setup, and a Relysia.com project ServiceId. Additional optional features are algolia search and novu notifications.',
    icon: <DirectionIcon className="w-12 h-12" />,
  },
  {
    name: 'What is not allowed on Nftana?',
    description:
      'Do not infringe copyrights of other artists, stay friendly and keep it safe for work. You can clone the code and create your own variant of the platform with different rules.',
    icon: <BlockIcon className="w-12 h-12" />,
  },
  {
    name: 'How does it work?',
    description:
      'Each sale is a atomic swap on the BSV blockchain, which the counter party can take without the risk of loosing money without receiving the NFT.',
    icon: <DocIcon className="w-12 h-12" />,
  },
]

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

      <div className="py-24">
        <section className="max-w-2xl px-4 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 ">
          <div className="max-w-3xl">
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-xl text-gray-500">
              Everything you need to know about the Nftana and how to get the
              source code. Can’t find the answer you’re looking for? Please{' '}
              <NextLink href="/contact">
                <a className="underline">ask to our friendly team.</a>
              </NextLink>
            </p>
          </div>
        </section>

        <section className="max-w-2xl px-4 mx-auto mt-16 mb-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="grid items-center grid-cols-1 gap-y-16 gap-x-24 lg:grid-cols-2">
            <ul className="space-y-10">
              {list.map((item) => (
                <li key={item.name} className="flex">
                  <div className="mr-4">{item.icon}</div>
                  <div>
                    <h3 className="mt-2.5 text-lg font-medium text-gray-900">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-base text-gray-500">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="overflow-hidden bg-gray-100 rounded-lg aspect-w-1 aspect-h-1">
              <Image
                src="/images/faq-main.jpg"
                alt="Black kettle with long pour spot and angled body on marble counter next to coffee mug and pour-over system."
                className="object-cover object-center w-full h-full"
                layout="fill"
              />
            </div>
          </div>
        </section>
        <section
          aria-labelledby="faq-contact"
          className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8"
        >
          <div className="relative overflow-hidden rounded-lg ">
            <div className="absolute inset-0 bg-gray-900">
              <Image
                src="/images/faq-bottom.jpg"
                alt=""
                className="object-cover object-center w-full h-full"
                layout="fill"
              />
            </div>
            <div className="relative px-6 py-16 sm:px-12 lg:px-16">
              <div className="relative flex flex-col items-center max-w-3xl mx-auto text-center">
                <h2
                  id="faq-contact"
                  className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
                >
                  Still have questions?
                </h2>
                <p className="mt-5 mb-8 text-xl text-white">
                  Ask everything about how Nftana can work for you.
                </p>
                <div className="flex gap-2">
                  <NextLink href="/docs">
                    <a className="btn-secondary">Docs</a>
                  </NextLink>
                  <NextLink href="/contact">
                    <a className="btn-primary">Contact us</a>
                  </NextLink>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </SharedLayout>
  )
}

export default FAQMain
