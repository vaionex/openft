import { Logo } from '@/components/common/svgs'
import NextLink from 'next/link'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Discover', href: '/discover' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
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
        <div className="flex flex-wrap justify-center mt-8 space-x-6 md:mt-0 md:order-2">
          {navigation.map((item) => (
            <NextLink href={item.href} key={item.name}>
              <a href={item.href} className="text-gray-500 hover:text-gray-600">
                <span className="">{item.name}</span>
              </a>
            </NextLink>
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
