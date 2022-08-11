import PropTypes from 'prop-types'
import Slider from 'react-slick'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/solid'
import ProductsCarouselCard from '../../cards/products-carousel-card'
import { twMerge } from 'tailwind-merge'

const mainSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToScroll: 2,
  arrows: true,
  swipeToSlide: true,
  draggable: true,
}

function NextArrow({ currentSlide, slideCount, cardsToShow, ...props }) {
  return (
    <button
      {...props}
      className={twMerge(
        'absolute inline-flex items-center justify-center left-0 border border-gray-200 rounded-full -bottom-20 w-14 h-14 translate-x-[100px]',
        currentSlide !== slideCount - cardsToShow &&
          'text-blue-600 border-blue-200',
        currentSlide === slideCount - cardsToShow && 'text-gray-400 ',
      )}
      aria-hidden="true"
      aria-disabled={currentSlide === slideCount - cardsToShow ? true : false}
      type="button"
    >
      <ArrowRightIcon width={14} height={14} />
    </button>
  )
}

NextArrow.propTypes = {
  currentSlide: PropTypes.number,
  slideCount: PropTypes.number,
  cardsToShow: PropTypes.number,
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
        'absolute inline-flex items-center justify-center left-0 border border-gray-200 rounded-full -bottom-20 w-14 h-14 translate-x-[30px]',
        currentSlide !== 0 && 'text-blue-600 border-blue-200',
        currentSlide === 0 && 'text-gray-400 ',
      )}
      aria-hidden="true"
      aria-disabled={currentSlide === 0 ? true : false}
      type="button"
    >
      <ArrowLeftIcon width={14} height={14} />
    </button>
  )
}

PrevArrow.propTypes = {
  currentSlide: PropTypes.number,
  slideCount: PropTypes.number,
}

const ProductsCarousel = ({ data }) => {
  const cardsToShow = {
    desktop: 3.5,
    bigTablet: 2.96,
    tablet: 1.97,
    mobile: 1,
  }

  const settings = {
    ...mainSettings,
    slidesToShow: cardsToShow.desktop,
    nextArrow: <NextArrow cardsToShow={cardsToShow.desktop} />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1366,
        settings: {
          slidesToShow: cardsToShow.bigTablet,
          nextArrow: <NextArrow cardsToShow={cardsToShow.bigTablet} />,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: cardsToShow.tablet,
          nextArrow: <NextArrow cardsToShow={cardsToShow.tablet} />,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: cardsToShow.mobile,
        },
      },
    ],
  }

  return (
    <span className="relative overflow-hidden carousel-main">
      <Slider {...settings}>
        {data.map((item) => (
          <ProductsCarouselCard key={item.id} mr data={item} />
        ))}
      </Slider>
    </span>
  )
}

ProductsCarousel.propTypes = {
  data: PropTypes.array.isRequired,
}

export default ProductsCarousel
