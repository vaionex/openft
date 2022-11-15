import { ProductsCarousel } from '@/components/ui/carousels'
import userSelector from '@/redux/selectors/user'
import NextLink from 'next/link'
import { useSelector } from 'react-redux'

const CollectionsSection = ({ nftsData }) => {
  const { isAuthenticated } = useSelector(userSelector)
  return (
    <div className="relative px-4 mx-auto pb-14 md:pb-20  max-w-7xl lg:mt-24 sm:px-6 lg:px-8">
      <div className="sm:text-center lg:text-left">
        <h2 className="mt-4 text-4xl tracking-[-2%] text-[#101828] sm:mt-5">
          Hot collections
        </h2>
        <p className="mt-6 text-base sm:text-xl">
          Best selling collection selected by exchangers.
        </p>
      </div>
      <div className="top-0 mt-10 right-8 lg:mt-0 lg:absolute sm:flex sm:gap-3 sm:justify-center lg:justify-start">
        <div className="my-3 rounded-md sm:my-0">
          <NextLink href="/discover">
            <a className="flex items-center justify-center w-full px-5 py-3 text-base font-medium text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 md:text-lg">
              Explore
            </a>
          </NextLink>
        </div>
        {!isAuthenticated && (
          <div className="rounded-md">
            <NextLink href="/register">
              <a className="flex items-center justify-center w-full px-5 py-3 text-base font-medium text-white border border-transparent rounded-md btn-primary 0 md:text-lg">
                Create account
              </a>
            </NextLink>
          </div>
        )}
      </div>
      <div className=" py-12 mx-auto w-full max-w-7xl 3xlg:min-w-[1364px] ">
        <ProductsCarousel data={nftsData} />
      </div>
    </div>
  )
}

export default CollectionsSection
