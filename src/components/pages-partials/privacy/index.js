import SharedLayout from '@/components/layout/shared-layout'
import Image from 'next/image'
import NextLink from 'next/link'

const PrivacyMain = () => {
  return (
    <SharedLayout title="Privacy Policy">
      <div className="py-16 sm:py-24">
        <div className="relative flex flex-col justify-between max-w-md px-4 mx-auto sm:max-w-4xl sm:px-6 ">
          <div className="px-4 mx-auto text-center sm:px-6 lg:px-8">
            <div>
              <h2 className="text-lg font-semibold text-blue-600">
                Privacy Policy
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                We care about your privacy
              </p>
              <p className="mx-auto mt-5 text-xl text-gray-500 max-w-prose">
                Your privacy is important to us at Nftana. We respect your
                privacy regarding any information we may collect from you across
                our website.
              </p>
            </div>
          </div>

          <div className="px-4 py-16 sm:px-6 lg:px-8 sm:py-24">
            <div>
              <p className="max-w-2xl tracking-wide text-gray-500">
              Our Privacy Policy explains how we collect, use, and share information about you when you use our websites, mobile apps, and other online products and services (collectively, the "Services") or when you otherwise interact with us.
              </p>
            </div>
            <div className="mt-12">
              <h3 className="mb-6 text-2xl font-semibold">
                What information do we collect?
              </h3>
              <p className="max-w-2xl tracking-wide text-gray-500">
              When you use our Services, we may collect certain information about your device and your use of the Services. This includes information such as your IP address, device type, unique device identification numbers, browser type, broad geographic location (e.g. country or city-level location) and other technical information.
              </p>
              <p className="max-w-2xl mt-6 tracking-wide text-gray-500">
              We may also collect information about how you use the Services, including the actions you take and the features you use.
              </p>
              <p className="max-w-2xl mt-6 tracking-wide text-gray-500">
              We use cookies and similar technologies (e.g. web beacons, pixel tags, and clear GIFs) to collect information about your use of the Services. A cookie is a small data file that is transferred to your device. We use cookies to store your preferences and settings, to authenticate you when you log in, and to personalize your experience. You can control how cookies are used through your browser settings.
              </p>
              <p className="max-w-2xl mt-6 tracking-wide text-gray-500">
              We use Google Analytics and Firebase to collect and analyze data about how you use our Services. These tools use cookies and other tracking technologies to collect and store information such as the pages you visit, the time you spend on each page, and the links you click. We use this information to improve the performance and functionality of our Services.
              </p>
            </div>

            <div className="mt-12">
              <h3 className="mb-6 text-2xl font-semibold">
                How do we use your information?
              </h3>
              <p className="max-w-2xl tracking-wide text-gray-500">
              We use the information we collect about you to provide, maintain, and improve the Services, to develop new features and services, and to protect us and our users.
              </p>
              <p className="max-w-2xl mt-6 tracking-wide text-gray-500">
              We may also use the information for research and analytics purposes, to personalize your experience, and to communicate with you about products, services, and events.
              </p>
              <p className="max-w-2xl mt-6 tracking-wide text-gray-500">
              We may share your information with third parties in certain circumstances, such as to comply with legal obligations, to protect the rights and safety of our users and third parties, and to enforce our policies.
              </p>
            </div>

           
            <div className="mt-12">
              <h4 className="mb-6 text-xl font-semibold">
                How do we keep your information safe?
              </h4>
              <p className="max-w-2xl mt-6 tracking-wide text-gray-500">
              We limit access to your information to only those employees, contractors, and service providers who need it to perform their duties.
              </p>
              <p className="max-w-2xl mt-6 tracking-wide text-gray-500">
              We require third parties with whom we share your information to have appropriate security measures in place to protect that information.
              </p>
              <p className="max-w-2xl mt-6 tracking-wide text-gray-500">
              We have implemented measures to detect and prevent data breaches, and we will promptly notify you if we discover a breach that affects your information.
              </p>
              <p className="max-w-2xl mt-6 tracking-wide text-gray-500">
              We take your privacy seriously and are committed to protecting your information. If you have any questions or concerns about our privacy practices, please don't hesitate to contact us at admin@vaionex.com.
              </p>
              
            </div>
            
            <div className="mt-12">
              <h4 className="mb-6 text-xl font-semibold">
                How can you contact us about this policy?
              </h4>
              <p className="max-w-2xl tracking-wide text-gray-500">
                You can reach us at admin@vaionex.com if you have any questions about this policy. Vaionex Corporation, 2035 Sunset Lake Road, Suite B-2, Newark, DE 19702
              </p>
            </div>
          </div>
        </div>
        <div
          aria-labelledby="faq-contact"
          className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8"
        >
          <div className="relative overflow-hidden rounded-lg ">
            <div className="absolute inset-0 bg-gray-900">
              <Image
                src="/images/faq-bottom.jpg"
                alt=""
                className="object-cover object-center w-full h-full"
                layout="fill"
              />
            </div>
            <div className="relative px-6 py-16 sm:px-12 lg:px-16">
              <div className="relative flex flex-col items-center max-w-3xl mx-auto text-center">
                <h2
                  id="faq-contact"
                  className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
                >
                  Still have questions?
                </h2>
                <p className="mt-5 mb-8 text-xl text-white">
                  Ask everything about how Nftana can work for you.
                </p>
                <div className="flex gap-2">
                  <NextLink href="/docs">
                    <a className="btn-secondary">Docs</a>
                  </NextLink>
                  <NextLink href="/contact">
                    <a className="btn-primary">Contact us</a>
                  </NextLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SharedLayout>
  )
}

export default PrivacyMain
