import React from 'react'

const SvgFiterIcon = ({ color = '#344054' }) => {
  return (
    <svg
      width="18"
      height="12"
      viewBox="0 0 18 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 6H14M1.5 1H16.5M6.5 11H11.5"
        stroke={color}
        stroke-width="1.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default SvgFiterIcon
