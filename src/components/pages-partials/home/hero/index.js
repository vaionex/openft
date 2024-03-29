import { PlayCircleIcon } from '@/components/common/icons'
import userSelector from '@/redux/selectors/user'
import { ArrowRightIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import NextLink from 'next/link'
import { useSelector } from 'react-redux'
import { twMerge } from 'tailwind-merge'

const HeroSection = () => {
  const { isAuthenticated } = useSelector(userSelector)
  return (
    <div className="pt-10 sm:pt-6 lg:pt-10 lg:pb-8 lg:overflow-hidden ">
      <div className="mx-auto max-w-7xl lg:px-6">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="max-w-md px-4 mx-auto sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center lg:z-20">
            <div className="lg:py-8">
              <NextLink href="https://github.com/vaionex/openft">
                <a className="inline-flex items-center p-1 pr-2 rounded-full text-ocean-blue bg-blue-50 sm:text-base lg:text-sm xl:text-base hover:text-blue-600">
                  <span className="px-3 py-0.5 text-sm bg-white text-ocean-blue font-medium leading-5 tracking-wide rounded-full">
                    It&apos;s free!
                  </span>
                  <span className="ml-4 text-sm font-medium text-ocean-blue">
                    Github Code
                  </span>
                  <ArrowRightIcon
                    className="w-4 h-4 ml-1 text-blue-700"
                    aria-hidden="true"
                  />
                </a>
              </NextLink>
              <h1 className="mt-4 text-4xl text-mirage tracking-[-2%] sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl xl:leading-[72px]">
                The new beyond-creative NFT Exchange.
              </h1>
              <p className="text-base mt-6 text-mist sm:text-xl lg:max-w-[30rem] lg:text-lg xl:text-xl">
                Nftana is a next-gen open source NFT Exchange marketplace that
                anyone can contribute to develop or use this marketplace as
                their framework.
              </p>
              <div className="mt-10 sm:flex sm:gap-3 sm:justify-center lg:justify-start">
                <div className="my-3 rounded-md sm:my-0">
                  <NextLink href="/discover">
                    <a className="flex items-center justify-center w-full py-4 text-base font-medium text-river-bed bg-white border border-gray-200 rounded-md px-7 hover:bg-gray-50 md:py-[15px] md:text-lg md:px-8">
                      <PlayCircleIcon
                        className="w-5 h-5 mr-2"
                        aria-hidden="true"
                      />
                      Explore
                    </a>
                  </NextLink>
                </div>
                {!isAuthenticated && (
                  <div className="rounded-md">
                    <NextLink href="/register">
                      <a
                        className={twMerge(
                          'w-full flex items-center justify-center px-7 py-4 border border-transparent text-base font-medium rounded-md text-white bg-azul hover:bg-ultramarine md:py-[15px] md:text-lg md:px-7 ',
                        )}
                      >
                        Sign up
                      </a>
                    </NextLink>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="px-4 mt-16 mb-8 md:pr-0 sm:my-16 lg:my-4">
            <div className="relative px-4 mx-auto overflow-hidden max-w-lg h-[480px] sm:h-[600px] lg:max-w-[600px] sm:px-6 lg:px-0 rounded-3xl bg-white">
              <Image
                src={`/images/hero3.webp`}
                className="rounded-3xl"
                alt="Nftana hero image"
                layout='fill'
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
