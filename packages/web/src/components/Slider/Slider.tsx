import * as React from 'react'
// import * as heartAnimated from 'assets/heart-animated.json'

import { useBreakpoint } from '@hooks/useBreakpoint'
import { useConfig } from '@contexts/ConfigContext'
import { styled } from '@stitches/react'
import { theme } from '../../../tailwind.config'
import { c } from '@utils/helpers'

// import Lottie from 'react-lottie'

interface SliderProps {
  imageUrl?: string
  short?: boolean
}

const Slider: React.FC<SliderProps> = ({ imageUrl, short = false }) => {
  const [slideIndex, setSlideIndex] = React.useState(0)

  const { sm } = useBreakpoint()

  const { sliderImages } = useConfig()

  const images = sliderImages?.map((i) => i.url) || []

  React.useEffect(() => {
    if (images.length > 1) {
      setTimeout(() => {
        if (slideIndex === images?.length - 1) {
          setSlideIndex(0)
        } else {
          setSlideIndex(slideIndex + 1)
        }
      }, 12000)
    }
  }, [images?.length, slideIndex])

  const Slide = styled('div', {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',

    '&:before': {
      content: ' ',

      position: 'absolute',
      left: 0,
      top: 0,

      width: '100%',
      height: '100%',
      opacity: '0.85',

      background: theme.colors['dark-gray'][400],
      backgroundImage: `url(${imageUrl || images[slideIndex]})`,
      backgroundPosition: 'top',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',

      transition: '0.2s',
    },
  })

  return (
    <div className={c('w-full relative mb-4', short ? 'h-[36vh]' : 'h-[74vh]')}>
      <div className="w-full h-full flex">
        <Slide>
          <div
            className="flex flex-col items-center justify-center z-[999]"
            style={{
              maxWidth: sm ? 'fit-content' : 'unset',
              padding: sm ? '1rem 2.75rem 0rem' : 0,
            }}
          >
            {!short && (
              <>
                <h1 className="text-center max-w-[620px] text-white text-[2rem] font-bold">
                  As camisetas do seu personagem favorito você encontra aqui
                </h1>
                <p className="text-white">Toda a loja com até 50% OFF</p>
              </>
            )}
          </div>
        </Slide>
      </div>
    </div>
  )
}

export default Slider

// const defaultOptions = {
//   loop: true,
//   autoplay: true,
//   animationData: heartAnimated,
//   rendererSettings: {
//     preserveAspectRatio: 'xMidYMid slice',
//   },
// }
// ;<Lottie
//   speed={0.6}
//   options={defaultOptions}
//   height={sm ? 42 : 52}
//   width={sm ? 42 : 52}
//   style={{
//     marginBottom: '-2rem',
//   }}
// />
