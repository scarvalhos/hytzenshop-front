import * as React from 'react'

import {
  Avatar,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'

import { TbBrandWhatsapp, TbEye, TbMailForward } from 'react-icons/tb'
import { getFirstLetters, getFirstName, numonly } from '@hytzenshop/helpers'
import { IconButton } from '@features/orders/Order/styles'
import { User } from '@hytzenshop/types'
import { Link } from '@core/Link'

interface UserCardProps {
  user?: User
  renderInsideCard?: () => React.ReactNode
}

const UserCard: React.FC<UserCardProps> = ({ user, renderInsideCard }) => {
  const theme = useTheme()

  const sm = useMediaQuery(theme.breakpoints.down('sm'))

  const link = React.useMemo(
    () =>
      `https://api.whatsapp.com/send?phone=${numonly(
        user?.profile?.phone
      )}&text=Ol%C3%A1%2C%20${getFirstName(user?.profile?.completeName)}!%20`,
    [user?.profile?.completeName, user?.profile?.phone]
  )

  const mail = React.useMemo(
    () =>
      `mailto:${user?.email}?Subject=${encodeURI(
        'Assunto da mensagem!'
      )}&body=${encodeURI('Conteúdo da mensagem muito legal!')}`,
    [user?.email]
  )

  return (
    <Stack
      direction={sm ? 'column' : 'row'}
      spacing={2}
      alignItems="center"
      justifyContent="space-between"
      bgcolor={theme.palette.secondary.dark}
      borderRadius={1}
      px={3}
      py={2}
      flex={1}
    >
      <Stack direction="row" spacing={1}>
        <Avatar
          src={user?.profile?.avatar || ''}
          sx={{
            width: 42,
            height: 42,
            border: user?.profile?.avatar
              ? `1.5px solid ${theme.palette.success.main}`
              : '',
            background: theme.palette.primary.dark,
            ...(!user?.profile?.avatar && {
              filter: 'brightness(1.5)',
            }),
          }}
        >
          {!user?.profile?.avatar && (
            <Typography color={theme.palette.text.secondary} fontSize="0.75rem">
              {getFirstLetters(user?.username || '')}
            </Typography>
          )}
        </Avatar>

        <Stack>
          <Typography
            color={theme.palette.text.primary}
            fontSize="1rem"
            fontWeight="medium"
            mb={-0.5}
          >
            {user?.profile?.completeName}
          </Typography>
          <Typography color={theme.palette.text.secondary} fontSize="0.75rem">
            {user?.email}
          </Typography>
        </Stack>
      </Stack>

      {renderInsideCard && renderInsideCard()}
      <Stack direction="row" spacing={1}>
        <Link href={link} target="_blank">
          <IconButton bg={theme.palette.secondary.main}>
            <TbBrandWhatsapp size={16} color={theme.palette.primary.light} />
          </IconButton>
        </Link>
        <Link href={mail}>
          <IconButton bg={theme.palette.primary.light}>
            <TbMailForward
              size={16}
              color={theme.palette.primary.contrastText}
            />
          </IconButton>
        </Link>
        <IconButton bg={theme.palette.primary.dark}>
          <TbEye size={16} color={theme.palette.success.main} />
        </IconButton>
      </Stack>
    </Stack>
  )
}

export default UserCard
