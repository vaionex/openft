import { useRouter } from 'next/router'
import { twMerge } from 'tailwind-merge'
import NextLink from 'next/link'
import { firebaseAuth } from '@/firebase/init'
import { multiFactor } from 'firebase/auth'
import { toast } from 'react-toastify'
const links = [
  { name: 'My profile', href: '/user-settings', current: false },
  { name: 'Collection', href: '/user-settings/collection', current: false },
  { name: 'Mint', href: '/user-settings/mint', current: false },
  { name: 'Security', href: '/user-settings/security', current: false },
  // {
  //   name: 'Notifications',
  //   href: '/user-settings/notifications',
  //   current: false,
  // },
  { name: '2-Factor Auth', href: '/user-settings/mfa', current: false },
  { name: 'Wallet', href: '/user-settings/wallet', current: false },
  { name: 'Top-up', href: '/user-settings/topup', current: false },
]

const UserSettingsSidebar = () => {
  const router = useRouter()

  const checkMFAStatus = async (href) => {
    const options = multiFactor(firebaseAuth.currentUser).enrolledFactors.length
    if (options === 0) {
      toast.error('please enable MFA For this operation', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    } else {
      router.push(href)
    }
  }

  return (
    <aside className="py-6 lg:py-8 lg:pr-12 lg:col-span-2">
      <nav className="space-y-1">
        {links.map((item) => (
          <a
            href={item.href}
            key={`${item.name}-${Math.random() * 100}`}
            className={twMerge(
              router.pathname === item.href
                ? 'bg-blue-50 border-blue-500 text-blue-700 hover:bg-blue-50 hover:text-teal-700'
                : 'border-transparent text-mist hover:bg-gray-50 hover:text-gray-700',
              'group border-l-4 px-3 py-2 flex items-center text-sm font-medium',
            )}
            aria-current={item.href === router.pathname ? 'page' : null}
            onClick={(e) => {
              e.preventDefault()
              item.name === 'Top-up'
                ? checkMFAStatus(item.href)
                : router.push(item.href)
            }}
          >
            <span className="truncate">{item.name}</span>
          </a>
        ))}
      </nav>
    </aside>
  )
}

export default UserSettingsSidebar
