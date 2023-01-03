import * as Switch from '@radix-ui/react-switch'
import * as React from 'react'

import { TbDeviceFloppy, TbInfoCircle } from 'react-icons/tb'
import { FieldValues, useForm } from 'react-hook-form'
import { Button, Input } from '@luma/ui'
import { useConfig } from '@contexts/ConfigContext'

import BoxSection from '@components/BoxSection'

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
  }, [showAnnouncement, updateAnnouncement])

  return (
    <BoxSection
      title="Announcement"
      description="Atualize a barra de announcement da tela principal."
      renderAfterTitle={() => <TbInfoCircle />}
      className="space-y-3"
    >
      <div className="flex flex-row items-center space-x-2">
        <Switch.Root
          className="SwitchRoot bg-dark-gray-300"
          id="switch"
          defaultChecked={showAnnouncement}
          onClick={handleChange}
        >
          <Switch.Thumb className="SwitchThumb" />
        </Switch.Root>
        <label className="Label" htmlFor="switch" style={{ paddingRight: 15 }}>
          Ativo
        </label>
      </div>

      <Input.Textarea
        rows={2}
        control={control}
        defaultValue={announcement}
        disabled={!showAnnouncement}
        variant="filled"
        isFullWidth
        {...register('announcement')}
      />

      <Button
        variant="filled"
        disabled={!showAnnouncement || !isDirty}
        onClick={handleSubmit(onClickSubmit)}
        className="max-sm:w-full"
      >
        <span className="flex flex-row items-center space-x-1">
          <TbDeviceFloppy size={20} style={{ marginRight: 6 }} />
          <p>Salvar alterações</p>
        </span>
      </Button>
    </BoxSection>
  )
}

export default AnnouncementSection
