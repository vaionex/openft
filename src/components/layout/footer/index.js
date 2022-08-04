import { Logo } from '@/components/common/svgs'

const navigation = [
  { name: 'Home', href: '#' },
  { name: 'Discover', href: '#' },
  { name: 'Contribute', href: '#' },
  { name: 'FAQ', href: '#' },
  { name: 'Contact', href: '#' },
  { name: 'Privacy', href: '#' },
]

const Footer = ({ page }) => {
  if (page === 'login' || page === 'register') {
    return <footer className="px-8 pb-8 bg-white">© 2022 Vaionex</footer>
  }

  return (
    <footer className="bg-white">
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center md:order-1">
          <Logo />
        </div>
        <div className="flex justify-center space-x-6 md:order-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-500 hover:text-gray-600"
            >
              <span className="">{item.name}</span>
            </a>
          ))}
        </div>
        <div className="mt-8 md:mt-0 md:order-3">
          <p className="text-base text-center text-gray-400">
            &copy; 2022 Vaionex
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
