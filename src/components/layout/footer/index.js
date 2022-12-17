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
    return <footer className="px-8 pb-8 bg-white">© 2022 Vaionex</footer>
  }

  return (
    <footer className="bg-white">
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center md:order-1">
        <div className='flex items-center cursor-pointer'>
                  <img className="h-5 pb-0.5 flex-none" src="https://www.relysia.com/_next/static/media/RelysiaLogo_1.4aba7d51.svg" alt="Relysia" />
                  <p className='pl-2 font-semibold text-xl text-blue-900'>Nftana</p>
                  </div>
        </div>
        <div className="flex flex-wrap justify-center mt-8 space-x-8 md:mt-0 md:order-2">
          {navigation.map((item) => (
            <NextLink href={item.href} key={item.name}>
              <a
                href={item.href}
                className="text-[#667085] text-base hover:text-gray-600"
              >
                <span>{item.name}</span>
              </a>
            </NextLink>
          ))}
        </div>
        <div className="mt-8 md:mt-0 md:order-3">
          <p className="text-base text-center text-[#98A2B3] font-normal">
            &copy; 2022 Vaionex
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
