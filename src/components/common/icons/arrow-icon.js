import React from 'react'

const SvgArrowIcon = ({ direction = 'right' }) => {
  return direction === 'left' ? (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.8334 7.00008H1.16675M1.16675 7.00008L7.00008 12.8334M1.16675 7.00008L7.00008 1.16675"
        stroke="#667085"
        stroke-width="1.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ) : (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.1665 7.00008H12.8332M12.8332 7.00008L6.99984 1.16675M12.8332 7.00008L6.99984 12.8334"
        stroke="#667085"
        stroke-width="1.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default SvgArrowIcon
