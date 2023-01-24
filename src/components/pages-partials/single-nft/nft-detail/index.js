import { Fragment, useEffect, useState } from 'react'
import { BadgeCheckIcon } from '@heroicons/react/solid'
import { Tab } from '@headlessui/react'
import { ProductsCarouselCard } from '@/components/ui/cards'
import { useRouter } from 'next/router'
import {
  doc,
  getDoc,
  query,
  collection,
  orderBy,
  getDocs,
} from 'firebase/firestore'
import { firebaseDb } from '@/firebase/init'
import usePriceConverter from '@/hooks/usePriceConverter'
import useArtistData from '@/hooks/useArtistData'
import NextLink from 'next/link'
import HistoryComp from './HistoryCom'
import Spinner from '@/components/ui/spinner'
import { getUsersData } from '@/services/relysia-queries'
import Image from 'next/image'
import { AvatarWithName } from '@/components/ui/avatars'

const transactionData = {
  protocol: {
    name: 'Protocol',
    content: 'STAS',
  },
  schema: {
    name: 'Schema_id',
    content: 'NFT1.0',
  },
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NftDetail({ favouriteNfts, setFavouriteNfts }) {
  const router = useRouter()
  const { slug } = router.query
  const [nftData, setnftData] = useState(null)
  const [nftHistory, setnftHistory] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const usdBalance = usePriceConverter()
  const artistData = useArtistData(nftData?.ownerId)

  useEffect(() => {
    if (slug) {
      getNftData()
      getNftHistory()
    }
  }, [slug])

  const getNftData = async () => {
    const docRef = doc(firebaseDb, 'nfts', slug)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists() && docSnap.data()) {
      setnftData(docSnap.data())
    }
  }

  const getNftHistory = async () => {
    const q = query(
      collection(firebaseDb, 'nfts', slug, 'nftHistory'),
      orderBy('timestamp', 'desc'),
    )
    const querySnapshot = await getDocs(q)
    let hisArr = []
    querySnapshot.forEach((doc) => {
      hisArr.push({ ...doc.data() })
    })

    for await (const [index, data] of hisArr.entries()) {
      if (data.type === 'PURCHASE') {
        await getUsersData(data.purchaserId).then((res) => {
          hisArr[index] = {
            ...data,
            profileImage: res?.profileImage,
            username: res?.name,
            name: res?.name,
          }
        })
      } else if (data.type === 'MINT') {
        await getUsersData(data.minterId).then((res) => {
          hisArr[index] = {
            ...data,
            profileImage: res?.profileImage,
            username: res?.username,
            name: res?.name,
          }
        })
      }
    }

    setnftHistory([...hisArr])
    setIsLoading(false)
  }

  return (
    <div className="bg-white">
      <div className="px-4 py-8 mx-auto mb-12 lg:mb-0 lg:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        {/* Product */}
        <div className="lg:grid lg:grid-rows-1 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-10 ">
          {/* Product image */}
          <div className="lg:row-end-1 lg:col-span-5">
            <ProductsCarouselCard
              data={nftData}
              setData={setnftData}
              usdBalance={usdBalance}
              singleNFT={true}
              setnftHistory={setnftHistory}
              favouriteNfts={favouriteNfts}
              setFavouriteNfts={setFavouriteNfts}
            />
          </div>

          {/* Product details */}
          <div className="w-full max-w-2xl mx-auto mt-14 sm:mt-16 lg:max-w-none lg:mt-0 lg:row-end-2 lg:row-span-2 lg:col-span-6">
            <div className="flex flex-col">
              <div>
                <span className="inline-flex items-center px-[10.2px] py-1 rounded-full text-sm font-medium bg-[#F2F4F7] text-[#667085]">
                  <BadgeCheckIcon className="-ml-1 mr-1.5 h-4 w-4 text-[#0788F5]" />
                  Verified
                </span>
              </div>

              <div className="flex items-center mt-4 space-x-4">
                <NextLink
                  href={`/user/${artistData?.username}`}
                  className="h-8"
                >
                  <a>
                    {artistData?.profileImage ? (
                      <Image
                        src={artistData?.profileImage}
                        alt="vaionex-mini-icon"
                        width={32}
                        height={32}
                        className="w-8 h-8 bg-gray-100 rounded-full"
                      />
                    ) : (
                      <AvatarWithName
                        className="w-8 h-8 text-sm rounded-full"
                        name={artistData?.name}
                      />
                    )}
                  </a>
                </NextLink>
                <NextLink href={`/user/${artistData?.username}`}>
                  <a>
                    <span className="text-lg font-medium my-auto text-[#155EEF]">
                      {artistData?.name}
                    </span>
                  </a>
                </NextLink>
              </div>

              <div className="mt-4">
                <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                  {nftData?.name}
                </h1>

                <h2 id="information-heading" className="sr-only">
                  Product information
                </h2>
              </div>
            </div>

            <p className="mt-6 text-xl font-normal text-[#667085] leading-[30px] max-w-[480px]">
              {nftData?.description}
            </p>
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
                      <dt className="text-[#344054]">
                        Contract Transaction ID
                      </dt>
                      <dd className="mb-5 text-[#667085]">
                        <a
                          href={
                            'https://whatsonchain.com/tx/' +
                            nftData?.contractTxid
                          }
                          target="_blank"
                          className="hover:underline hover:text-blue-600"
                          rel="noopener noreferrer"
                        >
                          {nftData?.contractTxid}
                        </a>
                      </dd>
                      <dt className="text-[#344054]">
                        Issuance Transaction ID
                      </dt>
                      <dd className="mb-5 text-[#667085]">
                        <a
                          href={
                            'https://whatsonchain.com/tx/' + nftData?.issueTxid
                          }
                          className="hover:underline hover:text-blue-600"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {nftData?.issueTxid}
                        </a>
                      </dd>
                      <dt className="text-[#344054]">
                        {transactionData.protocol.name}
                      </dt>
                      <dd className="mb-5 text-[#667085]">
                        {transactionData.protocol.content}
                      </dd>
                      <dt className="text-[#344054]">
                        {transactionData.schema.name}
                      </dt>
                      <dd className="text-[#667085]">
                        {transactionData.schema.content}
                      </dd>
                    </dl>
                  </Tab.Panel>

                  <Tab.Panel className="relative text-sm h-[280px] max-h-[280px] overflow-visible text-gray-500">
                    {/* <div className="absolute z-20 top-44 -bottom-12 -right-12 -left-12 pale-gradient" />
                    <div className="absolute z-20 top-44 -bottom-12 -right-12 -left-12 pale-gradient-left" />
                    <div className="absolute z-20 top-44 -bottom-12 -right-12 -left-12 pale-gradient-bottom" />
                    <h3 className="sr-only">Frequently Asked Questions</h3> */}
                    <div className="overflow-scroll h-[300px] max-h-[300px]">
                      {!isLoading && (
                        <>
                          {nftHistory.map((data, idx) => (
                            <HistoryComp key={idx} data={data} index={idx} />
                          ))}
                          {nftHistory.length === 0 && (
                            <div className="mt-2">No history found</div>
                          )}
                        </>
                      )}
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
