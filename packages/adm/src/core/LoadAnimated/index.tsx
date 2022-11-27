import Lottie from 'react-lottie'
import * as shopAnimate from 'assets/shop-animated.json'

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
