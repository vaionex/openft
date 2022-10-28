import { CheckCircleIcon } from '@heroicons/react/outline'
import moment from 'moment'
import ActivityTag from '../../activity-tag'

const NotificationList = ({ items }) => {
  return (
    <div className=" max-h-80 h-auto overflow-auto">
      <ul role="list" className="divide-y divide-gray-200">
        {items.map((activityItem) => (
          <li key={activityItem.id} className="py-4">
            <div className="flex space-x-3">
              <CheckCircleIcon
                className="text-green-500"
                width={26}
                height={26}
              />
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <div className="flex justify-between w-full text-sm">
                    {activityItem?.message}
                  </div>
                  {activityItem.isNew && (
                    <span className="text-blue-500">&#8226;</span>
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  time:{' '}
                  {moment(activityItem?.timestamp.seconds * 3000).format(
                    `DD MMM hh:mm`,
                  )}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NotificationList
