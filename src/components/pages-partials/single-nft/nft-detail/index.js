import { Fragment, useEffect, useState } from 'react'
import { BadgeCheckIcon } from '@heroicons/react/solid'
import { Tab } from '@headlessui/react'
import { ProductsCarouselCard } from '@/components/ui/cards'
import { useRouter } from 'next/router'
import { doc, getDoc } from 'firebase/firestore'
import { firebaseDb } from '@/firebase/init'

const product = {
  name: 'Little ghost',
  description:
    'The Little Ghost lives in the castle Eulenstein. Its best friend is an eagle-owl Schuhu. By shaking its bunch of keys, the Little Ghost can open everything that it wants, either a door or a treasure chest, without touching it. The biggest wish of the Little Ghost is to see the world during daylight.',
}
const transactionData = {
  protocol: {
    name: 'Protocol',
    content: 'STAS',
  },
  schema: {
    name: 'Schema_id',
    content: 'NFT1.0/MA',
  },
}
const purchaseData = [
  {
    title: 'No 8/8 NFT minted 4 months ago',
    buyer: 'by Vaionex Art',
  },
  {
    title: 'No 8/8 NFT minted 4 months ago',
    buyer: 'by Vaionex Art',
  },
  {
    title: 'No 8/8 NFT minted 4 months ago',
    buyer: 'by Vaionex Art',
  },
  {
    title: 'No 8/8 NFT minted 4 months ago',
    buyer: 'by Vaionex Art',
  },
  {
    title: 'No 8/8 NFT minted 4 months ago',
    buyer: 'by Vaionex Art',
  },
]

const nftDataStatic = {
  id: 6,
  name: 'Basic Tee',
  href: '5',
  imageSrc: '/images/mock-carousel/Image_1.png',
  imageAlt: "Front of men's Basic Tee in black.",
  price: '$35',
  priceType: 'BSV 1',
  color: 'Black',
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NftDetail() {
  const router = useRouter()
  const { slug } = router.query
  const [nftData, setnftData] = useState(null)

  useEffect(() => {
    if (slug) {
      getNftData()
    }
  }, [slug])

  const getNftData = async () => {
    const docRef = doc(firebaseDb, 'nfts', slug)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists() && docSnap.data()) {
      console.log('Document data:', docSnap.data())
      setnftData(docSnap.data())
    }
  }

  return (
    <div className="bg-white">
      <div className="px-4 py-8 mx-auto mb-12 lg:mb-0 lg:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        {/* Product */}
        <div className="lg:grid lg:grid-rows-1 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-10 ">
          {/* Product image */}
          <div className="lg:row-end-1 lg:col-span-5">
            <ProductsCarouselCard data={nftData} />
          </div>

          {/* Product details */}
          <div className="max-w-2xl mx-auto mt-14 sm:mt-16 lg:max-w-none lg:mt-0 lg:row-end-2 lg:row-span-2 lg:col-span-6">
            <div className="flex flex-col">
              <div>
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-500">
                  <BadgeCheckIcon className="-ml-1 mr-1.5 h-4 w-4 text-blue-600" />
                  Verified
                </span>
              </div>
              <div className="flex items-center py-3 mt-3 space-x-4">
                <img
                  src={'/images/mini-vaionex.webp'}
                  alt="vaionex-mini-icon"
                  className="w-8 h-8 bg-gray-100 rounded-full"
                />
                <span className="text-lg font-medium text-blue-600">
                  Vaionex Art
                </span>
              </div>
              <div className="mt-4">
                <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                  {nftData?.name}
                </h1>

                <h2 id="information-heading" className="sr-only">
                  Product information
                </h2>
              </div>
            </div>

            <p className="mt-6 text-gray-500">{nftData?.description}</p>
            <div className="mt-3">
              <Tab.Group as="div">
                <div className="border-b border-gray-200">
                  <Tab.List className="flex -mb-px space-x-8">
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          selected
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-gray-700 hover:text-gray-800 hover:border-gray-300',
                          'outline-none whitespace-nowrap py-6 border-b-2 font-medium text-sm',
                        )
                      }
                    >
                      Transactions ID
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          selected
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-gray-700 hover:text-gray-800 hover:border-gray-300',
                          'outline-none whitespace-nowrap py-6 border-b-2 font-medium text-sm',
                        )
                      }
                    >
                      Purchase History
                    </Tab>
                  </Tab.List>
                </div>
                <Tab.Panels as={Fragment}>
                  <Tab.Panel className="">
                    <h3 className="sr-only">Transactions Information</h3>

                    <dl className="flex flex-col text-sm font-medium text-gray-500 break-all mt-7">
                      <dt className="text-gray-700">Contract Transaction ID</dt>
                      <dd className="mb-5">
                        <a
                          href={
                            'https://whatsonchain.com/tx/' +
                            nftData?.contractTxid
                          }
                          target="_blank"
                          class="hover:underline hover:text-blue-600"
                          rel="noopener"
                        >
                          {nftData?.contractTxid}
                        </a>
                      </dd>
                      <dt className="text-gray-700">Issuance Transaction ID</dt>
                      <dd className="mb-5">
                        <a
                          href={
                            'https://whatsonchain.com/tx/' + nftData?.issueTxid
                          }
                          class="hover:underline hover:text-blue-600"
                          target="_blank"
                          rel="noopener"
                        >
                          {nftData?.issueTxid}
                        </a>
                      </dd>
                      <dt className="text-gray-700">
                        {transactionData.protocol.name}
                      </dt>
                      <dd className="mb-5">
                        {transactionData.protocol.content}
                      </dd>
                      <dt className="text-gray-700">
                        {transactionData.schema.name}
                      </dt>
                      <dd>{transactionData.schema.content}</dd>
                    </dl>
                  </Tab.Panel>

                  <Tab.Panel className="relative text-sm h-[280px] max-h-[280px] overflow-visible text-gray-500">
                    <div className="absolute z-20 top-44 -bottom-12 -right-12 -left-12 pale-gradient" />
                    <div className="absolute z-20 top-44 -bottom-12 -right-12 -left-12 pale-gradient-left" />
                    <div className="absolute z-20 top-44 -bottom-12 -right-12 -left-12 pale-gradient-bottom" />
                    <h3 className="sr-only">Frequently Asked Questions</h3>
                    <div className="overflow-scroll h-[300px] max-h-[300px]">
                      {purchaseData.map((data, idx) => (
                        <div
                          className="flex items-center mt-4 space-x-2"
                          key={idx}
                        >
                          <div>
                            <img
                              src={'/images/mini-vaionex.webp'}
                              alt="vaionex-mini-icon"
                              className="bg-gray-100 rounded-full w-9 h-9"
                            />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 ">
                              {data.title}
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <p className="font-medium text-blue-700">
                                  {data.buyer}
                                </p>
                                <img
                                  src={'/images/chain.webp'}
                                  alt="vaionex-mini-icon"
                                  className="object-cover h-5 bg-gray-100 rounded-full w-1-"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
