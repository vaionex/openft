import cn from 'classnames'
import PropTypes from 'prop-types'
import Slider from 'react-slick'

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/solid'
import CarouselCard from '../cards/carousel-card'
import styles from './index.module.css'

const caruselHzSettings = {
  dots: false,
  infinite: false,
  speed: 400,
  slidesToScroll: 1,
  arrows: true,
  swipeToSlide: true,
  draggable: true,
}

function NextArrow({ currentSlide, slideCount, cardsToShow, ...props }) {
  return (
    <button
      {...props}
      className={cn(styles.arrow, styles.arrowNext, {
        'text-color-solid-4': currentSlide !== slideCount - cardsToShow,
        [styles.arrowDisabled]: currentSlide === slideCount - cardsToShow,
      })}
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
      className={cn(styles.arrow, styles.arrowPrev, {
        'text-color-solid-4': currentSlide !== 0,
        [styles.arrowDisabled]: currentSlide === 0,
      })}
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

const Carousel = ({ data }) => {
  const cardsToShow = {
    desktop: 4,
    tablet: 1.5,
    mobile: 1,
  }

  const settings = {
    ...caruselHzSettings,
    slidesToShow: cardsToShow.desktop,
    nextArrow: <NextArrow cardsToShow={cardsToShow.desktop} />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: cardsToShow.tablet,
          nextArrow: <NextArrow cardsToShow={cardsToShow.tablet} />,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: cardsToShow.mobile,
        },
      },
    ],
  }

  return (
    <span className="relative carousel-main">
      <Slider {...settings}>
        {data.map((item) => (
          <CarouselCard key={item.id} data={item} />
        ))}
      </Slider>
    </span>
  )
}

Carousel.propTypes = {
  data: PropTypes.array.isRequired,
}

export default Carousel
