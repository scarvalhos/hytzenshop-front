import { TbBrandGithub } from 'react-icons/tb'
import { Button } from '@luma/ui'
import { c } from '@hytzenshop/helpers'

import IconModal from '../IconModal'
import React from 'react'

const WarningModal: React.FC = () => {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const session = sessionStorage.getItem('warningModal')

    if (!session) {
      setOpen(true)
    }
  }, [])

  const onClose = () => {
    setOpen(false)
    sessionStorage.setItem('warningModal', 'false')
  }

  return (
    <IconModal
      icon="ozWarn"
      description="Esse site é apenas um caso de estudo. Portanto, todos os produtos encontrados são fictícios e devem ser desconsiderados. Você pode encontrar o repositório no GitHub  para este projeto através do link abaixo:"
      title="Atenção"
      open={open}
      panelClassName={c('backdrop-blur-[90px] max-h-[80vh] overflow-hidden')}
      onClose={onClose}
      glassEffect={false}
      renderActions={() => (
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="filled"
            href="https://github.com/scarvalhos/hytzenshop-front"
            target="_blank"
            className="w-full"
            rounded
          >
            <span className="flex items-center justify-center space-x-2">
              <TbBrandGithub />
              <p>Github</p>
            </span>
          </Button>
          <Button
            variant="outlined"
            className="w-full"
            onClick={onClose}
            rounded
          >
            Fechar
          </Button>
        </div>
      )}
    />
  )
}

export default WarningModal
