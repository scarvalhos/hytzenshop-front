import { validateUserPermission } from '@utils/validators/validateUserPermission'
import { useAuth } from '@contexts/AuthContext'

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
