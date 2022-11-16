import * as React from 'react'

import { Stack } from '@mui/material'
import { User } from '@utils/types/auth'

import UserCard from '../UserCard'

interface UsersTableProps {
  users: User[]
}

const UsersList: React.FC<UsersTableProps> = ({ users }) => {
  return (
    <Stack spacing={2}>
      {users.map((u) => (
        <UserCard key={u.id} user={u} />
      ))}
    </Stack>
  )
}

export default UsersList

// const columns = React.useMemo<Column<User>[]>(
//   () => [
//     {
//       Header: 'E-mail',
//       accessor: 'email',
//     },
//     {
//       Header: 'Nome',
//       accessor: 'profile.completeName',
//     },
//     {
//       Header: 'Username',
//       accessor: 'username',
//     },
//     {
//       Header: 'ADM',
//       align: 'center',
//       display: 'row',
//       accessor: ({ isAdmin }) => <Switch checked={isAdmin} color="success" />,
//     },
//   ],
//   []
// )
