import React from 'react'

const ActivityTag = ({ activity }) => {
  if (activity === 'active') {
    return (
      <span className="px-2 py-1 text-xs font-medium text-green-500 rounded-full bg-green-50">
        &#8226; Active now
      </span>
    )
  }
}

export default ActivityTag
