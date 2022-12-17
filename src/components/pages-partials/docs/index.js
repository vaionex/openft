import SharedLayout from '@/components/layout/shared-layout'
import Image from 'next/image'
import NextLink from 'next/link'

const DocsMain = () => {
  return (
    <SharedLayout title="Privacy Policy">
      <div className="py-16 sm:py-24">
        <div className="relative flex flex-col justify-between max-w-md px-4 mx-auto sm:max-w-4xl sm:px-6 ">
          <div className="px-4 mx-auto text-center sm:px-6 lg:px-8">
            <div>
              <h2 className="text-lg font-semibold text-blue-600">Docs</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                We care about your privacy
              </p>
              <p className="mx-auto mt-5 text-xl text-gray-500 max-w-prose">
                Your privacy is important to us at NFtana. We respect your
                privacy regarding any information we may collect from you across
                our website.
              </p>
            </div>
          </div>

          <div className="px-4 py-16 sm:px-6 lg:px-8 sm:py-24">
            <div>
              <p className="max-w-2xl tracking-wide text-gray-500">
                Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam
                suspendisse morbi eleifend faucibus eget vestibulum felis.
                Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam.
                Mauris posuere vulputate arcu amet, vitae nisi, tellus
                tincidunt. At feugiat sapien varius id.
              </p>
              <p className="max-w-2xl mt-6 tracking-wide text-gray-500">
                Eget quis mi enim, leo lacinia pharetra, semper. Eget in
                volutpat mollis at volutpat lectus velit, sed auctor. Porttitor
                fames arcu quis fusce augue enim. Quis at habitant diam at.
                Suscipit tristique risus, at donec. In turpis vel et quam
                imperdiet. Ipsum molestie aliquet sodales id est ac volutpat.
              </p>
            </div>
            <div className="mt-12">
              <h3 className="mb-6 text-2xl font-semibold">
                What information do we collect?
              </h3>
              <p className="max-w-2xl tracking-wide text-gray-500">
                Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum,
                nulla odio nisl vitae. In aliquet pellentesque aenean hac
                vestibulum turpis mi bibendum diam. Tempor integer aliquam in
                vitae malesuada fringilla.
              </p>
              <p className="max-w-2xl mt-6 tracking-wide text-gray-500">
                Elit nisi in eleifend sed nisi. Pulvinar at orci, proin
                imperdiet commodo consectetur convallis risus. Sed condimentum
                enim dignissim adipiscing faucibus consequat, urna. Viverra
                purus et erat auctor aliquam. Risus, volutpat vulputate posuere
                purus sit congue convallis aliquet. Arcu id augue ut feugiat
                donec porttitor neque. Mauris, neque ultricies eu vestibulum,
                bibendum quam lorem id. Dolor lacus, eget nunc lectus in tellus,
                pharetra, porttitor.
              </p>
              <p className="max-w-2xl mt-6 tracking-wide text-gray-500">
                Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim
                mauris id. Non pellentesque congue eget consectetur turpis.
                Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt
                aenean tempus. Quis velit eget ut tortor tellus. Sed vel, congue
                felis elit erat nam nibh orci.
              </p>
            </div>

            <div className="mt-12">
              <h3 className="mb-6 text-2xl font-semibold">
                How do we use your information?
              </h3>
              <p className="max-w-2xl tracking-wide text-gray-500">
                Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum,
                nulla odio nisl vitae. In aliquet pellentesque aenean hac
                vestibulum turpis mi bibendum diam. Tempor integer aliquam in
                vitae malesuada fringilla.
              </p>
              <p className="max-w-2xl mt-6 tracking-wide text-gray-500">
                Elit nisi in eleifend sed nisi. Pulvinar at orci, proin
                imperdiet commodo consectetur convallis risus. Sed condimentum
                enim dignissim adipiscing faucibus consequat, urna. Viverra
                purus et erat auctor aliquam. Risus, volutpat vulputate posuere
                purus sit congue convallis aliquet. Arcu id augue ut feugiat
                donec porttitor neque. Mauris, neque ultricies eu vestibulum,
                bibendum quam lorem id. Dolor lacus, eget nunc lectus in tellus,
                pharetra, porttitor.
              </p>
              <p className="max-w-2xl mt-6 tracking-wide text-gray-500">
                Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim
                mauris id. Non pellentesque congue eget consectetur turpis.
                Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt
                aenean tempus. Quis velit eget ut tortor tellus. Sed vel, congue
                felis elit erat nam nibh orci.
              </p>
            </div>

            <div className="mt-12">
              <h4 className="mb-6 text-xl font-semibold">
                Do we use cookies and other tracking technologies?
              </h4>
              <p className="max-w-2xl tracking-wide text-gray-500">
                Pharetra morbi libero id aliquam elit massa integer tellus. Quis
                felis aliquam ullamcorper porttitor. Pulvinar ullamcorper sit
                dictumst ut eget a, elementum eu. Maecenas est morbi mattis id
                in ac pellentesque ac.
              </p>
            </div>
            <div className="mt-12">
              <h4 className="mb-6 text-xl font-semibold">
                How long do we keep your information?
              </h4>
              <p className="max-w-2xl tracking-wide text-gray-500">
                Pharetra morbi libero id aliquam elit massa integer tellus. Quis
                felis aliquam ullamcorper porttitor. Pulvinar ullamcorper sit
                dictumst ut eget a, elementum eu. Maecenas est morbi mattis id
                in ac pellentesque ac.
              </p>
            </div>
            <div className="mt-12">
              <h4 className="mb-6 text-xl font-semibold">
                How do we keep your information safe?
              </h4>
              <p className="max-w-2xl tracking-wide text-gray-500">
                Pharetra morbi libero id aliquam elit massa integer tellus. Quis
                felis aliquam ullamcorper porttitor. Pulvinar ullamcorper sit
                dictumst ut eget a, elementum eu. Maecenas est morbi mattis id
                in ac pellentesque ac.
              </p>
            </div>

            <div className="mt-12">
              <h3 className="mb-6 text-2xl font-semibold">
                What are your privacy rights?
              </h3>
              <p className="max-w-2xl tracking-wide text-gray-500">
                Pharetra morbi libero id aliquam elit massa integer tellus. Quis
                felis aliquam ullamcorper porttitor. Pulvinar ullamcorper sit
                dictumst ut eget a, elementum eu. Maecenas est morbi mattis id
                in ac pellentesque ac.
              </p>
            </div>
            <div className="mt-12">
              <h4 className="mb-6 text-xl font-semibold">
                How can you contact us about this policy?
              </h4>
              <p className="max-w-2xl tracking-wide text-gray-500">
                Sagittis et eu at elementum, quis in. Proin praesent volutpat
                egestas sociis sit lorem nunc nunc sit. Eget diam curabitur mi
                ac. Auctor rutrum lacus malesuada massa ornare et. Vulputate
                consectetur ac ultrices at diam dui eget fringilla tincidunt.
                Arcu sit dignissim massa erat cursus vulputate gravida id. Sed
                quis auctor vulputate hac elementum gravida cursus dis.
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

export default DocsMain
