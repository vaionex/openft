import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import TokenInfoCard from '../cards/token-info-card'
import NFTSellForm from '../nft-sell-form'

const ModalNFTSell = ({
  className,
  isOpen,
  setIslive,
  onClose,
  data,
  setRefresh,
  refresh,
  usdBalance,
}) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 z-[30] transition-opacity bg-gray-500 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-30 overflow-y-auto mx-auto">
          <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={`relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl w-full max-w-lg md:max-w-6xl  md:m-8 ${className} `}
              >
                <div className="flex flex-col md:flex-row p-6 sm:p-8 lg:p-16 gap-8">
                  <div className="w-full">
                    <div className="relative max-w-sm mx-auto md:mx-0 border border-gray-200 group rounded-xl flex flex-col">
                      <TokenInfoCard
                        data={data}
                        type="list"
                        view="product"
                        isInFirstThree={true}
                        usdBalance={usdBalance}
                      />
                    </div>
                  </div>

                  <div className="mx-auto md:mx-0 max-w-sm md:max-w-full w-full">
                    <div className="space-y-4 mb-8">
                      <h3 className="uppercase text-3xl text-azul">
                        Sell Your NFT
                      </h3>
                      <p className="text-mirage font-medium">
                        Unlock the potential of your digital assets.
                      </p>
                      <p className="text-mirage font-medium">
                        Connect with buyers and sellers form around the world,
                        and take the first step towards monetizing your unique
                        digital creations.
                      </p>
                    </div>
                    <NFTSellForm
                      setIslive={setIslive}
                      onClose={onClose}
                      data={data}
                      setRefresh={setRefresh}
                      refresh={refresh}
                    />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default ModalNFTSell
