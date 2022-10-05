import { MonitorIcon } from '@/components/common/icons'
import ActivityTag from '@/components/ui/activity-tag'

const ActivityList = ({ items }) => {
  return (
    <div>
      <ul role="list" className="divide-y divide-gray-200">
        {items.map((activityItem) => (
          <li key={activityItem.id} className="py-4">
            <div className="flex space-x-3">
              <MonitorIcon width={24} height={24} />
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium">{activityItem.name}</h3>
                  {activityItem.active && <ActivityTag activity="active" />}
                </div>
                <p className="text-sm text-gray-500">
                  {activityItem.location} &#8226; {activityItem.time}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ActivityList
