import React from 'react'

import { useBreakpoint } from '@hooks/useBreakpoint'
import { useConfig } from '@contexts/ConfigContext'
import { styled } from '@stitches/react'
import { theme } from '@hooks/useTheme'
import { c } from '@utils/helpers'

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
    <div className={c('w-full relative', short ? 'h-[36vh]' : 'h-[74vh]')}>
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
