import Image from 'next/image'
import NextLink from 'next/link'
import { twMerge } from 'tailwind-merge'
import { useSelector } from 'react-redux'
import userSelector from '@/redux/selectors/user'

const NftsInstantly = ({
  discover = true,
  getStarted = true,
  isHomePage = true,
}) => {
  const { isAuthenticated } = useSelector(userSelector)

  return (
    <div className="lg:pt-16 lg:pb-24 lg:overflow-hidden">
      <div className="mx-auto max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="max-w-md px-4 mx-auto sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center lg:z-20">
            <div className="lg:py-24">
              <h2 className="mt-4 font-semibold text-4xl tracking-[-2%] sm:mt-5 lg:mt-6 sm:text-5xl xl:leading-tight">
                Create your own next-gen NFTs instantly.
              </h2>
              <p className="text-base mt-6 sm:text-xl lg:text-lg xl:text-xl font-normal text-gray-500">
                Upload your work (image, video, audio, or 3D art), add a title
                and description, and customize your NFTs with properties, stats,
                and unlockable content.
              </p>
              <div className="mt-10 sm:flex sm:gap-3 sm:justify-center lg:justify-start">
                {discover && (
                  <div className="my-3 rounded-md sm:my-0">
                    <NextLink href="/discover">
                      <a className="flex items-center gap-2 justify-center w-full px-5 py-3 text-base font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                        {!isHomePage ? 'Learn more' : 'Discover more'}
                      </a>
                    </NextLink>
                  </div>
                )}
                {getStarted && (
                  <div className="rounded-md">
                    <NextLink
                      href={
                        isAuthenticated ? '/user-settings/upload' : '/register'
                      }
                    >
                      <a
                        className={twMerge(
                          'btn-primary',
                          'w-full flex items-center justify-center px-5 py-3 border border-blue-600 shadow-xs text-base font-medium rounded-lg text-white',
                        )}
                      >
                        Get started
                      </a>
                    </NextLink>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="px-4 my-16 lg:my-0">
            <div className="relative px-4 mx-auto overflow-hidden max-w-lg h-[496px] lg:max-w-[576px] sm:px-6 lg:px-0">
              <Image
                src="/images/home-cta.png"
                className="w-full h-full "
                alt="openft hero image"
                layout="fill"
                quality={100}
                objectFit="contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NftsInstantly
