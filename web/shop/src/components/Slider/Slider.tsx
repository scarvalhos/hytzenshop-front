import React from 'react'

import { useConfig } from '@contexts/ConfigContext'
import { styled } from '@stitches/react'
import { theme } from '@luma/ui'
import { c } from '@hytzenshop/helpers'

interface SliderProps {
  imageUrl?: string
  short?: boolean
}

const Slider: React.FC<SliderProps> = ({ imageUrl, short = false }) => {
  const [slideIndex, setSlideIndex] = React.useState(0)

  const { sliderImages } = useConfig()

  const images = sliderImages?.map((i) => i?.url) || []

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

    '&:before': {
      content: ' ',

      position: 'absolute',
      left: 0,
      top: 0,

      width: '100%',
      height: '100%',
      opacity: '0.75',

      background: theme.colors['dark-gray'][400],
      backgroundImage: `url(${imageUrl || encodeURI(images[slideIndex])})`,
      backgroundPosition: 'top',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',

      transition: '0.2s',
    },
  })

  return (
    <div
      className={c(
        'w-full relative bg-dark-gray-500',
        short ? 'h-[35vh]' : 'h-[50vh]'
      )}
    >
      <div className="w-full h-full flex">
        <Slide className="items-center justify-center">
          <div className="flex w-full max-w-screen-2xl mx-auto px-8 sm:px-16 py-8 sm:py-16 z-30">
            {!short && (
              <h1 className="sm:max-w-[720px] text-light-gray-100 text-5xl sm:text-6xl font-black tracking-tighter">
                As camisetas do seu personagem favorito você encontra aqui.
              </h1>
            )}
          </div>
        </Slide>
      </div>
    </div>
  )
}

export default Slider
