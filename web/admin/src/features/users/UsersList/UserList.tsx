import * as React from 'react'

import { User } from '@hytzenshop/types'

import UserCard from '../UserCard'

interface UsersTableProps {
  users: User[]
}

const UsersList: React.FC<UsersTableProps> = ({ users }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {users.map((u) => (
        <UserCard key={u.id} user={u} />
      ))}
    </div>
  )
}

export default UsersList

// accessor: ({ isAdmin }) => <Switch checked={isAdmin} color="success" />,
