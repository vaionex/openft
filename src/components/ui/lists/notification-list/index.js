import { CheckCircleIcon } from '@heroicons/react/outline'
import ActivityTag from '../../activity-tag'

const NotificationList = ({ items }) => {
  return (
    <div>
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
                    {activityItem.text}
                  </div>
                  {activityItem.isNew && (
                    <span className="text-blue-500">&#8226;</span>
                  )}
                </div>
                <p className="text-sm text-gray-500">{activityItem.time}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NotificationList
