import Breadcrumb from '@/components/ui/breadcrumb'
import Image from 'next/image'
import NextLink from 'next/link'
import PropTypes from 'prop-types'

const DiscoverBanner = ({ action, pages }) => {
  return (
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-6 ">
      <div className="relative overflow-hidden shadow-xl rounded-2xl ">
        <div className="absolute -left-16 -top-12 -bottom-0 -right-0">
          <Image
            className="w-full h-full "
            src="/images/discover-banner.webp"
            alt="People working on laptops"
            layout="fill"
            priority={true}
          />
        </div>
        <div className="relative p-12 sm:px-16 sm:pt-16 sm:pb-[4.5rem]">
          <h3 className="text-4xl font-extrabold tracking-tight text-white">
            Discover brand new NFTs
          </h3>
          <p className="mt-5 text-xl text-[#D1E0FF]">
            Discover over 4,000+ NFTs already minted on Nftana.
          </p>
          {action === 'default' && null}
          {action === 'button' && (
            <div className="mt-5 space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
              <NextLink href="/discover">
                <a className="bg-white border border-gray-200 hover:bg-opacity-10 btn-primary bg-opacity-20">
                  Discover
                </a>
              </NextLink>
            </div>
          )}
          {action === 'breadcrumb' && (
            <Breadcrumb pages={pages} className="mt-10" />
          )}
        </div>
      </div>
    </div>
  )
}

DiscoverBanner.defaultProps = {
  action: 'default',
}

DiscoverBanner.propTypes = {
  action: PropTypes.oneOf(['default', 'button', 'breadcrumb']).isRequired,
}

export default DiscoverBanner
