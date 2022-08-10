import Image from 'next/image'
import PropTypes from 'prop-types'
import { Avatar } from '../../avatars'

const ProfileHeaderCard = ({ profile }) => {
  return (
    <div>
      <div className="relative w-full h-32 overflow-hidden rounded-lg lg:h-60">
        <Image
          src={profile.backgroundImage}
          alt={profile.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className=" sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-10 sm:flex sm:items-end sm:space-x-5">
          <Avatar user={profile} className="w-24 h-24 sm:w-32 sm:h-32 " />
          <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="flex-1 min-w-0 mb-6 sm:mb-0 sm:hidden md:block">
              <h2 className="mb-1 text-2xl font-medium text-gray-900 truncate">
                {profile.name}
              </h2>
              <h3 className="font-normal text-gray-500">{profile.title}</h3>
            </div>
            <div className="flex flex-col space-y-3 justify-stretch sm:flex-row sm:space-y-0 sm:space-x-4">
              <button type="button" className="btn-secondary py-2.5">
                Cancel
              </button>
              <button type="button" className="btn-primary py-2.5">
                Save
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 hidden min-w-0 mt-6 sm:block md:hidden">
          <h2 className="text-2xl font-medium text-gray-900 truncate">
            {profile.name}
          </h2>
          <h3 className="font-normal text-gray-500">{profile.title}</h3>
        </div>
      </div>
    </div>
  )
}

ProfileHeaderCard.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default ProfileHeaderCard
