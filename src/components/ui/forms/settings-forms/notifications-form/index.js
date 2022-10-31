import Checkbox from '@/components/ui/checkbox'
import NextLink from 'next/link'
import userSelector from '@/redux/selectors/user'
import { useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import React from 'react'
import Alert from '@/components/ui/alert'
import { firebaseAddDocWithID } from '@/firebase/utils'
import { useState, useEffect } from 'react'
import ButtonWLoading from '@/components/ui/button-w-loading'
import store from '@/redux/store'
import { setNotifications } from '@/redux/slices/user'

const NotificationsForm = () => {
  const { currentUser, notificationObj } = useSelector(userSelector)
  const [resStatus, setResStatus] = useState(null)
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    getValues,
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      ...notificationObj['app-notification'],
      ...notificationObj['email-notification'],
    },
    reValidateMode: 'onChange',
  })

  useEffect(() => {
    if (resStatus) {
      setTimeout(() => {
        setResStatus(null)
      }, 3000)
    }
  }, [resStatus])

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
        itemSold: itemSold ? itemSold : false,
        purchases: purchases ? purchases : false,
        // priceChanges: priceChanges ? priceChanges : false,
        // itemUpdates: itemUpdates ? itemUpdates : false,
      },
      // 'email-notification': {
      //   itemSoldEmail: itemSoldEmail ? itemSoldEmail : false,
      //   purchasesEmail: purchasesEmail ? purchasesEmail : false,
      //   // priceChangesEmail: priceChangesEmail ? priceChangesEmail : false,
      //   // itemUpdatesEmail: itemUpdatesEmail ? itemUpdatesEmail : false,
      // },
    }

    const res = await firebaseAddDocWithID(
      'notifications',
      notificationValues,
      currentUser.uid,
    )
    setResStatus(res)

    //updating reduxs state
    store.dispatch(setNotifications({ ...notificationValues }))
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
              {/* <div className="relative flex items-start">
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
              </div> */}
            </div>
          </fieldset>
          {/* <fieldset className="mt-6 ">
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
          </fieldset> */}
        </div>
        {resStatus && (
          <Alert message={'Notifications has been updated'} type="success" />
        )}
        <div className="flex justify-end gap-3 border-none">
          <NextLink href={'/'}>
            <a className="btn-secondary py-2.5">Cancel</a>
          </NextLink>

          <ButtonWLoading isPending={isSubmitting} text="Save" type="submit" />
        </div>
      </div>
    </form>
  )
}

export default NotificationsForm
