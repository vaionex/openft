import { useEffect, useState } from 'react'
import { CopyDIcon, SvgDiamondIcon } from '@/components/common/icons'
import UserSettingsLayout from '@/components/layout/user-settings-layout'
import { InputMain } from '@/components/ui/inputs'
import ProgressCircular from '@/components/ui/progress-circular'
import { ArrowSmUpIcon } from '@heroicons/react/outline'
import walletSelector from '@/redux/selectors/wallet'
import Spinner from '@/components/ui/spinner'
import ModalConfirm from '@/components/ui/modal-confirm'
import apiConfig from '@/config/relysiaApi'
import { QRCodeSVG } from 'qrcode.react'
import { useForm, Controller } from 'react-hook-form'
import useYupValidationResolver from '@/hooks/useYupValidationResolver'
import {
  metricsApiWithoutBody,
  getwalletDetails,
} from '@/services/relysia-queries'
import { useSelector, useDispatch } from 'react-redux'
import validationSchema from './validationScheme'
import Alert from '@/components/ui/alert'
import usePriceConverter from '@/hooks/usePriceConverter'
import {
  SvgDirectInboxIcon,
  SvgDirectBoxSend,
  SvgCheckCircleIcon,
  SvgExternalLinkIcon,
  SvgAscendingIcon,
} from '@/components/common/icons'
import moment from 'moment'
import userSelector from '@/redux/selectors/user'
import { firebaseGetUserByPaymail } from '@/firebase/utils'
import { SendNotification } from '@/services/novu-notifications'
import { updateUser } from '@/redux/slices/user'
import _ from 'lodash'
import { RefreshIcon } from '@heroicons/react/outline'
import { getwalletBal, getwalletHistory } from '@/services/relysia-queries'
import { async } from '@firebase/util'

const inputAttributes = [
  { type: 'text', placeholder: 'Address or paymail', name: 'address' },
  { type: 'number', placeholder: 'Amount to transfer in $', name: 'amount' },
]

const UserSettingsWalletSection = () => {
  const dispatch = useDispatch()

  const bsvRate = usePriceConverter()
  const [loading, setLoading] = useState(true)
  const [isDeposit, setIsDeposit] = useState(false)
  const [txHistory, setTxHistory] = useState([])
  const [txLoading, setTxLoading] = useState(true)

  const [isSend, setIsSend] = useState(false)
  const [usdBalance, setUsdBalance] = useState(0)
  const [msg, setMsg] = useState(null)
  const [isAscending, setIsAscending] = useState(false)
  const [balanceLoading, setbalanceLoading] = useState(false)
  const [transLoading, settransLoading] = useState(false)

  const { paymail, address, balance, wallethistory } =
    useSelector(walletSelector)
  const { currentUser } = useSelector(userSelector)
  // const resolver = useYupValidationResolver(validationSchema)
  const { control, handleSubmit, formState, reset } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    // resolver,
  })
  const { isSubmitting, isValid, errors } = formState
  const onSubmit = async (data) => {
    try {
      const amount = data.amount ? parseFloat(data.amount) : 0
      console.log(usdBalance, amount)
      if (usdBalance < amount) {
        return setMsg({
          type: 'error',
          content: 'Please enter a valid value',
        })
      }
      const dataObj = {
        dataArray: [
          {
            to: data.address,
            amount: Number((Number(amount) / bsvRate).toFixed(8)),
            notes: `sending to ${data.address}`,
            type: 'BSV',
          },
        ],
      }

      const transactionRes = await apiConfig('/v1/send', {
        method: 'post',
        data: dataObj,
        header: {
          walletID: '00000000-0000-0000-0000-000000000000',
        },
      })
      console.log('transactionRes', transactionRes)
      if (
        transactionRes &&
        transactionRes.data &&
        transactionRes.data.data &&
        transactionRes.data.data.txIds &&
        transactionRes.data.data.txIds[0]
      ) {
        reset({ address: '', amount: '' })
        setMsg({ type: 'success', content: 'The transfer was successful' })

        const senderMessage = `${Number(
          (Number(amount) / bsvRate).toFixed(8),
        )} sent to ${data.address}`
        const receiverMessage = `${Number(
          (Number(amount) / bsvRate).toFixed(8),
        )} received from ${currentUser.name}`
        SendNotification(currentUser.uid, senderMessage)
        SendNotificationByPaymail(data.address, receiverMessage)

        // setTimeout(() => {
        //   getwalletDetails('00000000-0000-0000-0000-000000000000', dispatch)
        // }, 2000)
      }
    } catch (err) {
      await metricsApiWithoutBody()
      console.log('err', err.message, err.response, err)
      let errMsg =
        err &&
        err.response &&
        err.response.data &&
        err.response.data.data &&
        err.response.data.data.msg
          ? err.response.data.data.msg
          : null
      if (
        err &&
        err.response &&
        err.response.data &&
        err.response.data.data &&
        err.response.data.data.msg
      ) {
        errMsg = err.response.data.data.msg
        console.log(errMsg)
        setMsg({ type: 'error', content: errMsg })
      } else {
        errMsg =
          'Something went wrong while your transaction was being performed.'
        setMsg({ type: 'error', content: errMsg })
      }
    }
  }

  useEffect(() => {
    if (balance !== null && bsvRate) {
      if (balance > 0) {
        setUsdBalance((balance * bsvRate).toFixed(2))
        setLoading(false)
      } else {
        setLoading(false)
      }
    }
  }, [balance, bsvRate])

  useEffect(() => {
    if (wallethistory.length > 0) {
      const walHistory = _.sortBy(wallethistory, (num) =>
        num.timestamp.toLowerCase(),
      ).reverse()
      setTxHistory(walHistory)
      setTxLoading(false)
    } else {
      setTxLoading(false)
    }
  }, [wallethistory])

  useEffect(() => {
    if (!currentUser.paymail) {
      dispatch(
        updateUser({
          uid: currentUser.uid,
          values: { paymail: paymail },
        }),
      )
    }
  }, [])

  const getTxName = (type, protocol) => {
    if (type == 'credit' && protocol == 'STAS') {
      return (
        <span className={'font-medium text-sm text-blue-700'}>
          Purchased an NFT
        </span>
      )
    } else if (type == 'debit' && protocol == 'STAS') {
      return (
        <span className={'font-medium text-sm text-red-500'}>Sold an NFT</span>
      )
    } else if (type == 'credit' && protocol == 'BSV') {
      return (
        <span className={'font-medium text-sm text-blue-700'}>Deposit</span>
      )
    } else if (type == 'debit' && protocol == 'BSV') {
      return (
        <span className={'font-medium text-sm text-red-500'}>Withdrawal</span>
      )
    }
  }

  const currencyFormat = (num) => {
    return ' ' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '1 NFT')
  }

  const handleSort = () => {
    if (isAscending) {
      const sort = _.sortBy(txHistory, (num) =>
        num.timestamp.toLowerCase(),
      ).reverse()
      setTxHistory(sort)
      setIsAscending(false)
    } else {
      const sort = _.sortBy(txHistory, (num) => num.timestamp.toLowerCase())
      setTxHistory(sort)
      setIsAscending(true)
    }
  }

  const SendNotificationByPaymail = async (address, message) => {
    const user = await firebaseGetUserByPaymail(address)
    const userId = user?.userData[0]?.uid

    if (userId) SendNotification(userId, message)
  }

  const reloadBalance = async () => {
    setbalanceLoading(true)
    await getwalletBal(dispatch)
    setbalanceLoading(false)
  }
  const reloadTrans = async () => {
    settransLoading(true)
    await getwalletHistory(dispatch)
    settransLoading(false)
  }

  return (
    <UserSettingsLayout>
      <div>
        <div className="md:grid lg:grid-cols-3">
          <div className="mt-5 lg:mt-0 md:w-[666px]">
            <div className="sm:border-b sm:border-gray-200 sm:pb-5">
              <span className="block text-lg font-medium text-gray-700">
                Wallet
                <span className="block text-sm font-normal text-mist">
                  Everything you get from the sale goes into your wallet
                  balance.
                </span>
              </span>
            </div>

            <div>
              <div
                style={{ border: '2px solid red' }}
                className="relative flex flex-col items-center w-full gap-6 p-6 mt-6 border border-gray-200 rounded-lg lg:items-stretch md:flex-row"
              >
                <div className="absolute right-8 z-[100]">
                  <div>
                    {balanceLoading ? (
                      <Spinner className="h-4 w-4 m-0 p-0" />
                    ) : (
                      <RefreshIcon
                        onClick={reloadBalance}
                        className="cursor-pointer h-4 w-4"
                      />
                    )}
                  </div>
                </div>
                <div className="flex flex-col justify-between flex-1">
                  <div className="font-medium">Wallet</div>
                  <div>
                    <p className="mb-2 text-sm text-gray-500">
                      Current balance
                    </p>
                    <span className="text-2xl font-bold text-gray-900 truncate sm:text-3xl">
                      {!loading ? '$' + usdBalance : <Spinner size="w-7 h-7" />}
                    </span>
                  </div>
                </div>
                <div className="flex items-end justify-center flex-1 md:relative md:justify-end">
                  <span className="text-xs text-amber-400 bg-amber-50 truncate font-medium p-y1 px-2.5 rounded-full">
                    {!loading ? (
                      `${balance ? balance.toFixed(8) : 0} BSV`
                    ) : (
                      <Spinner size="w-4 h-4" />
                    )}
                  </span>
                </div>
              </div>
              <div className="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
                <InputMain>
                  <InputMain.Label label="Paymail" htmlFor="paymail" />
                  <InputMain.Input
                    id="paymail"
                    variant="add-on-reverse"
                    inputClassName="md:h-11"
                    addon={
                      paymail ? (
                        <>
                          <CopyDIcon
                            className="w-5 h-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <span>Copy</span>
                        </>
                      ) : (
                        <Spinner />
                      )
                    }
                    defaultValue={paymail}
                    onChange={() => {}}
                    className="sm:col-span-2"
                    disabled
                  />
                </InputMain>

                <InputMain>
                  <InputMain.Label
                    label="BitcoinSV Address"
                    htmlFor="bitcoinSVAddress"
                  />
                  <InputMain.Input
                    id="bitcoinSVAddress"
                    variant="add-on-reverse"
                    inputClassName="md:h-11"
                    addon={
                      address ? (
                        <>
                          <CopyDIcon
                            className="w-5 h-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <span>Copy</span>
                        </>
                      ) : (
                        <Spinner />
                      )
                    }
                    defaultValue={address}
                    onChange={() => {}}
                    className="sm:col-span-2"
                    disabled
                  />
                </InputMain>

                <div className="flex justify-end gap-3 border-none">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSend(true)
                    }}
                    className="btn-secondary py-2.5 border border-[#EAECF0] text-sm font-medium"
                  >
                    Transfer
                  </button>
                  <ModalConfirm
                    isOpen={isSend}
                    onClose={() => {
                      setIsSend(false)
                      reset({ address: '', amount: '' })
                      setMsg(null)
                    }}
                    title={'Transfer'}
                    deleteButton={false}
                    content={
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <form
                          className="w-full max-w-xs space-y-6"
                          onSubmit={handleSubmit(onSubmit)}
                        >
                          {inputAttributes.map((inputAttribute) => (
                            <InputMain
                              key={inputAttribute.name}
                              className="relative pb-0 border-none"
                            >
                              <Controller
                                name={inputAttribute.name}
                                control={control}
                                render={({ field }) => {
                                  return (
                                    <InputMain.Input
                                      id={inputAttribute.name}
                                      placeholder={inputAttribute.placeholder}
                                      className="mb-8 sm:mb-4"
                                      type={inputAttribute.type}
                                      step="any"
                                      {...field}
                                    />
                                  )
                                }}
                              />
                              <span className="absolute text-xs text-red-600 -bottom-6 sm:-bottom-2 left-2">
                                {errors[inputAttribute.name]?.message}
                              </span>
                            </InputMain>
                          ))}
                          {msg && (
                            <Alert message={msg.content} type={msg.type} />
                          )}
                          <button
                            type="submit"
                            className={`w-full font-semibold relative ${
                              isSubmitting ? 'btn-secondary' : 'btn-primary'
                            }`}
                          >
                            Send
                            {isSubmitting && (
                              <Spinner size="w-5 h-5 absolute top-3 right-4" />
                            )}
                          </button>
                        </form>
                      </div>
                    }
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setIsDeposit(true)
                    }}
                    className="btn-primary py-2.5 text-sm font-medium"
                  >
                    Deposit
                  </button>
                  <ModalConfirm
                    isOpen={isDeposit}
                    onClose={() => setIsDeposit(false)}
                    title={'Add Funds.'}
                    deleteButton={false}
                    content={
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <p>Use your QR scan to add money to your wallet.</p>
                        <QRCodeSVG value={'bitcoin:' + address + '?sv'} />
                      </div>
                    }
                  />
                </div>
              </div>
            </div>
            <div className="mt-10 sm:border-t sm:border-gray-200 lg:w-screen">
              <div className="block mt-12 text-lg font-medium text-gray-900 max-w-[666px]">
                <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
                  <div>
                    Transaction history
                    <span className="block text-sm font-normal text-mist">
                      Everything you get from the sale goes into your wallet
                      balance.
                    </span>
                  </div>
                  <div className="flex items-center justify-center">
                    <button
                      type="button"
                      onClick={handleSort}
                      className="font-medium cursor-pointer ml-auto mt-4 sm:mt-0 text-gray-700 text-xs py-2 px-3"
                    >
                      <span className="flex flex-row items-center gap-2">
                        {isAscending ? 'Ascending' : 'Descending'}
                        <SvgAscendingIcon
                          className={!isAscending && 'rotate-180 -scale-x-100'}
                        />
                      </span>
                    </button>
                    <div className=" z-[100]">
                      <div>
                        {transLoading ? (
                          <Spinner className="h-4 w-4 m-0 p-0" />
                        ) : (
                          <RefreshIcon
                            onClick={reloadTrans}
                            className="cursor-pointer h-4 w-4"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {!txLoading ? (
                txHistory?.map((items, index) => {
                  return (
                    <div key={index}>
                      <div className=" relative bg-white mb-6 py-4 sm:items-center px-6 grid grid-cols-2 sm:grid-cols-12  w-full gap-8 min-h-[80px] border border-gray-200 rounded-lg max-w-[666px]">
                        <div className="flex flex-row items-center col-span-6">
                          <div className="grid overflow-hidden rounded directbox-container place-items-center w-11 h-11">
                            {items?.type === 'debit' ? (
                              <SvgDirectBoxSend
                                className="w-6 h-6 directbox-send"
                                aria-hidden="true"
                              />
                            ) : (
                              <SvgDirectInboxIcon
                                className="w-6 h-6 direct-inbox"
                                aria-hidden="true"
                              />
                            )}
                          </div>
                          <div className="flex flex-col ml-4">
                            {getTxName(items?.type, items?.protocol)}
                            <span className="mt-2 text-sm font-normal text-gray-500 overflow-hidden whitespace-nowrap text-ellipsis resize-x max-w-[200px] ">
                              {items?.type === 'debit' ? items.to : items.to}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col w-full col-span-5">
                          <span className="text-sm font-normal text-gray-900">
                            {items?.timestamp
                              ? moment(items?.timestamp).format('MMM D, YYYY')
                              : '-'}
                          </span>
                          <span className="flex items-center mt-2">
                            <SvgCheckCircleIcon
                              className={`w-4 h-4 ${
                                items.type === 'debit'
                                  ? 'text-red-400'
                                  : 'text-green-400'
                              }`}
                              aria-hidden="true"
                            />
                            <span className="ml-2 text-sm font-normal text-gray-500">
                              {items?.protocol == 'STAS'
                                ? currencyFormat(items?.balance_change)
                                : items.balance_change + ' Satoshis'}
                            </span>
                          </span>
                        </div>
                        <div className="absolute col-span-1 cursor-pointer right-6 top-4 sm:static">
                          <a
                            href={`https://whatsonchain.com/tx/${items.txId}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <SvgExternalLinkIcon
                              className="w-5 h-5"
                              aria-hidden="true"
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  )
                })
              ) : (
                <Spinner />
              )}
            </div>
          </div>
        </div>
      </div>
    </UserSettingsLayout>
  )
}

export default UserSettingsWalletSection
