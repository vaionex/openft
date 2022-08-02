import { PlayCircleIcon } from '@/components/common/icons'
import { ArrowRightIcon } from '@heroicons/react/outline'
import { ChevronRightIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import NextLink from 'next/link'
import { twMerge } from 'tailwind-merge'

const CtaMidSection = () => {
  return (
    <div className="pt-10 sm:pt-16 lg:pt-16 lg:pb-24 lg:overflow-hidden ">
      <div className="mx-auto max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="max-w-md px-4 mx-auto sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center lg:z-50">
            <div className="lg:py-24">
              <h2 className="mt-4 text-4xl tracking-[-2%] sm:mt-5 sm:text-6xl lg:mt-6 xl:text-5xl xl:leading-tight">
                Create your own next-gen NFTs instantly.
              </h2>
              <p className="text-base mt-6 sm:text-xl lg:max-w-[30rem] lg:text-lg xl:text-xl">
                Upload your work (image, video, audio, or 3D art), add a title
                and description, and customize your NFTs with properties, stats,
                and unlockable content.
              </p>
              <div className="mt-10 sm:flex sm:gap-3 sm:justify-center lg:justify-start">
                <div className="mt-3 rounded-md sm:mt-0">
                  <a
                    href="#"
                    className="flex items-center justify-center w-full py-4 text-base font-medium text-gray-600 bg-white border border-gray-200 rounded-md px-7 hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                  >
                    Learn More
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
            <div className="max-w-md px-4 mx-auto overflow-hidden sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0 rounded-3xl">
              <Image
                src="/images/home-cta.png"
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

export default CtaMidSection
