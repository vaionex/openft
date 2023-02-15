import { Logo } from '@/components/common/svgs'
import NextLink from 'next/link'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Discover', href: '/discover' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
  { name: 'Privacy', href: '/privacy' },
]

const Footer = ({ page }) => {
  if (page === 'login' || page === 'register') {
    return <footer className="px-8 pb-8 bg-white">© 2023 Vaionex</footer>
  }

  return (
    <footer className="bg-white">
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:flex md:items-center md:justify-between lg:px-6">
        <div className="flex justify-center">
          <div className="flex items-center cursor-pointer">
            <NextLink href={'/'}>
              <a className="flex items-center cursor-pointer">
                <img
                  className="h-5 pb-0.5 flex-none"
                  src="https://www.relysia.com/_next/static/media/RelysiaLogo_1.4aba7d51.svg"
                  alt="Relysia"
                />

                <span className="pl-2 text-xl font-semibold text-blue-900">
                  Nftana
                </span>
              </a>
            </NextLink>
          </div>
        </div>
        <div className="flex flex-wrap justify-center mt-8 gap-x-8 w-72 xs:w-auto mx-auto md:mt-0">
          {navigation.map((item) => (
            <NextLink href={item.href} key={item.name}>
              <a className="text-mist text-base hover:text-gray-600 mt-2 sm:mt-0">
                <span>{item.name}</span>
              </a>
            </NextLink>
          ))}
        </div>
        <div className="mt-8 md:mt-0">
          <p className="text-base text-center text-[#98A2B3] font-normal">
            &copy; 2023 Vaionex
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
