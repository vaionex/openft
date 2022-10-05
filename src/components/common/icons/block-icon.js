import * as React from 'react'

const SvgBlockIcon = (props) => (
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
      d="m20.93 20.93 14.14 14.14M38 28c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10 10 4.477 10 10Z"
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

export default SvgBlockIcon
