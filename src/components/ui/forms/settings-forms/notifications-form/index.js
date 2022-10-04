import Checkbox from '@/components/ui/checkbox'
import userSelector from '@/redux/selectors/user'
import { useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import React from 'react'
import Alert from '@/components/ui/alert'
import { firebaseAddDocWithID } from '@/firebase/utils'
import { useState } from 'react'

const NotificationsForm = () => {
  const { currentUser, notificationObj } = useSelector(userSelector)
  const [resStatus, setResStatus] = useState(false)
  const { control, handleSubmit, formState, getValues } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      ...notificationObj['app-notification'],
      ...notificationObj['email-notification'],
    },
    reValidateMode: 'onChange',
  })
  const onSubmit = async ({
    itemSold,
    purchases,
    priceChanges,
    itemUpdates,
    itemSoldEmail,
    purchasesEmail,
    priceChangesEmail,
    itemUpdatesEmail,
  }) => {
    const notificationValues = {
      'app-notification': {
        itemSold,
        purchases,
        priceChanges,
        itemUpdates,
      },
      'email-notification': {
        itemSoldEmail,
        purchasesEmail,
        priceChangesEmail,
        itemUpdatesEmail,
      },
    }

    const res = await firebaseAddDocWithID(
      'notifications',
      notificationValues,
      currentUser.uid,
    )
    setResStatus(res)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 divide-y divide-gray-200"
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
                  name={'itemSold'}
                  control={control}
                  render={({ field }) => {
                    return (
                      <Checkbox
                        id="itemSold"
                        text="Item Sold"
                        defaultChecked={getValues('itemSold')}
                        subtext="When someone purchased one of your items"
                        {...field}
                      />
                    )
                  }}
                />
              </div>
              <div className="relative flex items-start">
                <Controller
                  name={'purchases'}
                  control={control}
                  render={({ field }) => {
                    return (
                      <Checkbox
                        id="purchases"
                        text="Successful Purchase"
                        defaultChecked={getValues('purchases')}
                        subtext="When you successfully buy an item"
                        {...field}
                      />
                    )
                  }}
                />
              </div>
              <div className="relative flex items-start">
                <Controller
                  name={'priceChanges'}
                  control={control}
                  render={({ field }) => {
                    return (
                      <Checkbox
                        id="priceChanges"
                        text="Price Change"
                        defaultChecked={getValues('priceChanges')}
                        subtext="When an item you made an offer on changes in price"
                        {...field}
                      />
                    )
                  }}
                />
              </div>
              <div className="relative flex items-start">
                <Controller
                  name={'itemUpdates'}
                  control={control}
                  render={({ field }) => {
                    return (
                      <Checkbox
                        id="itemUpdates"
                        text="Owned Item Updates"
                        defaultChecked={getValues('itemUpdates')}
                        subtext="When a significant update occurs for one of the items you have purchased"
                        {...field}
                      />
                    )
                  }}
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
                  name={'itemSoldEmail'}
                  control={control}
                  render={({ field }) => {
                    return (
                      <Checkbox
                        id="itemSoldEmail"
                        text="Item Sold"
                        defaultChecked={getValues('itemSoldEmail')}
                        subtext="When someone purchased one of your items"
                        {...field}
                      />
                    )
                  }}
                />
              </div>
              <div className="relative flex items-start">
                <Controller
                  name={'purchasesEmail'}
                  control={control}
                  render={({ field }) => {
                    return (
                      <Checkbox
                        id="purchasesEmail"
                        text="Successful Purchase"
                        defaultChecked={getValues('purchasesEmail')}
                        subtext="When you successfully buy an item"
                        {...field}
                      />
                    )
                  }}
                />
              </div>
              <div className="relative flex items-start">
                <Controller
                  name={'priceChangesEmail'}
                  control={control}
                  render={({ field }) => {
                    return (
                      <Checkbox
                        id="priceChangesEmail"
                        text="Price Change"
                        defaultChecked={getValues('priceChangesEmail')}
                        subtext="When an item you made an offer on changes in price"
                        {...field}
                      />
                    )
                  }}
                />
              </div>
              <div className="relative flex items-start">
                <Controller
                  name={'itemUpdatesEmail'}
                  control={control}
                  render={({ field }) => {
                    return (
                      <Checkbox
                        id="itemUpdatesEmail"
                        text="Owned Item Updates"
                        defaultChecked={getValues('itemUpdatesEmail')}
                        subtext="When a significant update occurs for one of the items you have purchased"
                        {...field}
                      />
                    )
                  }}
                />
              </div>
            </div>
          </fieldset>
        </div>
        {resStatus && (
          <Alert message={'Notifications has been updated'} type="success" />
        )}
        <div className="flex justify-end gap-3 border-none">
          <button type="button" className="btn-secondary py-2.5">
            Cancel
          </button>
          <button type="submit" className="btn-primary py-2.5">
            Save
          </button>
        </div>
      </div>
    </form>
  )
}

export default NotificationsForm
