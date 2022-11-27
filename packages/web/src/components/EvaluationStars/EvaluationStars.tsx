import * as React from 'react'

import { MdStarRate, MdStarHalf } from 'react-icons/md'

const Star: React.FC<{ icon: 'filled' | 'half' }> = ({ icon }) => {
  const StarIcon = {
    filled: <MdStarRate className="text-secondary-300" />,
    half: <MdStarHalf className="text-secondary-300 -mb-[1px]" />,
  }

  return StarIcon[icon]
}

const EvaluationStars = () => {
  return (
    <div className="flex flex-row items-center">
      <Star icon="filled" />
      <Star icon="filled" />
      <Star icon="filled" />
      <Star icon="filled" />
      <Star icon="half" />
      <p className="text-sm ml-2 -mb-1">4,8</p>
    </div>
  )
}

export default EvaluationStars
