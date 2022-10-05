import { useEffect, useState } from 'react'
import { CopyDIcon } from '@/components/common/icons'
import UserSettingsLayout from '@/components/layout/user-settings-layout'
import { InputMain } from '@/components/ui/inputs'
import ProgressCircular from '@/components/ui/progress-circular'
import { ArrowSmUpIcon } from '@heroicons/react/outline'
import { useSelector } from 'react-redux'
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

import validationSchema from './validationScheme'
import Alert from '@/components/ui/alert'

const inputAttributes = [
  { type: 'text', placeholder: 'Address or paymail', name: 'address' },
  { type: 'number', placeholder: 'Amount to transfer', name: 'amount' },
]

const UserSettingsWalletSection = () => {
  const [loading, setLoading] = useState(true)
  const [isDeposit, setIsDeposit] = useState(false)
  const [isSend, setIsSend] = useState(false)
  const [usdBalance, setUsdBalance] = useState(0)
  const [msg, setMsg] = useState(null)
  const { paymail, address, balance } = useSelector(walletSelector)
  const resolver = useYupValidationResolver(validationSchema)
  const { control, handleSubmit, formState, reset } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver,
  })
  const { isSubmitting, isValid, errors } = formState
  const onSubmit = async (data) => {
    try {
      if (balance < data.amount) {
        return setMsg({
          type: 'error',
          content: 'Please enter a valid value',
        })
      }
      const dataObj = {
        dataArray: [
          {
            to: data.address,
            amount: Number(data.amount),
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
          dispatch(getwalletDetails())
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
    if (balance !== null) {
      if (balance > 0) {
        ;(async () => {
          await apiConfig
            .get('/v1/currencyConversion', {
              headers: {
                satoshis: `${balance}`,
                currency: 'USD',
              },
            })
            .then((res) => {
              setUsdBalance(res.data.data.balance)
              setLoading(false)
            })
            .catch(() => setLoading(false))
        })()
      } else {
        setLoading(false)
      }
    }
  }, [balance])
  return (
    <UserSettingsLayout>
      <div>
        <div className="md:grid lg:grid-cols-3 ">
          <div className="mt-5 lg:mt-0 md:col-span-2">
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
                      balance + ' ' + 'BSV'
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
                    text={
                      <div className="flex flex-col justify-center items-center space-y-4">
                        <form
                          className="space-y-6 w-full max-w-xs"
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
                    text={
                      <div className="flex flex-col justify-center items-center space-y-4">
                        <p>Use your QR scan to add money to your wallet.</p>
                        <QRCodeSVG value={'bitcoin:' + address + '?sv'} />
                      </div>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserSettingsLayout>
  )
}

export default UserSettingsWalletSection
