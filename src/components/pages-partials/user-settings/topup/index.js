import React from 'react'
import Spinner from '@/components/ui/spinner'

const Topup = ({ url }) => {
  return (
    <div className="h-full flex-1 p-0 rounded-md shadow-md cursor-pointer">
      <div className="flex-1 rounded-md cursor-pointer">
        {url ? (
          <iframe
            id="#centi-widget"
            src={url}
            style={{
              border: 'none',
              borderRadius: '0px',
              overflow: 'hidden',
              width: '100%',
              height: '305px',
            }}
          />
        ) : (
          <div className="w-full h-[280px] flex items-center justify-center">
            <div className="h-fit">
              <Spinner size="w-8 h-8" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Topup
