import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import PropTypes from 'prop-types'

const Avatar = ({ user, className }) => {
  return (
    <div
      className={twMerge(
        'relative w-16 h-16 overflow-hidden rounded-full ring-4 ring-white sm:h-24 sm:w-24',
        className,
      )}
    >
      <Image
        src={user?.profileImage}
        className=""
        layout="fill"
        alt={user?.name}
        objectFit="cover"
      />
    </div>
  )
}

Avatar.propTypes = {
  user: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default Avatar
