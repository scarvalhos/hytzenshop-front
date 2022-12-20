import { validateUserPermission } from '../hocs/validateUserPermission'
import { useAuth } from './useAuth'

type UseCanParams = {
  isAdmin?: boolean
}

export function useCan({ isAdmin }: UseCanParams) {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return false
  }

  const userHasValidPermission = validateUserPermission({
    user,
    isAdmin,
  })

  return userHasValidPermission
}
