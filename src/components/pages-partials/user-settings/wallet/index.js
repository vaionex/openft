import { CopyDIcon } from '@/components/common/icons'
import UserSettingsLayout from '@/components/layout/user-settings-layout'
import { InputMain } from '@/components/ui/inputs'
import ProgressCircular from '@/components/ui/progress-circular'
import {
  ArrowSmUpIcon,
  ClipboardCopyIcon,
  SortAscendingIcon,
} from '@heroicons/react/outline'

const UserSettingsWalletSection = () => {
  return (
    <UserSettingsLayout>
      <div>
        <div className="md:grid md:grid-cols-3 ">
          <div className="mt-5 md:mt-0 md:col-span-2">
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
              <div className="flex w-full gap-6 p-6 mt-6 border border-gray-200 rounded-lg">
                <ProgressCircular value={40} />

                <div className="flex flex-col justify-between flex-1">
                  <div className="font-medium">Wallet</div>
                  <div>
                    <p className="mb-2 text-sm text-gray-500">
                      Current balance
                    </p>
                    <span className="text-lg font-bold text-gray-900 sm:text-3xl">
                      $40,206.20
                    </span>
                  </div>
                </div>
                <div className="relative flex items-end justify-end flex-1">
                  <ArrowSmUpIcon
                    width={24}
                    height={24}
                    className="absolute top-0 right-0 text-gray-500 transform rotate-45 cursor-pointer"
                  />
                  <span className="text-sm text-amber-400 bg-amber-50 truncate font-medium p-y1 px-2.5 rounded-full">
                    749,1335941866964 BSV
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
                      <>
                        <CopyDIcon
                          className="w-5 h-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span>Copy</span>
                      </>
                    }
                    defaultValue="1029@relysia.com"
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
                      <>
                        <CopyDIcon
                          className="w-5 h-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span>Copy</span>
                      </>
                    }
                    defaultValue="1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2"
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
