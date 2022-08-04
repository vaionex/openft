import SharedLayout from '../shared-layout'
import UserSettingsHeader from './header'
import UserSettingsTabs from './tabs'

const UserSettingsLayout = ({ children }) => {
  return (
    <SharedLayout title="User Settings">
      <main className="relative ">
        <div className="max-w-screen-xl px-4 pb-6 mx-auto sm:px-6 lg:pb-16">
          <UserSettingsHeader />
          <div className="overflow-hidden bg-white rounded-lg ">
            <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
              <UserSettingsTabs />
              <div>{children}</div>
            </div>
          </div>
        </div>
      </main>
    </SharedLayout>
  )
}

export default UserSettingsLayout
