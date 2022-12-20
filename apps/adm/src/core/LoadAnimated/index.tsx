import { ShopAnimation } from '@luma/ui'

import Lottie from 'react-lottie'

interface LoadAnimated {
  size?: number
}

export const LoadAnimated: React.FC<LoadAnimated> = ({ size = 300 }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: ShopAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return (
    <Lottie
      options={defaultOptions}
      height={size}
      width={size}
      style={{ margin: 0 }}
    />
  )
}
