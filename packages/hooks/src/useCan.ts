import { validateUserPermission } from '@hytzenshop/helpers'
import { User } from '@hytzenshop/types'

type UseCanParams = {
  isAuthenticated?: boolean
  isAdmin?: boolean
  user: User | null
}

export function useCan({ isAdmin, user, isAuthenticated }: UseCanParams) {
  if (!isAuthenticated) {
    return false
  }

  const userHasValidPermission = validateUserPermission({
    user,
    isAdmin,
  })

  return userHasValidPermission
}
