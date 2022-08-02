import Image from 'next/image'
import NextLink from 'next/link'
import PropTypes from 'prop-types'

const DiscoverBanner = ({ type }) => {
  return (
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 ">
      <div className="relative overflow-hidden shadow-xl rounded-2xl ">
        <div className="absolute left-0 -top-12 -bottom-0 -right-56">
          <Image
            className="object-cover w-full h-full"
            src="/images/discover-banner.png"
            alt="People working on laptops"
            layout="fill"
            priority={true}
          />
        </div>
        <div className="relative p-12 sm:px-16 sm:pt-16 sm:pb-[4.5rem]">
          <h3 className="text-4xl font-extrabold tracking-tight text-white">
            Discover brand new NFTs
          </h3>
          <p className="my-5 text-xl text-blue-100 ">
            Discover over 4,000+ NFTs already minted on Openft.
          </p>
          <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
            <NextLink href="#">
              <a className="flex items-center justify-center px-4 py-3 text-base font-medium text-white bg-white border border-gray-200 rounded-md shadow-sm bg-opacity-20 hover:bg-opacity-70 sm:px-8">
                Discover
              </a>
            </NextLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiscoverBanner
