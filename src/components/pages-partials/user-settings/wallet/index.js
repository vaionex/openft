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
import Image from 'next/image'
import {
  SvgDirectInboxIcon,
  SvgDirectBoxSend,
  SvgCheckCircleIcon,
  SvgExternalLinkIcon,
} from '@/components/common/icons'
import SvgDirectionIcon from '@/components/common/icons/direction-icon'
import moment from 'moment'

const inputAttributes = [
  { type: 'text', placeholder: 'Address or paymail', name: 'address' },
  { type: 'number', placeholder: 'Amount to transfer in $', name: 'amount' },
]

const UserSettingsWalletSection = () => {
  const dispatch = useDispatch()

  const bsvRate = usePriceConverter()
  const [loading, setLoading] = useState(true)
  const [isDeposit, setIsDeposit] = useState(false)
  const [isSend, setIsSend] = useState(false)
  const [usdBalance, setUsdBalance] = useState(0)
  const [txHIs, setTxHis] = useState([])
  const [msg, setMsg] = useState(null)
  const { paymail, address, balance, wallethistory } =
    useSelector(walletSelector)
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
        setTimeout(() => {
          getwalletDetails('00000000-0000-0000-0000-000000000000', dispatch)
        }, 2000)
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
      let txHistory = []
      wallethistory.map((item) => {
        txHistory.push({
          type: item?.type,
          txDetail: getTxName(item?.type, item?.protocol),
          txdate: moment(item?.timestamp).format('MMM D, YYYY'),
          txBal: item?.balance_change,
          txTo: item?.to,
          txFrom: item?.from,
        })
      })
      setTxHis(txHistory)
    }
  }, [wallethistory])

  const getTxName = (type, protocol) => {
    if (type == 'credit' && protocol == 'STAS') {
      return {
        txName: (
          <span className={'font-medium text-sm text-blue-700'}>WithDraw</span>
        ),
        send: false,
        cash: true,
      }
    } else if (type == 'debit' && protocol == 'STAS') {
      return {
        txName: (
          <span className={'font-medium text-sm text-red-500'}>Deposit</span>
        ),
        send: true,
        cash: true,
      }
    } else if (type == 'credit' && protocol == 'BSV') {
      return {
        txName: (
          <span className={'font-medium text-sm text-blue-700'}>
            NFT recived
          </span>
        ),
        send: false,
        cash: false,
      }
    } else if (type == 'debit' && protocol == 'BSV') {
      return {
        txName: (
          <span className={'font-medium text-sm text-red-500'}>NFT Sent</span>
        ),
        send: true,
        cash: false,
      }
    }
  }
  return (
    <UserSettingsLayout>
      <div>
        <div className="md:grid lg:grid-cols-3">
          <div className="mt-5 lg:mt-0 md:w-[666px]">
            <div className="sm:border-b sm:border-gray-200 sm:pb-5">
              <span className="block text-lg font-medium text-gray-700">
                Wallet
                <span className="block text-sm font-normal text-gray-500">
                  Everything you get from the sale goes into your wallet
                  balance.
                </span>
              </span>
            </div>

            <div>
              <div className="relative flex flex-col items-center w-full gap-6 p-6 mt-6 border border-gray-200 rounded-lg lg:items-stretch md:flex-row">
                {/* <ProgressCircular value={40} /> */}

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
                <ArrowSmUpIcon
                  width={24}
                  height={24}
                  className="absolute text-gray-500 transform rotate-45 cursor-pointer top-2 right-2"
                />
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
                    label="BitcoinSV Addressk"
                    htmlFor="bitcoinSVAddress"
                  />
                  <InputMain.Input
                    id="bitcoinSVAddress"
                    variant="add-on-reverse"
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
                    className="btn-secondary py-2.5"
                  >
                    Send
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
                    className="btn-primary py-2.5"
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
              <div className="block mt-12 text-lg font-medium text-gray-900">
                Transactions history
                <div className="flex mb-4">
                  <span className="block text-sm font-normal text-gray-500">
                    Everything you get from the sale goes into your wallet
                    balance.
                  </span>
                  <span></span>
                </div>
              </div>
              {txHIs.map((items, index) => {
                return (
                  <div key={index}>
                    <div className=" relative bg-white mb-6 flex-wrap justify-between py-4 sm:items-center px-6 flex flex-col sm:flex-row flex-start gap-8 min-h-[80px] border border-gray-200 rounded-lg max-w-[666px]">
                      <div className="flex flex-row items-center min-w-[168px]">
                        <div className="grid rounded directbox-container place-items-center w-11 h-11">
                          {items?.txDetail?.send ? (
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
                          {items?.txDetail?.txName}
                          <span className="mt-2 text-sm font-normal text-gray-500">
                            {items?.txDetail?.send ? items.txTo : items.txFrom}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-normal text-gray-900">
                          {items?.txdate}
                        </span>
                        <span className="flex items-center mt-2">
                          <SvgCheckCircleIcon
                            className={`w-4 h-4 ${
                              items.txDetail?.send
                                ? 'text-red-400'
                                : 'text-green-400'
                            }`}
                            aria-hidden="true"
                          />
                          <span className="ml-2 text-sm font-normal text-gray-500">
                            {items?.txDetail?.cash
                              ? '$' + items.txBal
                              : items.txBal + ' BSV'}
                          </span>
                        </span>
                      </div>
                      <div className="absolute right-6 sm:static">
                        <a href={items.url}>
                          <SvgExternalLinkIcon
                            className="w-5 h-5"
                            aria-hidden="true"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </UserSettingsLayout>
  )
}

export default UserSettingsWalletSection
