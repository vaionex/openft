import { twMerge } from 'tailwind-merge'

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

const UserSettingsTabs = () => {
  return (
    <aside className="py-6 lg:col-span-3">
      <nav className="space-y-1">
        {links.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={twMerge(
              item.current
                ? 'bg-teal-50 border-teal-500 text-teal-700 hover:bg-teal-50 hover:text-teal-700'
                : 'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900',
              'group border-l-4 px-3 py-2 flex items-center text-sm font-medium',
            )}
            aria-current={item.current ? 'page' : undefined}
          >
            <span className="truncate">{item.name}</span>
          </a>
        ))}
      </nav>
    </aside>
  )
}

export default UserSettingsTabs
