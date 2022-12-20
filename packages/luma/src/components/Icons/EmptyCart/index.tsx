import * as React from 'react'

export interface InfoIconProps {
  className?: string
}

export const EmptyCart: React.FC<InfoIconProps> = ({ className }) => {
  return (
    <svg
      width="170"
      height="221"
      viewBox="0 0 170 221"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M25.3719 61.8859C28.0255 43.4262 43.8409 29.7217 62.4903 29.7217H109.001C127.782 29.7217 143.666 43.6143 146.167 62.2275L161.431 175.821C164.454 198.314 146.96 218.315 124.265 218.315H46.1612C23.3274 218.315 5.79376 198.081 9.04274 175.48L25.3719 61.8859Z"
        stroke="currentColor"
        strokeWidth="5"
      />
      <line
        x1="26.619"
        y1="52.5516"
        x2="144.591"
        y2="52.5516"
        stroke="currentColor"
        strokeWidth="5"
      />
      <line
        x1="8.74664"
        y1="192.307"
        x2="160.947"
        y2="192.307"
        stroke="currentColor"
        strokeWidth="5"
      />
      <path
        d="M61.7881 26.0144C61.7881 13.0277 72.3159 2.5 85.3025 2.5C98.2891 2.5 108.817 13.0277 108.817 26.0143V27.7492H61.7881V26.0144Z"
        stroke="currentColor"
        strokeWidth="5"
      />
    </svg>
  )
}
