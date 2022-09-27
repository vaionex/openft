import * as React from 'react'

const SvgCodeIcon = (props) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x={4} y={4} width={48} height={48} rx={24} fill="#D1E0FF" />
    <path
      d="m33 33 5-5-5-5m-10 0-5 5 5 5m7-14-4 18"
      stroke="#155EEF"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x={4}
      y={4}
      width={48}
      height={48}
      rx={24}
      stroke="#EFF4FF"
      strokeWidth={8}
    />
  </svg>
)

export default SvgCodeIcon
