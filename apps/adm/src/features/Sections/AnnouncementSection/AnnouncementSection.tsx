import * as React from 'react'
import * as Input from '@core/Input'

import { TbDeviceFloppy, TbInfoCircle } from 'react-icons/tb'
import { FormControlLabel, Switch } from '@mui/material'
import { FieldValues, useForm } from 'react-hook-form'
import { useConfig } from '@contexts/ConfigContext'
import { Button } from '@core/Button'

import BoxSection from '@core/BoxSection'

const AnnouncementSection: React.FC = () => {
  const { announcement, showAnnouncement, updateAnnouncement } = useConfig()

  const {
    register,
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm()

  const onClickSubmit = React.useCallback(
    (value: FieldValues) => {
      return updateAnnouncement({
        announcement: value.announcement,
      })
    },
    [updateAnnouncement]
  )

  const handleChange = React.useCallback(() => {
    return updateAnnouncement({
      showAnnouncement: !showAnnouncement,
    })
  }, [])

  return (
    <BoxSection
      title="Announcement"
      description="Atualize a barra de announcement da tela principal."
      renderAfterTitle={() => <TbInfoCircle />}
      spacing
    >
      <FormControlLabel
        label="Ativo"
        labelPlacement="start"
        control={
          <Switch
            checked={showAnnouncement}
            color="success"
            onChange={handleChange}
          />
        }
        sx={{
          maxWidth: 'fit-content',
        }}
      />

      <Input.Textarea
        control={control}
        defaultValue={announcement}
        rows={2}
        disabled={!showAnnouncement}
        {...register('announcement')}
      />

      <Button
        title="Salvar alterações"
        variant="contained"
        icon={<TbDeviceFloppy size={20} style={{ marginRight: 6 }} />}
        fullWidth={false}
        disabled={!showAnnouncement || !isDirty}
        onClick={handleSubmit(onClickSubmit)}
        rounded
        sx={{
          width: 'fit-content',
          maxHeight: '40px',
        }}
      />
    </BoxSection>
  )
}

export default AnnouncementSection
