import { styled } from '@stitches/react'
import React from 'react'

interface CreditCardProps {
  creditCardState?: {
    cardNumber?: string
    cardHolder?: string
    cardValid?: string
    cardSecureCode?: string
  }
}

export const Card = styled('div', {
  width: '320px',
  height: '187.91px',

  background:
    'linear-gradient(247.3deg, rgba(51, 0, 255, 0.25) 0%, rgba(0, 0, 0, 0.06) 76.37%)',
  boxShadow: '-20px 26px 23px rgba(0, 0, 0, 0.25)',
  backdropFilter: 'blur(12.5px)',

  borderRadius: '10px',
})

const CreditCard: React.FC<CreditCardProps> = ({ creditCardState }) => {
  return (
    <div className="relative">
      <div className="absolute -left-4 -bottom-4 w-[320px] h-[187.91px] bg-primary-400 z-0 rounded-md"></div>
      <Card className="border border-light-gray-100 border-opacity-10 z-50">
        {creditCardState?.cardNumber}
      </Card>
    </div>
  )
}

export default CreditCard
