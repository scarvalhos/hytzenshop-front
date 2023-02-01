import * as React from 'react'

import { User } from '@hytzenshop/types'

import UserCard from '../UserCard'

interface UsersTableProps {
  users: User[]
}

const UsersList: React.FC<UsersTableProps> = ({ users }) => {
  return users.length ? (
    <div className="grid grid-cols-1 gap-4">
      {users.map((u) => (
        <UserCard key={u.id} user={u} />
      ))}
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-[25vh]">
      <p className="text-light-gray-100 font-medium text-xl">
        Nenhum usuário encontrado.
      </p>
      <p>Ops! Parece que nenhum usuário foi encontrado aqui.</p>
    </div>
  )
}

export default UsersList
