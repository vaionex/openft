import Checkbox from '@/components/ui/checkbox'
import React, { useState, useEffect } from 'react'
import ButtonWLoading from '@/components/ui/button-w-loading'
import { useForm, Controller } from 'react-hook-form'
import { firebaseUpdateDoc } from '@/firebase/utils'
import { async } from '@firebase/util'
import { firebaseDb } from '@/firebase/init'
import { setDoc, doc, Timestamp } from 'firebase/firestore'

const NotificationsForm = ({ currentUser, notificationSettings }) => {
  const [isSuccess, setisSuccess] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: notificationSettings,
  })

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setisSuccess(false)
      }, 3000)
    }
  }, [isSuccess])

  const onSubmit = async (data) => {
    try {
      const docRef = doc(firebaseDb, 'notificationsSettings', currentUser.uid)
      const docDb = await setDoc(docRef, {
        ...data,
        timestamp: Timestamp.now(),
      })

      setisSuccess(true)
    } catch (err) {
      console.log('err', err)
      throw new Error('Error occured while updating the notification settings.')
    }
  }

  return (
    <form
      className="space-y-6 divide-y divide-gray-200"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-6 divide-y divide-gray-200">
        <div className="py-6 border-b border-b-gray-200">
          <fieldset>
            <legend className="sr-only">In-app notifications </legend>
            <div
              className="text-base font-medium text-gray-900 "
              aria-hidden="true"
            >
              In-app notifications
              <div className="text-sm font-medium text-gray-500">
                Select when you’ll be notified in-app.
              </div>
            </div>
            <div className="mt-4 space-y-4">
              <div className="relative flex items-start">
                <Controller
                  name="in_app_itemSold"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="itemSold"
                      text="Item Sold"
                      subtext="When someone purchased one of your items"
                      defaultChecked={notificationSettings.in_app_itemSold}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="relative flex items-start">
                <Controller
                  name="in_app_successfulPurchase"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="purchases"
                      text="Successful Purchase"
                      subtext="When you successfully buy an item"
                      defaultChecked={
                        notificationSettings.in_app_successfulPurchase
                      }
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="relative flex items-start">
                <Controller
                  name="in_app_priceChange"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="priceChanges"
                      text="Price Change"
                      subtext="When an item you made an offer on changes in price"
                      defaultChecked={notificationSettings.in_app_priceChange}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="relative flex items-start">
                <Controller
                  name="in_app_ownedItemUpdates"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="itemUpdates"
                      text="Owned Item Updates"
                      subtext="When a significant update occurs for one of the items you have purchased"
                      defaultChecked={
                        notificationSettings.in_app_ownedItemUpdates
                      }
                      {...field}
                    />
                  )}
                />
              </div>
            </div>
          </fieldset>
          <fieldset className="mt-6 ">
            <legend className="sr-only">Email notifications </legend>
            <div
              className="text-base font-medium text-gray-900 "
              aria-hidden="true"
            >
              Email notifications
              <div className="text-sm font-medium text-gray-500">
                Select when you’ll be notified by email
              </div>
            </div>
            <div className="mt-4 space-y-4">
              <div className="relative flex items-start">
                <Controller
                  name="email_notification_itemSold"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="itemSoldEmail"
                      text="Item Sold"
                      subtext="When someone purchased one of your items"
                      defaultChecked={
                        notificationSettings.email_notification_itemSold
                      }
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="relative flex items-start">
                <Controller
                  name="email_notification_successfulPurchase"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="purchasesEmail"
                      text="Successful Purchase"
                      subtext="When you successfully buy an item"
                      defaultChecked={
                        notificationSettings.email_notification_successfulPurchase
                      }
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="relative flex items-start">
                <Controller
                  name="email_notification_priceChange"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="priceChangesEmail"
                      text="Price Change"
                      subtext="When an item you made an offer on changes in price"
                      defaultChecked={
                        notificationSettings.email_notification_priceChange
                      }
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="relative flex items-start">
                <Controller
                  name="email_notification_ownedItemUpdates"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="itemUpdatesEmail"
                      text="Owned Item Updates"
                      subtext="When a significant update occurs for one of the items you have purchased"
                      defaultChecked={
                        notificationSettings.email_notification_ownedItemUpdates
                      }
                      {...field}
                    />
                  )}
                />
              </div>
            </div>
          </fieldset>
        </div>
        <div className="border-none">
          <div className="flex justify-end gap-3 border-none">
            <button type="button" className="btn-secondary py-2.5">
              Cancel
            </button>

            <ButtonWLoading
              isPending={isSubmitting}
              text="Save"
              type="submit"
            />
          </div>
          {isSuccess && (
            <div className="flex justify-end border-none mt-3">
              <span className="text-xs text-green-500 text-right w-100">
                Settings successfully updated.
              </span>
            </div>
          )}{' '}
        </div>
      </div>
    </form>
  )
}

export default NotificationsForm
