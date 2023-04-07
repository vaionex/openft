import UserSettingsLayout from '@/components/layout/user-settings-layout'
import Topup from '@/components/pages-partials/user-settings/topup'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getWalletAddressAndPaymail } from '@/services/relysia-queries'
import userSelector from '@/redux/selectors/user'

const UserSettingsTopupSection = () => {
  const [topupUrl, setTopupUrl] = useState(null)

  const { currentUser } = useSelector(userSelector)

  useEffect(() => {
    async function fetchTopupUrl() {
      const response = await fetch(
        `/api/topup?PAYMAIL=${encodeURIComponent(
          currentUser?.paymail,
        )}&EMAIL=${encodeURIComponent(currentUser?.email)}`,
      )

      if (response.ok) {
        const data = await response.json()
        setTopupUrl(data.url)
      }
    }

    fetchTopupUrl()
  }, [currentUser])

  return (
    <UserSettingsLayout>
      <div>
        <div className="md:grid md:grid-cols-9 md:gap-24 ">
          <div className="mt-5 mb-16 md:mb-0 md:mt-0 md:col-span-5">
            <div className="sm:border-b sm:border-gray-200 sm:pb-5">
              <span className="block text-lg font-medium text-gray-700">
                Top-up
                <span className="block text-sm font-normal text-mist">
                  Please choose the right method to top-up.
                </span>
              </span>
            </div>

            <Topup url={topupUrl} />
          </div>
        </div>
      </div>
    </UserSettingsLayout>
  )
}

export default UserSettingsTopupSection
