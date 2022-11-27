import React from 'react'

import { useBreakpoint } from '@hooks/useBreakpoint'
import { c } from '@utils/helpers'

interface StepperBarProps {
  steps: string[]
  activeStep?: number
  stepIcon?: {
    [index: string]: React.ReactElement<
      any,
      string | React.JSXElementConstructor<any>
    >
  }
}

const StepperBar: React.FC<StepperBarProps> = ({
  steps,
  activeStep,
  stepIcon,
}) => {
  const { sm } = useBreakpoint()

  if (!sm) {
    return (
      <span className="flex flex-col items-center justify-center space-y-2 my-6">
        <div
          key={`bullet-${steps[activeStep || 0]}`}
          className={c(
            'h-10 w-10 border-2 border-dark-gray-400 rounded-full flex items-center justify-center bg-success-300'
          )}
        >
          {stepIcon && stepIcon[(activeStep || 0) + 1]}
        </div>
        <p
          className={c(
            'text-center text-sm whitespace-nowrap text-success-300'
          )}
        >
          {steps[activeStep || 0]}
        </p>
      </span>
    )
  }

  return (
    <div className="w-full flex justify-center items-center">
      <div className="relative my-16 w-[70%]">
        {steps.map((item, index) => (
          <>
            <div
              key={item}
              className={c(
                'absolute -top-3.5 h-[32px] w-[32px] border-2 border-dark-gray-400 rounded-full flex items-center justify-center',
                (activeStep || 0) >= index
                  ? 'bg-success-300'
                  : ' bg-dark-gray-300'
              )}
              style={{
                left: `${(100 / (steps.length - 1)) * index}%`,
              }}
            >
              <span className="absolute">
                {stepIcon && stepIcon[(index || 0) + 1]}
              </span>
              <p
                className={c(
                  'text-xs lg:text-sm whitespace-pre-wrap text-center mt-20',
                  (activeStep || 0) >= index
                    ? 'text-success-300'
                    : ' text-light-gray-500'
                )}
                style={{
                  left: `${(100 / (steps.length - 1)) * index}%`,
                }}
              >
                {item}
              </p>
            </div>
          </>
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
