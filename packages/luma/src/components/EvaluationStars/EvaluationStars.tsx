import * as React from 'react'

import { c, generateArrayOfNumbers } from '@hytzenshop/helpers'
import { MdStarRate, MdStarHalf } from 'react-icons/md'

export interface EvaluationStarsProps {
  size?: string | number
  noteClassname?: string
  note: number
  totalEvaluations: number
  show: 'note' | 'total'
}

const Star: React.FC<{
  icon: 'filled' | 'half' | 'empyt'
  size?: string | number
}> = ({ icon, size }) => {
  const StarIcon = {
    filled: <MdStarRate className="text-secondary-300" size={size} />,
    half: <MdStarHalf className="text-secondary-300 -mb-[1px]" size={size} />,
    empyt: (
      <MdStarRate className="text-dark-gray-300 brightness-125" size={size} />
    ),
  }

  return StarIcon[icon]
}

export const EvaluationStars: React.FC<EvaluationStarsProps> = ({
  size,
  noteClassname,
  totalEvaluations,
  note,
  show,
}) => {
  const filledStars = generateArrayOfNumbers(0, Math.floor(note))
  const halfStars = generateArrayOfNumbers(
    0,
    Math.ceil(note - Math.floor(note))
  )
  const empytStars = generateArrayOfNumbers(
    0,
    5 - (filledStars.length + halfStars.length)
  )

  if (totalEvaluations === 0)
    return (
      <div className="flex flex-row items-center">
        {generateArrayOfNumbers(1, 6).map((s) => (
          <Star key={s} icon="empyt" size={size} />
        ))}
        <p className={c('text-sm ml-2 -mb-1', noteClassname)}>
          {show === 'note' ? note : `(${totalEvaluations})`}
        </p>
      </div>
    )

  return (
    <div className="flex flex-row items-center">
      {filledStars.map((s) => (
        <Star key={s} icon="filled" size={size} />
      ))}

      {halfStars.map((s) => (
        <Star key={s} icon="half" size={size} />
      ))}

      {empytStars.map((s) => (
        <Star key={s} icon="empyt" size={size} />
      ))}

      <p className={c('text-sm ml-2 -mb-1', noteClassname)}>
        {show === 'note' ? note : `(${totalEvaluations})`}
      </p>
    </div>
  )
}
