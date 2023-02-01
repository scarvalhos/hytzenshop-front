import React from 'react'

import { useBreakpoint } from '@hytzenshop/hooks'
import { c } from '@hytzenshop/helpers'

export interface StepperBarProps {
  steps: string[]
  activeColor?: 'success' | 'failure' | 'pending'
  activeStep?: number
  stepIcon?: {
    [index: string]: React.ReactElement<
      any,
      string | React.JSXElementConstructor<any>
    >
  }
}

export const StepperBar: React.FC<StepperBarProps> = ({
  steps,
  activeStep = 0,
  stepIcon,
  activeColor,
}) => {
  const { sm } = useBreakpoint()

  const color = React.useMemo(() => {
    switch (activeColor) {
      case 'success':
        return 'bg-success-400'

      case 'failure':
        return 'bg-danger-300'

      case 'pending':
        return 'bg-warning-300'

      default:
        return 'bg-secondary'
    }
  }, [activeColor])

  const textColor = React.useMemo(() => {
    switch (activeColor) {
      case 'success':
        return 'text-success-300'

      case 'failure':
        return 'text-danger-300'

      case 'pending':
        return 'text-warning-300'

      default:
        return 'text-secondary'
    }
  }, [activeColor])

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
          <div
            key={item}
            className={c(
              'absolute -top-3.5 h-[32px] w-[32px] border-2 border-dark-gray-400 rounded-full flex items-center justify-center',
              (activeStep || 0) < index ? 'bg-third' : color
            )}
            style={{
              left: `${(100 / (steps.length - 1)) * index}%`,
            }}
          >
            <div className="absolute text-primary">
              {stepIcon && stepIcon[(index || 0) + 1]}
            </div>

            <p
              className={c(
                'text-xs lg:text-sm whitespace-pre-wrap text-center mt-20',
                (activeStep || 0) < index ? 'text-light-gray-500' : textColor
              )}
              style={{
                left: `${(100 / (steps.length - 1)) * index}%`,
              }}
            >
              {item}
            </p>
          </div>
        ))}

        <div className="bg-secondary h-[4px] w-full rounded-sm">
          <div
            className={c(color, 'h-[4px] rounded-sm')}
            style={{
              width: `${(100 / (steps.length - 1)) * Number(activeStep)}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}
