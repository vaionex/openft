import { PlayCircleIcon } from '@/components/common/icons'
import { ChevronRightIcon } from '@heroicons/react/solid'
import NextLink from 'next/link'
import { twMerge } from 'tailwind-merge'
import Image from 'next/image'
import { ArrowRightIcon } from '@heroicons/react/outline'

const HeroSection = () => {
  return (
    <div className="pt-10 sm:pt-16 lg:pt-16 lg:pb-24 lg:overflow-hidden ">
      <div className="mx-auto max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="max-w-md px-4 mx-auto sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center lg:z-50">
            <div className="lg:py-24">
              <NextLink href="#">
                <a className="inline-flex items-center p-1 pr-2 text-blue-700 bg-blue-50 rounded-full sm:text-base lg:text-sm xl:text-base hover:text-blue-600">
                  <span className="px-3 py-0.5 bg-white text-blue-700 text-xs font-medium leading-5 uppercase tracking-wide rounded-full">
                    What’s new?
                  </span>
                  <span className="ml-4 text-sm font-medium">
                    Instantly mint music NFT
                  </span>
                  <ArrowRightIcon
                    className="w-4 h-4 ml-1 text-blue-700"
                    aria-hidden="true"
                  />
                </a>
              </NextLink>
              <h1 className="mt-4 text-4xl tracking-[-2%] sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl xl:leading-[72px]">
                The new beyond-creative NFT Exchange.
              </h1>
              <p className="text-base mt-6 sm:text-xl lg:max-w-[30rem] lg:text-lg xl:text-xl">
                Openft is a next-gen open source NFT Exchange marketplace that
                anyone can contribute to develop or use this marketplace as
                their framework.
              </p>
              <div className="mt-10 sm:flex sm:gap-3 sm:justify-center lg:justify-start">
                <div className="mt-3 rounded-md sm:mt-0">
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-7 py-4 border border-gray-200 text-gray-600 text-base font-medium rounded-md bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                  >
                    <PlayCircleIcon
                      className="w-5 h-5 mr-2"
                      aria-hidden="true"
                    />
                    Demo
                  </a>
                </div>
                <div className="rounded-md">
                  <a
                    href="#"
                    className={twMerge(
                      'btn-primary',
                      'w-full flex items-center justify-center px-7 py-4 border border-transparent text-base font-medium rounded-md text-white 0 md:py-4 md:text-lg md:px-10 ',
                    )}
                  >
                    Sign up
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
            <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0 rounded-3xl overflow-hidden">
              <Image
                src="/images/home-hero.png"
                alt="openft hero image"
                width="576"
                height="640"
                layout="responsive"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
