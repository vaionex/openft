import { PlayCircleIcon } from '@/components/common/icons'
import { ArrowRightIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import NextLink from 'next/link'
import { twMerge } from 'tailwind-merge'

const HeroSection = () => {
  return (
    <div className="pt-10 sm:pt-16 lg:pt-16 lg:pb-24 lg:overflow-hidden ">
      <div className="mx-auto max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="max-w-md px-4 mx-auto sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center lg:z-50">
            <div className="lg:py-16">
              <NextLink href="#">
                <a className="inline-flex items-center p-1 pr-2 text-blue-700 rounded-full bg-blue-50 sm:text-base lg:text-sm xl:text-base hover:text-blue-600">
                  <span className="px-3 py-0.5 bg-white text-blue-700 font-medium leading-5 tracking-wide rounded-full">
                    It&apos;s free!
                  </span>
                  <span className="ml-4 text-sm font-medium">
                    Mint and sell NFTs
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
                <div className="my-3 rounded-md sm:my-0">
                  <a
                    href="#"
                    className="flex items-center justify-center w-full py-4 text-base font-medium text-gray-600 bg-white border border-gray-200 rounded-md px-7 hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                  >
                    <PlayCircleIcon
                      className="w-5 h-5 mr-2"
                      aria-hidden="true"
                    />
                    Demo
                  </a>
                </div>
                <div className="rounded-md">
                  <NextLink href="/register">
                    <a
                      className={twMerge(
                        'btn-primary',
                        'w-full flex items-center justify-center px-7 py-4 border border-transparent text-base font-medium rounded-md text-white 0 md:py-4 md:text-lg md:px-10 ',
                      )}
                    >
                      Sign up
                    </a>
                  </NextLink>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 mt-16 mb-8 sm:my-16 lg:my-0">
            <div className="relative px-4 mx-auto overflow-hidden max-w-lg h-[480px] sm:h-[640px] lg:max-w-[576px] sm:px-6 lg:px-0 rounded-3xl">
              <Image
                src="/images/home-hero.png"
                className="w-full h-full"
                alt="openft hero image"
                layout="fill"
                quality={100}
                objectFit="cover"
                priority={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
