import * as React from 'react'

import { Container, Content, Title, Description } from './style'
import { Stack, useTheme, useMediaQuery } from '@mui/material'
import { Button } from '@core/Button'
import { Icon } from '@iconify/react'

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}

interface SuccesProps {
  open: boolean
  handleClose: () => void
  title?: string
  description?: string
  onDismiss?: () => void
  onClose?: () => void
}

const Succes: React.FC<SuccesProps> = ({
  open,
  handleClose,
  onDismiss,
  onClose,
  title,
  description,
}) => {
  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <div>
      <Container
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Content style={style}>
          <Stack justifyContent="center" alignItems="center">
            <Icon
              icon="bi:check-circle"
              color={theme.palette.success.main}
              fontSize={62}
            />
          </Stack>

          <Title>{title}</Title>
          <Description>{description}</Description>

          <Stack
            spacing={1}
            marginTop={2}
            direction={sm ? 'column-reverse' : 'row'}
          >
            <Button
              type="button"
              title="Voltar"
              variant="outlined"
              onClick={onDismiss}
            />
            <Button
              type="submit"
              title="Novo produto"
              variant="contained"
              onClick={onClose}
            />
          </Stack>
        </Content>
      </Container>
    </div>
  )
}

export default Succes
