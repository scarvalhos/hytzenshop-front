import * as React from 'react'

import {
  Box,
  Avatar,
  ClickAwayListener,
  useTheme,
  Popper,
  Stack,
  Typography,
} from '@mui/material'

import { TbUserCircle, TbLogout } from 'react-icons/tb'
import { useAuth } from '@hooks/useAuth'
import { Link } from '../Link'

export default function AccountMenu() {
  const { signOut, user } = useAuth()

  const theme = useTheme()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (!open) {
        setAnchorEl(event.currentTarget)
      } else {
        setAnchorEl(null)
      }
    },
    [open]
  )

  const handleClose = React.useCallback(() => {
    setAnchorEl(null)
  }, [])

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Stack alignItems="end">
          <Typography fontSize="0.875rem" fontWeight="medium" color="white">
            {user?.profile?.completeName}
          </Typography>
          <Typography fontSize="0.75rem">{user?.username}</Typography>
        </Stack>

        <Box
          height="24px"
          width="2px"
          borderRadius={2}
          bgcolor={theme.palette.primary.dark}
        />

        <Avatar
          src="https://github.com/scarvalhos.png"
          sx={{ width: 38, height: 38, cursor: 'pointer' }}
          onClick={handleClick}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : 'false'}
        />
      </Stack>

      <ClickAwayListener
        onClickAway={handleClose}
        mouseEvent="onMouseDown"
        touchEvent="onTouchStart"
      >
        <Popper
          id="account-menu"
          open={open}
          anchorEl={anchorEl}
          onClick={handleClose}
          popperOptions={{
            placement: 'bottom-start',
          }}
          sx={{
            pt: 2,
            zIndex: 13000,
          }}
        >
          <Box
            bgcolor={theme.palette.primary.dark}
            px={2}
            py={1}
            borderRadius={1}
          >
            <Box>Conta</Box>
            <Link
              href={`${process.env.NEXT_PUBLIC_SHOP_URL_FRONTEND}/profile/dados-pessoais`}
            >
              <Stack direction="row" py={1}>
                <TbUserCircle size={20} style={{ marginRight: '10px' }} />
                Minhas informações
              </Stack>
            </Link>

            <Stack
              direction="row"
              py={1}
              sx={{ cursor: 'pointer' }}
              onClick={signOut}
            >
              <TbLogout
                size={20}
                style={{ marginRight: '10px', marginLeft: 2 }}
              />
              Logout
            </Stack>
          </Box>
        </Popper>
      </ClickAwayListener>
    </>
  )
}
