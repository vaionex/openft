import { CircularProgressbar } from 'react-circular-progressbar'
import PropTypes from 'prop-types'

const ProgressCircular = ({ value, width, height, strokeWidth }) => {
  return (
    <div
      className="custom-progress-circular"
      style={{
        width,
        height,
      }}
    >
      <CircularProgressbar value={value} strokeWidth={strokeWidth} />
    </div>
  )
}

ProgressCircular.defaultProps = {
  width: 120,
  height: 120,
  strokeWidth: 12,
}

ProgressCircular.propTypes = {
  value: PropTypes.number.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  strokeWidth: PropTypes.number,
}

export default ProgressCircular
