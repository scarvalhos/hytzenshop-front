import Image from 'next/image'
import React from 'react'

import { useConfig } from '@contexts/ConfigContext'
import { c } from '@hytzenshop/helpers'

interface SliderProps {
  imageUrl?: string
  short?: boolean
}

const Slider: React.FC<SliderProps> = ({ imageUrl, short = false }) => {
  const [slideIndex, setSlideIndex] = React.useState(0)

  const { sliderImages } = useConfig()

  const images = sliderImages?.map((i) => i?.url) || ['/slider/dc-comics.png']

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

  return (
    <div
      className={c(
        'w-full relative bg-dark-gray-500',
        short ? 'h-[40vh]' : 'h-[50vh]'
      )}
    >
      <div className="w-full h-full relative">
        {(imageUrl || images.length) && (
          <Image
            src={imageUrl || encodeURI(images[slideIndex])}
            alt={imageUrl || encodeURI(images[slideIndex])}
            fill
            sizes="100%"
            className="object-cover object-top"
          />
        )}
      </div>
    </div>
  )
}

export default Slider
