import SharedLayout from '@/components/layout/shared-layout'
import Image from 'next/image'
import NextLink from 'next/link'

const DocsMain = () => {
  return (
    <SharedLayout title="Privacy Policy">
      <div className="py-16 sm:py-24">
        <div className="relative flex flex-col justify-between max-w-md px-4 mx-auto sm:max-w-4xl sm:px-6">
          <div className="px-4 mx-auto text-center sm:px-6 lg:px-8">
            <div>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Docs
              </h2>
            </div>
          </div>

          <div className="px-4 py-8 mx-auto sm:px-6 lg:px-8">
            <div>
              <p className="max-w-2xl tracking-wide text-gray-500">
                Nftana is a marketplace for Non-Fungible Tokens (NFTs), which
                are digital assets that represent ownership of a unique item,
                such as artwork, music, videos, luxury goods, concert tickets,
                cars, houses and more. The platform allows creators to mint
                their own NFTs and sell them to buyers on the open marketplace.
              </p>
              <p className="max-w-2xl mt-6 tracking-wide text-gray-500">
                The platform is open source with the code available at:{' '}
                <a
                  href="https://github.com/vaionex/openft"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold underline"
                >
                  Nftana Github
                </a>
                . Anyone can build their own version of NFTana that builds upon
                the foundation that Nftana provides. There is unlimited
                potential for creative NFT & Token exchanges that open up new
                opportunities for creators and consumers.
              </p>
            </div>
            <div className="mt-6">
              <p className="max-w-2xl tracking-wide text-gray-500">
                The process of minting an NFT on Nftana is simple and
                straightforward. First, creators must upload their artwork,
                along with a name, description, and price for the NFT. Once the
                artwork has been uploaded and the information has been filled
                out, the NFT is minted and added to your wallet. You can then
                list it on the marketplace.
              </p>
            </div>
            <div className="mt-6">
              <p className="max-w-2xl tracking-wide text-gray-500">
                Buyers can browse the marketplace and view the available NFTs.
                When a buyer finds an NFT they are interested in, they can
                purchase it using Bitcoin SV or tokenized currency. Once the
                transaction is complete, the buyer becomes the new owner of the
                NFT.
              </p>
            </div>
            <div className="mt-6">
              <p className="max-w-2xl tracking-wide text-gray-500">
                An important aspect of Nftana is that it provides a platform for
                creators to showcase their work and reach new audiences. NFTs
                provide a new way for creators to monetize their work and gain
                recognition for their talents. Additionally, the platform allows
                creators to build a community around their work, connecting with
                fans and other creators.
              </p>
            </div>
            <div className="mt-6">
              <p className="max-w-2xl tracking-wide text-gray-500">
                We use the STAS token solution to enable creators and users to
                mint, transfer, and redeem tokens using native Bitcoin based
                STAS scripts.
              </p>
            </div>
            <div className="mt-6">
              <p className="max-w-2xl tracking-wide text-gray-500">
                The STAS script uses the Bitcoin (BSV) protocol, a
                permissionless public blockchain protocol that makes any asset
                decentralized once processed and removes the need for any third
                parties to be involved in moving said asset back and forth. A
                token can represent a contractual claim over an asset and allow
                any type of information and / or data to be tokenized.
              </p>
            </div>
            <div className="mt-6">
              <p className="max-w-2xl tracking-wide text-gray-500">
                The STAS digital asset tokenization is an on-chain native
                Bitcoin script-based solution. It enables you to build token
                solutions for any number of use cases. You can read the
                whitepaper at the link below:
              </p>
            </div>
            <div className="mt-6">
              <p className="max-w-2xl tracking-wide text-gray-500">
                <a
                  href="https://www.taal.com/wp-content/uploads/2022/01/STAS_White-Paper_20211214_1.0_Finalweb4.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold underline"
                >
                  STAS White Paper
                </a>
              </p>
            </div>
            <div className="mt-6">
              <p className="max-w-2xl tracking-wide text-gray-500">
                In addition, Nftana also provides a way for buyers to collect
                unique and one-of-a-kind digital assets. NFTs are unique and
                cannot be replicated, making them highly sought after by
                collectors. Additionally, NFTs provide a way for buyers to
                support and invest in the work of the creators they admire.
              </p>
            </div>
            <div className="mt-6">
              <p className="max-w-2xl tracking-wide text-gray-500">
                In conclusion, NFTANA is an innovative and user-friendly
                platform that allows creators to mint and sell their own NFTs,
                and buyers to purchase and own unique digital assets. It&#39;s a
                great way for creators to monetize their work and reach new
                audiences, while providing a safe and secure platform for buying
                and selling NFTs. It also allows collectors to invest in unique
                and one-of-a-kind digital assets and support the creators they
                admire.
              </p>
            </div>
          </div>
        </div>
        <div
          aria-labelledby="faq-contact"
          className="px-4 mx-auto mt-8 max-w-7xl sm:px-6 lg:px-8"
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
