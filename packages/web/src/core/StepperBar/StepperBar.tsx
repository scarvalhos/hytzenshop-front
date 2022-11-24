import React from 'react'

import { c } from '@utils/helpers'

interface StepperBarProps {
  steps: string[]
  activeStep?: number
}

const StepperBar: React.FC<StepperBarProps> = ({ steps, activeStep }) => {
  console.log(activeStep)
  return (
    <div className="w-full flex justify-center items-center">
      <div className="relative my-16 w-[70%]">
        {steps.map((item, index) => (
          <div
            key={item}
            className={c(
              'absolute -top-[8px] h-[20px] w-[20px] border-2 border-dark-gray-400 rounded-full flex items-center justify-center',
              (activeStep || 0) >= index
                ? 'bg-success-300'
                : ' bg-dark-gray-300'
            )}
            style={{
              left: `${(100 / (steps.length - 1)) * index}%`,
            }}
          >
            <p
              className={c(
                'text-center text-xs sm:text-sm mt-12 whitespace-nowrap',
                (activeStep || 0) >= index
                  ? 'text-success-300'
                  : ' text-light-gray-500'
              )}
            >
              {item}
            </p>
          </div>
        ))}

        <div className="bg-dark-gray-300 h-[4px] w-full rounded-sm">
          <div
            className="bg-success-300 h-[4px] rounded-sm"
            style={{
              width: `${(100 / (steps.length - 1)) * Number(activeStep)}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default StepperBar
