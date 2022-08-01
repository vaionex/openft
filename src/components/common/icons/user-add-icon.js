import * as React from 'react'

const SvgUserAddIcon = (props) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width={48} height={48} rx={8} fill="url(#user-add-icon_svg__a)" />
    <path
      d="M24 24a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM15.41 34c0-3.87 3.85-7 8.59-7 .96 0 1.89.13 2.76.37"
      stroke="#fff"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M34 30c0 .32-.04.63-.12.93-.09.4-.25.79-.46 1.13A3.97 3.97 0 0 1 30 34a3.92 3.92 0 0 1-2.66-1.03c-.3-.26-.56-.57-.76-.91A3.92 3.92 0 0 1 26 30a3.995 3.995 0 0 1 4-4c1.18 0 2.25.51 2.97 1.33.64.71 1.03 1.65 1.03 2.67ZM31.49 29.98h-2.98M30 28.52v2.99"
      stroke="#fff"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient
        id="user-add-icon_svg__a"
        x1={0}
        y1={0}
        x2={56.819}
        y2={32.657}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#20D1FD" />
        <stop offset={1} stopColor="#9642FF" />
      </linearGradient>
    </defs>
  </svg>
)

export default SvgUserAddIcon
