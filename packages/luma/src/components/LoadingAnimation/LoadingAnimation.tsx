import { ShopAnimation } from '@luma/ui'

import Lottie from 'react-lottie'

export interface LoadingAnimationProps {
  size?: number
}

export const LoadingAnimation: React.FC<LoadingAnimationProps> = ({
  size = 300,
}) => {
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
