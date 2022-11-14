import { SearchInput } from '@/components/ui/inputs'
import { InputMain } from '@/components/ui/inputs'
import { MagnifyGlassIcon } from '@/components/common/icons'
import { useRouter } from 'next/router'

const UserSettingsHeader = () => {
  const router = useRouter()

  const keyDownHandler = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      router.push(`/discover?query=${event.target.value}`)
    }
  }
  return (
    <div className="relative pt-12 pb-6">
      <div className="flex flex-col justify-between px-4 mx-auto xs:flex-row max-w-7xl sm:px-0">
        <div className="flex items-center justify-between gap-4 mb-3 xs:mb-0">
          <h1 className="text-3xl font-medium">Settings</h1>
        </div>
        <div>
          <form className="flex items-center w-full gap-3">
            <InputMain className="relative w-full pb-0 border-none">
              <span className="absolute inset-y-0 left-0 z-10 flex items-center pl-3 pointer-events-none">
                <MagnifyGlassIcon className="w-5 h-5 text-gray-400 " />
              </span>
              <InputMain.Label
                htmlFor="search"
                label="Search"
                className="sr-only"
              />
              <InputMain.Input
                type="text"
                name="search"
                id="search"
                placeholder="Search"
                inputClassName="pl-10 min-h-[44px]"
                onKeyDown={(e) => keyDownHandler(e)}
              />
            </InputMain>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserSettingsHeader
