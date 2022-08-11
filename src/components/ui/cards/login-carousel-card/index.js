import PropTypes from 'prop-types'

const LoginCarouselCard = ({ data }) => {
  return (
    <div key={data.id} className=" bg-login-carousel-card">
      <div className="relative z-50">
        <p className="mb-8 text-3xl font-medium text-white">{data.text}</p>

        <div>
          <div className="text-4xl font-semibold">{data.name}</div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold">{data.title}</span>
            <span className="text-xs">{data.location}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

LoginCarouselCard.defaultProps = {
  data: {},
}

LoginCarouselCard.propTypes = {
  data: PropTypes.object.isRequired,
}

export default LoginCarouselCard
