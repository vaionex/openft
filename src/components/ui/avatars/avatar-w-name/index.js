import getFirstCharsOfName from '@/utils/getFirstCharsOfName'
import PropTypes from 'prop-types'
import { twMerge } from 'tailwind-merge'

const AvatarWithName = ({ name, className }) => {
  return (
    <span
      className={twMerge(
        'inline-flex items-center justify-center bg-blue-700 rounded-full h-14 w-14 z-10',
        className,
      )}
    >
      <span className="font-medium leading-none text-white ">
        {name ? getFirstCharsOfName(name) : ''}
      </span>
    </span>
  )
}

AvatarWithName.propTypes = {
  name: PropTypes.string,
}

export default AvatarWithName
