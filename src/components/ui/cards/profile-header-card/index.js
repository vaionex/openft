import Image from 'next/image'
import PropTypes from 'prop-types'
import { twMerge } from 'tailwind-merge'
import { Avatar, AvatarWithName } from '../../avatars'

const ProfileHeaderCard = ({
  user,
  isPending,
  isSuccess,
  onSubmit,
  isError,
}) => {
  return (
    <div>
      <div className="relative w-full h-32 overflow-hidden bg-blue-300 rounded-lg lg:h-60">
        {user?.coverImage && (
          <Image
            src={user?.coverImage}
            alt={user?.name}
            layout="fill"
            objectFit="cover"
          />
        )}
      </div>
      <div className=" sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-10 sm:flex sm:items-end sm:space-x-5">
          {user ? (
            user.profileImage ? (
              <Avatar
                className="w-24 h-24 bg-blue-700 sm:w-32 sm:h-32"
                user={user}
              />
            ) : (
              <AvatarWithName
                className="w-24 h-24 text-xl sm:w-32 sm:h-32"
                name={user.name}
              />
            )
          ) : (
            <AvatarWithName className="w-24 h-24 sm:w-32 sm:h-32 " />
          )}

          <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="flex-1 min-w-0 mb-6 sm:mb-0 sm:hidden md:block">
              <h2 className="mb-1 text-2xl font-medium text-gray-900 truncate">
                {user?.name}
              </h2>
              {user?.jobTitle && user?.showJobTitle && (
                <h3 className="font-normal text-gray-500">{user?.jobTitle}</h3>
              )}
            </div>
            <div className="flex flex-col items-center space-y-3 justify-stretch sm:flex-row sm:space-y-0 sm:space-x-4">
              {isSuccess && (
                <span className="text-xs text-green-500">
                  Profile successfully updated.{' '}
                </span>
              )}
              <button
                type="button"
                disabled={isError}
                className={twMerge(
                  'btn-primary py-2.5',
                  isError
                    ? 'opacity-50 cursor-not-allowed pointer-events-none'
                    : 'cursor-pointer',
                  isPending && 'pointer-events-none',
                )}
                onClick={onSubmit}
              >
                Save
                {isPending && (
                  <span className="relative flex items-center">
                    <span className="spinner-small"></span>
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 hidden min-w-0 mt-6 sm:block md:hidden">
          <h2 className="text-2xl font-medium text-gray-900 truncate">
            {user?.name}
          </h2>
          <h3 className="font-normal text-gray-500">{user?.title}</h3>
        </div>
      </div>
    </div>
  )
}

ProfileHeaderCard.propTypes = {
  user: PropTypes.object,
}

export default ProfileHeaderCard
