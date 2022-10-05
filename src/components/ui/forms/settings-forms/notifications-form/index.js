import Checkbox from '@/components/ui/checkbox'
import React from 'react'

const NotificationsForm = () => {
  return (
    <form className="space-y-6 divide-y divide-gray-200">
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
                <Checkbox
                  id="itemSold"
                  text="Item Sold"
                  subtext="When someone purchased one of your items"
                />
              </div>
              <div className="relative flex items-start">
                <Checkbox
                  id="purchases"
                  text="Successful Purchase"
                  subtext="When you successfully buy an item"
                />
              </div>
              <div className="relative flex items-start">
                <Checkbox
                  id="priceChanges"
                  text="Price Change"
                  subtext="When an item you made an offer on changes in price"
                />
              </div>
              <div className="relative flex items-start">
                <Checkbox
                  id="itemUpdates"
                  text="Owned Item Updates"
                  subtext="When a significant update occurs for one of the items you have purchased"
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
                <Checkbox
                  id="itemSoldEmail"
                  text="Item Sold"
                  subtext="When someone purchased one of your items"
                />
              </div>
              <div className="relative flex items-start">
                <Checkbox
                  id="purchasesEmail"
                  text="Successful Purchase"
                  subtext="When you successfully buy an item"
                />
              </div>
              <div className="relative flex items-start">
                <Checkbox
                  id="priceChangesEmail"
                  text="Price Change"
                  subtext="When an item you made an offer on changes in price"
                />
              </div>
              <div className="relative flex items-start">
                <Checkbox
                  id="itemUpdatesEmail"
                  text="Owned Item Updates"
                  subtext="When a significant update occurs for one of the items you have purchased"
                />
              </div>
            </div>
          </fieldset>
        </div>
        <div className="flex justify-end gap-3 border-none">
          <button type="button" className="btn-secondary py-2.5">
            Cancel
          </button>
          <button type="button" className="btn-primary py-2.5">
            Save
          </button>
        </div>
      </div>
    </form>
  )
}

export default NotificationsForm
