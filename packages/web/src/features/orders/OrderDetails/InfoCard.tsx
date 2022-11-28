import { TbBrandWhatsapp, TbMailForward, TbTruck } from 'react-icons/tb'
import { c, numonly } from '@utils/helpers'
import { Link } from '@core'

import Button from '@components/Button'
import React from 'react'

interface InfoCardProps {
  renderInsideCard?: () => React.ReactNode
}

const InfoCard: React.FC<InfoCardProps> = ({ renderInsideCard }) => {
  const link = React.useMemo(
    () =>
      `https://api.whatsapp.com/send?phone=${numonly(
        '27999021768'
      )}&text=Ol%C3%A1%2C%20Hytzen!%20`,
    []
  )

  const mail = React.useMemo(
    () =>
      `mailto:contato@hytzen.com?Subject=${encodeURI(
        'Assunto da mensagem!'
      )}&body=${encodeURI('Conteúdo da mensagem muito legal!')}`,
    []
  )

  return (
    <div className="flex flex-col sm:flex-row max-sm:space-y-4 sm:space-x-4 items-center justify-between bg-dark-gray-400 rounded-md px-6 py-4 flex-1">
      {renderInsideCard && renderInsideCard()}

      <div className="flex flex-row items-center space-x-2 max-sm:w-full">
        <Button
          variant="filled"
          className="max-sm:w-full bg-[#6b1bff] relative pl-10 font-medium text-sm py-2"
          rounded
        >
          <TbTruck className="absolute left-4" size={16} />
          Rastreie agora
        </Button>

        <Link href={link}>
          <button className={c('bg-success-300 p-2 rounded-full')}>
            <TbBrandWhatsapp className="text-light-gray-100" size={16} />
          </button>
        </Link>

        <Link href={mail}>
          <button className={c('bg-light-gray-100 p-2 rounded-full')}>
            <TbMailForward size={16} />
          </button>
        </Link>
      </div>
    </div>
  )
}

export default InfoCard