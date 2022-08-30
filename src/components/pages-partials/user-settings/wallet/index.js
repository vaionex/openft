import { useEffect, useState } from 'react'
import { CopyDIcon } from '@/components/common/icons'
import UserSettingsLayout from '@/components/layout/user-settings-layout'
import { InputMain } from '@/components/ui/inputs'
import ProgressCircular from '@/components/ui/progress-circular'
import { ArrowSmUpIcon } from '@heroicons/react/outline'
import { useSelector } from 'react-redux'
import walletSelector from '@/redux/selectors/wallet'
import Spinner from '@/components/ui/spinner'
import apiConfig from '@/config/relysiaApi'

const UserSettingsWalletSection = () => {
  const [loading, setLoading] = useState(true)
  const [usdBalance, setUsdBalance] = useState(0)
  const { paymail, address, balance } = useSelector(walletSelector)
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
                <ProgressCircular value={40} />

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
                  <button type="button" className="btn-secondary py-2.5">
                    Transfer
                  </button>
                  <button type="button" className="btn-primary py-2.5">
                    Deposit
                  </button>
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
