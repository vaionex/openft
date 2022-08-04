import { ON_AUCTION } from '@/utils/constants'
import { HeartIcon, ShareIcon } from '@heroicons/react/outline'
import PropTypes from 'prop-types'

const ProductCard = ({ data }) => {
  return (
    <div
      key={data.id}
      className="relative border border-gray-200 rounded-xl w-full"
    >
      <div className="relative w-full overflow-hidden bg-gray-200 rounded-t-xl min-h-80 aspect-w-1 aspect-h-1 group-hover:opacity-75 lg:h-80 lg:aspect-none">
        <img
          src={data.imageSrc}
          alt={data.imageAlt}
          className="object-cover object-center w-full h-full lg:w-full lg:h-full"
        />
        <div className="absolute inset-x-0 bottom-0 z-50 flex items-end justify-end p-4 overflow-hidden rounded-lg">
          <div className="inline-flex items-center justify-center bg-white border border-white rounded-md cursor-pointer hover:bg-opacity-40 bg-opacity-60 w-11 h-11">
            <HeartIcon className="w-5 h-5 text-white " aria-hidden="true" />
          </div>
        </div>
      </div>
      <div className="px-4 py-5">
        <div className="flex justify-end">
          <p className="text-xl font-medium text-gray-900">
            ${data.price} {data.priceType}
          </p>
        </div>
        <div className="my-6">
          <h3 className="text-sm text-gray-700">
            <a href={data.href} className="text-blue-600">
              {data.owner}
            </a>
          </h3>
          <p className="mt-1 text-lg text-gray-900">{data.name}</p>
        </div>
        <div className="flex gap-1.5">
          <button className="btn-primary py-2.5 flex w-full border-none justify-center items-center font-normal">
            {data.sellingType === ON_AUCTION ? 'Place Bid' : 'Buy now'}
          </button>
          <button className="p-3.5 rounded-md border border-gray-200">
            <ShareIcon className="w-5 h-5 text-blue-700" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}

ProductCard.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ProductCard
