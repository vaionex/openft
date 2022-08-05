import { SearchInput } from '@/components/ui/inputs'

const UserSettingsHeader = () => {
  return (
    <div className="relative pt-12 pb-6">
      <div className="px-4 mx-auto max-w-7xl sm:px-0">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl font-medium">Settings</h1>
          <SearchInput />
        </div>
      </div>
    </div>
  )
}

export default UserSettingsHeader
