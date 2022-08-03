import { HeartIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import PropTypes from 'prop-types'

const CarouselCard = ({ data }) => {
  return (
    <div
      key={data.id}
      className="relative border border-gray-200 group rounded-xl"
    >
      <div className="relative w-full overflow-hidden bg-gray-200 rounded-xl min-h-80 aspect-w-1 aspect-h-1 group-hover:opacity-75 lg:h-80 lg:aspect-none">
        <img
          src={data.imageSrc}
          alt={data.imageAlt}
          className="object-cover object-center w-full h-full lg:w-full lg:h-full"
        />
      </div>
      <div className="absolute inset-x-0 z-50 flex items-end justify-end p-4 overflow-hidden rounded-lg bottom-24">
        <div className="inline-flex items-center justify-center bg-white rounded-md w-11 h-11">
          <HeartIcon className="w-5 h-5 text-blue-700 " aria-hidden="true" />
        </div>
      </div>
      <div className="flex justify-between px-4 py-5 mt-4">
        <div>
          <h3 className="text-sm text-gray-700">
            <a href={data.href}>
              <span aria-hidden="true" className="absolute inset-0" />
              {data.name}
            </a>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{data.color}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">{data.price}</p>
      </div>
    </div>
  )
}

CarouselCard.propTypes = {
  data: PropTypes.object.isRequired,
}

export default CarouselCard
