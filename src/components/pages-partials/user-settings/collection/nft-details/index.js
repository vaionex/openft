//import ModifiedButton from '@/components/ui/modified-button'
import { useState } from 'react'
import Modal from '@/components/ui/modal-confirm'
import useRedeemToken from '@/hooks/useReedemToken'
import { InputMain } from '@/components/ui/inputs'
import useYupValidationResolver from '@/hooks/useYupValidationResolver'
import validationSchema from './validationScheme'
import { useForm, Controller } from 'react-hook-form'
import Notification from '@/components/ui/notification'
import { ArrowSmUpIcon } from '@heroicons/react/outline'
import NextLink from 'next/link'
import Image from 'next/image'

export default function Details({ nft }) {
  const { redeemToken, loading, error } = useRedeemToken()
  const [isDeposit, setIsDeposit] = useState(false)
  const [destroyButton, setDestroyButton] = useState(true)
  const [notificationStatus, setNotificationStatus] = useState({
    state: false,
    message: 'message is here',
    type: 'success',
  })
  const resolver = useYupValidationResolver(validationSchema)
  const { control, handleSubmit, formState, reset, watch } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver,
  })

  const handleRedeemToken = async () => {
    const { error } = await redeemToken(
      nft.tokenId,
      nft.satsPerToken,
      nft.totalSupply,
    )
    if (error)
      return setNotificationStatus((state) => ({
        ...state,
        message:
          'We were unable to destroy your token. Please try again later,',
        type: 'fail',
        state: true,
      }))

    await router.push('/tokens')
  }

  const destroyInputChange = (value) => {
    if (value === 'destroy') {
      setDestroyButton(false)
    } else {
      setDestroyButton(true)
    }
  }

  return (
    <>
      <div className="min-h-full">
        <main className="py-10">
          {/* Page header */}

          <Notification
            message={notificationStatus.message}
            bool={notificationStatus.state}
            setter={setNotificationStatus}
            type={notificationStatus.type}
          />
          <Modal
            isOpen={isDeposit}
            setIsOpen={() => setIsDeposit(false)}
            title={'Permanently Destroy Token'}
          >
            <div className="py-2 mx-auto max-w-xs text-white">
              <form
                className="w-full max-w-xs space-y-6"
                onSubmit={handleSubmit(handleRedeemToken)}
              >
                {' '}
                <p className="py-4 text-gray-400">
                  You are about to permanently destroy this token. This action
                  is not reversible. To permanently destroy this token, type{' '}
                  <span className="text-white font-semibold">
                    &quot;destroy&quot;
                  </span>{' '}
                  in the input below
                </p>
                <InputMain className="relative pb-0 border-none">
                  <Controller
                    control={control}
                    name="destroy"
                    render={({ field }) => {
                      return (
                        <InputMain.Input
                          id="destroy"
                          placeholder="Please type 'destroy'"
                          className="mb-8 sm:mb-4 text-black"
                          type="text"
                          onChange={(e) =>
                            field.onChange(() =>
                              destroyInputChange(e.target.value),
                            )
                          }
                        />
                      )
                    }}
                  />
                </InputMain>
                {/* <ModifiedButton
                  text={'Permanently destroy token'}
                  type="submit"
                  isDisable={destroyButton}
                  isPending={loading}
                /> */}
              </form>
            </div>
          </Modal>
          <div className="mt-8 grid max-w-3xl grid-cols-1 gap-6 px-4 sm:px-6 lg:px-8 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2 lg:col-start-1">
              {/* Description list*/}
              <section aria-labelledby="applicant-information-title">
                <div className="bg-gray-50 shadow sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          NFT Name
                        </dt>
                        <dd className="mt-1 text-sm text-gray-400 break-all">
                          {nft.name}
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Symbol
                        </dt>
                        <dd className="mt-1 text-sm text-gray-400">
                          {nft.symbol}
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Token_id
                        </dt>
                        <dd className="mt-1 text-sm text-gray-400 break-all">
                          {nft.token_id}
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Schema_id
                        </dt>
                        <dd className="mt-1 text-sm text-gray-400">
                          {nft.properties?.meta?.schemaId}
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Total supply
                        </dt>
                        <dd className="mt-1 text-sm text-gray-400">
                          {nft.total_supply}
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Sats per token
                        </dt>
                        <dd className="mt-1 text-sm text-gray-400">
                          {nft.sats_per_token}
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Contract txs
                        </dt>
                        <dd className="mt-1 text-sm text-gray-400 break-all">
                          <a
                            href={`https://whatsonchain.com/tx/${nft.contract_txs[0]}`}
                            rel="noopener noreferrer"
                            className="underline flex underline-offset-2 decoration-gray-700"
                          >
                            {nft.contract_txs[0]}
                            <ArrowSmUpIcon className="relative w-5 h-5 shrink-0 text-gray-500 transform rotate-45 cursor-pointer" />
                          </a>
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Issuance txs
                        </dt>
                        <dd className="mt-1 text-sm text-gray-400 break-all">
                          <a
                            href={`https://whatsonchain.com/tx/${nft.issuance_txs}`}
                            rel="noopener noreferrer"
                            className="underline flex underline-offset-2 decoration-gray-700"
                          >
                            {nft.issuance_txs}
                            <ArrowSmUpIcon className="relative w-5 h-5 shrink-0 text-gray-500 transform rotate-45 cursor-pointer" />
                          </a>
                        </dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">
                          Properties
                        </dt>
                        <dd className="mt-1 text-sm text-gray-400 break-all">
                          {JSON.stringify(nft.properties)}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </section>

              {/* Comments*/}
            </div>

            <section
              aria-labelledby="timeline-title"
              className="lg:col-span-1 lg:col-start-3"
            >
              <div className="relative w-full overflow-hidden bg-gray-200 rounded-t-xl aspect-w-square aspect-h-square group-hover:opacity-75">
                <NextLink href={`/`}>
                  <a className="cursor-pointer">
                    <>
                      <Image
                        src={nft.image || ''}
                        alt={nft?.name}
                        layout="fill"
                        className="absolute inset-0 object-cover object-center w-full h-full"
                      />
                      <div className="absolute inset-0 h-full bg-gradient-to-tr opacity-10 from-slate-900 to-slate-600 mix-blend-multiply" />
                    </>
                  </a>
                </NextLink>
              </div>
              <div className="bg-gray-50 px-4 py-5 shadow sm:rounded-lg sm:px-6">
                <h2
                  id="timeline-title"
                  className="text-lg font-medium text-indigo-600"
                >
                  <span className="inline-flex items-center rounded-md bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-indigo-600">
                    <svg
                      className="-ml-0.5 mr-1.5 h-2 w-2 text-indigo-400"
                      fill="currentColor"
                      viewBox="0 0 8 8"
                    >
                      <circle cx={4} cy={4} r={3} />
                    </svg>
                    Transactions
                  </span>
                </h2>

                {/* Activity Feed */}
                <div className="mt-6 flow-root">
                  <ul role="list" className="-mb-8">
                    {nft.issuance_txs.map((item, itemIdx) => (
                      <li key={itemIdx}>
                        <div className="relative pb-8">
                          {itemIdx !== nft.issuance_txs.length - 1 ? (
                            <span
                              className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-indigo-200"
                              aria-hidden="true"
                            />
                          ) : null}
                          <div className="relative flex space-x-3 ">
                            <div>
                              <span
                                className={
                                  'bg-indigo-500 h-8 w-8 rounded-full text-xs text-white flex items-center justify-center ring-8 ring-bg-indigo-500'
                                }
                              >
                                T{itemIdx}
                              </span>
                            </div>
                            <div className="flex min-w-0 flex-1 space-x-4 pt-1.5">
                              <div>
                                <a
                                  href={`https://whatsonchain.com/tx/${item}`}
                                  rel="noopener noreferrer"
                                  className="underline flex underline-offset-2 decoration-gray-700 text-sm break-all text-gray-500"
                                >
                                  {item}
                                  <ArrowSmUpIcon className="relative w-5 h-5 shrink-0 text-gray-500 transform rotate-45 cursor-pointer" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  )
}
