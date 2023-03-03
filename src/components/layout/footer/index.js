import NextLink from 'next/link'
import Image from 'next/image'
const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Discover', href: '/discover' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
  { name: 'Privacy', href: '/privacy' },
]

const Footer = ({ page }) => {
  if (page === 'login' || page === 'register') {
    return (
      <footer className="px-8 pb-8 bg-white">
        &copy; {new Date().getFullYear()} Vaionex
      </footer>
    )
  }

  return (
    <footer className="bg-white">
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:flex md:items-center md:justify-between lg:px-6">
        <div className="flex justify-center">
          <div className="flex items-center cursor-pointer">
            <NextLink href={'/'}>
              <a className="flex items-center cursor-pointer">
                <Image
                  className="h-5 pb-0.5 flex-none"
                  src="https://www.relysia.com/_next/static/media/RelysiaLogo_1.4aba7d51.svg"
                  alt="Relysia"
                  height='20px'
                  width='17px'
                />
                <span className="pl-2 text-xl font-semibold text-blue-900">
                  Nftana
                </span>
              </a>
            </NextLink>
          </div>
        </div>
        <div className="flex flex-wrap justify-center mx-auto mt-8 gap-x-8 w-72 xs:w-auto md:mt-0">
          {navigation.map((item) => (
            <NextLink href={item.href} key={item.name}>
              <a className="mt-2 text-base text-mist hover:text-gray-600 sm:mt-0">
                <span>{item.name}</span>
              </a>
            </NextLink>
          ))}
        </div>
        <div className="mt-8 md:mt-0">
          <p className="text-base font-normal text-center text-cadet-gray">
            &copy; {new Date().getFullYear()} Vaionex
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
