import React from 'react'

import { TbPencil } from 'react-icons/tb'
import { useAuth } from '@contexts/AuthContext'
import { c, date } from '@utils/helpers'

import Button from '@components/Button'

interface UserProfileFormSectionReadonlyProps {
  checkout?: boolean
  state: [
    {
      readonly: boolean
    },
    React.Dispatch<
      React.SetStateAction<{
        readonly: boolean
      }>
    >
  ]
}

const UserProfileFormSectionReadonly: React.FC<
  UserProfileFormSectionReadonlyProps
> = ({ state, checkout }) => {
  const { user } = useAuth()

  const [_, dispatch] = state

  return (
    <div
      className={c(
        'grid grid-cols-1 gap-4 rounded-md px-8 py-8',
        checkout && 'bg-dark-gray-400'
      )}
    >
      <div className="flex flex-row space-x-2 items-center">
        <p className="text-xl text-light-gray-100">Dados pessoais</p>
      </div>

      <div className={c('flex flex-col')}>
        <div className={c('grid grid-cols-1 md:grid-cols-2 gap-8')}>
          <div className="col-start-1 col-end-3 md:col-end-2 space-y-1">
            <p className="text-sm">Nome completo:</p>
            <p className="text-light-gray-100">
              {user?.profile?.completeName || '-'}
            </p>
          </div>

          <div className="col-start-1 col-end-3 md:col-start-2 space-y-1">
            <p className="text-sm">Username:</p>
            <p className="text-light-gray-100">{user?.username}</p>
          </div>

          <div className="col-start-1 col-end-3 md:col-end-2 space-y-1">
            <p className="text-sm">E-mail:</p>
            <p className="text-light-gray-100">{user?.email}</p>
          </div>

          <div className="col-start-1 col-end-3 md:col-start-2 space-y-1">
            <p className="text-sm">CPF:</p>
            <p className="text-light-gray-100">{user?.profile?.cpf || '-'}</p>
          </div>

          <div className="col-start-1 col-end-3 md:col-end-2 space-y-1">
            <p className="text-sm">Celular:</p>
            <p className="text-light-gray-100">{user?.profile?.phone || '-'}</p>
          </div>

          <div className="col-start-1 col-end-3 md:col-start-2 space-y-1">
            <p className="text-sm">Data de nascimento:</p>
            <p className="text-light-gray-100">
              {date(user?.profile?.birthDate || '')}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-sm">Endereço:</p>

            {user?.profile?.address && (
              <>
                <p className="text-light-gray-100">
                  {`${user?.profile?.address?.street}, ${user?.profile?.address?.number}` ||
                    '-'}
                </p>
                <p className="text-light-gray-100">
                  {`${user?.profile?.address?.district}, ${user?.profile?.address?.city} - ${user?.profile?.address?.uf}` ||
                    '-'}
                </p>
                <p className="text-light-gray-100">
                  {user?.profile?.address?.cep || '-'},{' '}
                  {user?.profile?.address?.country || '-'}.
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-row space-x-2 items-center mt-6">
        <Button
          variant="filled"
          className="relative pl-12 w-full sm:w-fit font-medium text-sm"
          rounded
          onClick={() => dispatch({ readonly: false })}
        >
          <span className="flex flex-row items-center">
            <TbPencil className="absolute left-6 w-4 h-4" /> Editar dados
          </span>
        </Button>
      </div>
    </div>
  )
}

export default UserProfileFormSectionReadonly
