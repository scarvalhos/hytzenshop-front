import React, { useState } from 'react'

import { IconButton, Stack, useTheme } from '@mui/material'
import { PersonalDataBoxEditable } from './PersonalDataBoxEditable'
import { useAuth } from '@hooks/useAuth'
import { Icon } from '@iconify/react'
import { date } from '@hytzenshop/helpers'

import {
  Container,
  Content,
  Title,
  Wrapper,
  Label,
  Text,
  ContentWrapper,
} from './styles'

interface PersonalDataBoxProps {
  checkout?: boolean
}

export const PersonalDataBox: React.FC<PersonalDataBoxProps> = ({
  checkout,
}) => {
  const [openModal, setOpenModal] = useState(false)

  const { user } = useAuth()
  const theme = useTheme()

  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)

  return (
    <>
      <PersonalDataBoxEditable
        openModal={openModal}
        handleCloseModal={handleCloseModal}
      />
      <Container checkout={checkout}>
        {!checkout && (
          <Stack direction="row" spacing={1} alignItems="center">
            <Title>Dados pessoais</Title>
            <IconButton
              color="inherit"
              sx={{
                fontSize: '1.2rem',
              }}
              onClick={handleOpenModal}
            >
              <Icon
                icon="clarity:note-edit-line"
                color={theme.palette.text.secondary}
              />
            </IconButton>
          </Stack>
        )}
        <ContentWrapper checkout={checkout}>
          {checkout && (
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              paddingTop="2rem"
              paddingLeft="3rem"
            >
              <Title>Dados pessoais</Title>
              <IconButton
                color="inherit"
                sx={{
                  fontSize: '1.2rem',
                }}
                onClick={handleOpenModal}
              >
                <Icon icon="clarity:note-edit-line" color="#444444" />
              </IconButton>
            </Stack>
          )}
          <Stack direction="column" marginTop={!checkout ? 4 : 0} spacing={4}>
            <Content checkout={checkout}>
              <Wrapper>
                <Label>Nome completo:</Label>
                <Text>{user?.profile?.completeName || '-'}</Text>
              </Wrapper>
              <Wrapper>
                <Label>Username:</Label>
                <Text>{user?.username}</Text>
              </Wrapper>
              <Wrapper>
                <Label>E-mail:</Label>
                <Text>{user?.email}</Text>
              </Wrapper>
              <Wrapper>
                <Label>CPF:</Label>
                <Text>{user?.profile?.cpf || '-'}</Text>
              </Wrapper>
              <Wrapper>
                <Label>Celular:</Label>
                <Text>{user?.profile?.phone || '-'}</Text>
              </Wrapper>
              <Wrapper>
                <Label>Data de nascimento:</Label>
                <Text>{date(user?.profile?.birthDate || '')}</Text>
              </Wrapper>
            </Content>
            <Wrapper checkout={checkout}>
              <Label>Endereço:</Label>
              {user?.profile?.address && (
                <>
                  <Text>
                    {`${user?.profile?.address?.street}, ${user?.profile?.address?.number}` ||
                      '-'}
                  </Text>
                  <Text>
                    {`${user?.profile?.address?.district}, ${user?.profile?.address?.city} - ${user?.profile?.address?.uf}` ||
                      '-'}
                  </Text>
                  <Text>{user?.profile?.address?.cep || '-'}</Text>
                  <Text>{user?.profile?.address?.country || '-'}</Text>
                </>
              )}
            </Wrapper>
          </Stack>
        </ContentWrapper>
      </Container>
    </>
  )
}
