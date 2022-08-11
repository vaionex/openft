import PropTypes from 'prop-types'
import Slider from 'react-slick'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/solid'
import { twMerge } from 'tailwind-merge'
import { LoginCarouselCard } from '../../cards'

function NextArrow({ currentSlide, slideCount, ...props }) {
  return (
    <button
      {...props}
      className={twMerge(
        'absolute inline-flex items-center backdrop-blur-lg justify-center right-0 border border-white rounded-full bottom-10 w-14 h-14 translate-x-[-30px] z-50',
        currentSlide !== slideCount - 1 && 'text-white',
        currentSlide === slideCount - 1 &&
          'text-gray-500 border-gray-500 pointer-events-none',
      )}
      aria-hidden="true"
      aria-disabled={currentSlide === slideCount - 1 ? true : false}
      type="button"
    >
      <ArrowRightIcon width={24} height={24} />
    </button>
  )
}

NextArrow.propTypes = {
  currentSlide: PropTypes.number,
  slideCount: PropTypes.number,
}

NextArrow.defaultProps = {
  currentSlide: 0,
  slideCount: 0,
}

function PrevArrow({ currentSlide, slideCount, ...props }) {
  return (
    <button
      {...props}
      className={twMerge(
        'absolute inline-flex items-center backdrop-blur-lg justify-center right-0 border border-white rounded-full bottom-10 w-14 h-14 translate-x-[-100px] z-50',
        currentSlide !== 0 && 'text-white',
        currentSlide === 0 &&
          'text-gray-500 border-gray-500 pointer-events-none',
      )}
      aria-hidden="true"
      aria-disabled={currentSlide === 0 ? true : false}
      type="button"
    >
      <ArrowLeftIcon width={24} height={24} />
    </button>
  )
}

PrevArrow.propTypes = {
  currentSlide: PropTypes.number,
  slideCount: PropTypes.number,
}

const LoginCarousel = ({ data }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    arrows: true,
    swipeToSlide: true,
    draggable: true,
    slidesToShow: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  }

  return (
    <span className="relative overflow-hidden carousel-main">
      <Slider {...settings}>
        {data.map((item) => (
          <LoginCarouselCard key={item.id} data={item} />
        ))}
      </Slider>
    </span>
  )
}

LoginCarousel.propTypes = {
  data: PropTypes.array.isRequired,
}

export default LoginCarousel
