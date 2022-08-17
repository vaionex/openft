import getFirstCharsOfName from '@/utils/getFirstCharsOfName'
import PropTypes from 'prop-types'

const AvatarWithName = ({ name }) => {
  return (
    <span className="inline-flex items-center justify-center bg-blue-700 rounded-full h-14 w-14">
      <span className="text-xl font-medium leading-none text-white">
        {getFirstCharsOfName(name)}
      </span>
    </span>
  )
}

AvatarWithName.propTypes = {
  name: PropTypes.string.isRequired,
}

export default AvatarWithName
