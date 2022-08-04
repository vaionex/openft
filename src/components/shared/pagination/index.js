import SvgArrowIcon from '@/components/common/icons/arrow-icon'
import React from 'react'

const Pagination = () => {
  return (
    <div class="flex flex-col items-center my-12  text-sm">
      <div class="flex text-gray-500">
        <div class="h-12 mr-2 flex justify-center items-center rounded-full  cursor-pointer">
          <div class="flex items-center gap-2">
            <SvgArrowIcon direction="left" />
            <span>Previous</span>
          </div>
        </div>
        <div class="hidden md:flex h-12 font-medium rounded-full items-center">
          <span className="h-12 mr-2 flex justify-center items-center rounded-full  cursor-pointer p-2 text-gray-800">
            1
          </span>
          <span className="h-12 mr-2 flex justify-center items-center rounded-full  cursor-pointer p-2 text-gray-500">
            2
          </span>
          <span className="h-12 mr-2 flex justify-center items-center rounded-full  cursor-pointer p-2 text-gray-500">
            3
          </span>
          <span className="h-12 mr-2 flex justify-center items-center rounded-full  cursor-pointer p-2 text-gray-500">
            ...
          </span>
          <span className="h-12 mr-2 flex justify-center items-center rounded-full  cursor-pointer p-2 text-gray-500">
            8
          </span>
          <span className="h-12 mr-2 flex justify-center items-center rounded-full  cursor-pointer p-2 text-gray-500">
            9
          </span>
          <span className="h-12 mr-2 flex justify-center items-center rounded-full  cursor-pointer p-2 text-gray-500">
            10
          </span>
        </div>
        <div class="h-12 ml-2 flex justify-center items-center rounded-full  cursor-pointer">
          <div class="flex items-center gap-2">
            <span>Next</span>

            <SvgArrowIcon direction="right" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pagination
