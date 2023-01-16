import jwt from 'jsonwebtoken'

type User = {
  isAdmin: boolean
}

type ValidateUserPermissionsParams = {
  user: User | null
  isAdmin?: boolean
}

export function validateUserPermission({
  user,
  isAdmin,
}: ValidateUserPermissionsParams) {
  const hasPermission = user?.isAdmin === isAdmin

  if (!hasPermission) {
    return false
  }

  user

  return true
}

export const validateToken = (token: string, returnDecoded?: boolean) => {
  let isValidToken = true
  let decodedData

  const secret = process.env.NEXT_PUBLIC_AUTH_SECRET as string

  jwt.verify(token, secret, async function (err, decoded) {
    if (new Date((decoded as any)?.exp * 1000) < new Date()) {
      isValidToken = false
    }

    if (err) {
      isValidToken = false
    }

    if (returnDecoded) {
      decodedData = decoded
    }
  })

  if (returnDecoded) {
    return {
      isValidToken,
      decodedData,
    }
  }

  return isValidToken
}

export const parseToken = (token: string) => {
  const secret = process.env.NEXT_PUBLIC_AUTH_SECRET as string

  jwt.verify(token, secret, async function (_err, decoded) {
    return decoded
  })
}
