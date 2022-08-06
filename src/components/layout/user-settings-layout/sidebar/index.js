import { useRouter } from 'next/router'
import { twMerge } from 'tailwind-merge'
import NextLink from 'next/link'

const links = [
  { name: 'My profile', href: '/user-settings', current: false },
  { name: 'Upload', href: '/user-settings/upload', current: false },
  { name: 'Security', href: '/user-settings/security', current: false },
  {
    name: 'Notifications',
    href: '/user-settings/notifications',
    current: false,
  },
  { name: 'Wallet', href: '/user-settings/wallet', current: false },
]

const UserSettingsSidebar = () => {
  const { pathname } = useRouter()

  console.log(pathname)
  return (
    <aside className="py-6 lg:py-8 lg:pr-12 lg:col-span-2">
      <nav className="space-y-1">
        {links.map((item) => (
          <NextLink
            href={item.href}
            scroll={false}
            shallow={true}
            key={`${item.name}-${Math.random() * 100}`}
          >
            <a
              key={item.name}
              href={item.href}
              className={twMerge(
                pathname === item.href
                  ? 'bg-blue-50 border-blue-500 text-blue-700 hover:bg-blue-50 hover:text-teal-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-700',
                'group border-l-4 px-3 py-2 flex items-center text-sm font-medium',
              )}
              aria-current={item.href === pathname ? 'page' : null}
            >
              <span className="truncate">{item.name}</span>
            </a>
          </NextLink>
        ))}
      </nav>
    </aside>
  )
}

export default UserSettingsSidebar
