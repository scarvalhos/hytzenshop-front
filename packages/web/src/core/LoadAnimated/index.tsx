import * as shopAnimate from 'src/assets/shop-animated.json'

import Lottie from 'react-lottie'

interface LoadAnimated {
  size?: number
}

export const LoadAnimated: React.FC<LoadAnimated> = ({ size = 300 }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: shopAnimate,
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
