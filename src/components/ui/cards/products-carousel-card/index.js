import { HeartIcon, ShareIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import PropTypes from 'prop-types'
import { twMerge } from 'tailwind-merge'
import CardLikeButton from '../../card-like-button'

const ProductsCarouselCard = ({ data, mr }) => {
  return (
    <div
      key={data.id}
      className={twMerge(
        'relative border border-gray-200 group rounded-xl',
        mr ? 'sm:mr-5' : '',
      )}
    >
      <div className="relative w-full overflow-hidden bg-gray-200 rounded-t-xl min-h-[28.75rem] aspect-w-1 aspect-h-1 group-hover:opacity-75 lg:h-[28.75rem] lg:aspect-none">
        <Image
          src={data.imageSrc}
          alt={data.imageAlt}
          layout="fill"
          className="absolute inset-0 object-cover object-center w-full h-full lg:w-full lg:h-full"
        />
        <div className="absolute inset-0 h-full bg-gradient-to-tr opacity-10 from-slate-900 to-slate-600 mix-blend-multiply" />
        <div className="absolute inset-x-0 bottom-0 z-50 flex items-end justify-end p-4 overflow-hidden rounded-lg">
          <CardLikeButton />
        </div>
      </div>
      <div className="px-4 py-5">
        <div className="flex items-center justify-between">
          <p className="px-3 py-2 rounded-lg bg-gray-50">1/1</p>
          <p className="text-xl font-medium text-gray-900">
            {data.price} {data.priceType}
          </p>
        </div>
        <div className="my-6">
          <h3 className="text-sm text-gray-700">
            <a href={`/discover/${data.href}`} className="text-blue-600">
              {data.name}
            </a>
          </h3>
          <p className="mt-1 text-lg text-gray-900">{data.color}</p>
        </div>
        <div className="flex gap-1.5">
          <button className="btn-primary py-2.5 flex w-full border-none justify-center items-center font-normal">
            Buy now
          </button>
          <button className="p-3.5 rounded-md border border-gray-200">
            <ShareIcon className="w-5 h-5 text-blue-700" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}

ProductsCarouselCard.defaultProps = {
  data: {},
  mr: false,
}

ProductsCarouselCard.propTypes = {
  data: PropTypes.object.isRequired,
  mr: PropTypes.bool,
}

export default ProductsCarouselCard
