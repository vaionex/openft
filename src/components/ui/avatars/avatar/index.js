import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import PropTypes from 'prop-types'
import { getFirstCharsOfName } from '@/utils/getFirstCharsOfName'

const Avatar = ({ user, avatar, className }) => {
  return (
    <div
      className={twMerge(
        'relative w-16 h-16 overflow-hidden rounded-full ring-4 ring-white sm:h-24 sm:w-24',
        className,
      )}
    >
      {user && avatar
        ? (
          <Image
            src={avatar}
            className=""
            layout="fill"
            alt={user.name}
            objectFit="cover"
          />
        ) : (
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border">
            <span className="text-sm font-medium leading-none">
              {getFirstCharsOfName(user?.name)}
            </span>
          </span>
        )}
    </div>
  )
}

Avatar.propTypes = {
  user: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default Avatar
