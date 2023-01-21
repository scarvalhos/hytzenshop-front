import * as Switch from '@radix-ui/react-switch'
import * as React from 'react'

import { TbDeviceFloppy, TbInfoCircle } from 'react-icons/tb'
import { FieldValues, useForm } from 'react-hook-form'
import { useDebounceCallback } from '@react-hook/debounce'
import { Button, Input } from '@luma/ui'
import { FileRecord } from '@hytzenshop/types'
import { useConfig } from '@contexts/ConfigContext'

import BoxSection from '@components/BoxSection'

const AnnouncementSection: React.FC = () => {
  const {
    announcement,
    showAnnouncement,
    announcementImage,
    updateAnnouncement,
  } = useConfig()

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

  const onShowAnnouncementChange = React.useCallback(() => {
    return updateAnnouncement({
      showAnnouncement: !showAnnouncement,
    })
  }, [showAnnouncement, updateAnnouncement])

  const onChangeAnnouncementImage = React.useCallback(
    (files: FileRecord[]) => {
      return updateAnnouncement({
        announcementImage: files[0].id,
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const onChangeAnnouncementImageDebounce = useDebounceCallback(
    onChangeAnnouncementImage,
    100
  )

  const onDeleteAnnouncementImage = React.useCallback(
    (_id: string) => {
      return updateAnnouncement({
        announcementImage: undefined,
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <BoxSection
      title="Announcement"
      description="Atualize a barra de announcement da tela principal."
      renderAfterTitle={() => <TbInfoCircle />}
      className="space-y-6"
    >
      <div className="flex flex-row items-center space-x-2">
        <label className="Label" htmlFor="switch" style={{ paddingRight: 15 }}>
          Ativo
        </label>

        <Switch.Root
          id="switch"
          className="SwitchRoot bg-third"
          defaultChecked={showAnnouncement}
          checked={showAnnouncement}
          onClick={onShowAnnouncementChange}
        >
          <Switch.Thumb className="SwitchThumb" />
        </Switch.Root>
      </div>

      <div className="space-y-4">
        <Input.Textarea
          rows={1}
          label="Descrição"
          control={control}
          defaultValue={announcement}
          disabled={!showAnnouncement}
          variant="filled"
          isFullWidth
          rounded
          {...register('announcement')}
        />

        <Input.File
          label="Imagem"
          control={control}
          filesListDisplay="list"
          variant="filled"
          listItemRounded
          isFullWidth
          maxFiles={1}
          disabled={!showAnnouncement}
          onDelete={onDeleteAnnouncementImage}
          onChangeFiles={onChangeAnnouncementImageDebounce}
          {...register('announcementImage')}
          {...(announcementImage?._id && {
            defaultValue: [
              {
                ...announcementImage,
                id: announcementImage?._id,
                preview: announcementImage?.url,
                uploaded: true,
              },
            ],
          })}
        />
      </div>

      <div>
        <Button
          variant="filled"
          disabled={!showAnnouncement || !isDirty}
          onClick={handleSubmit(onClickSubmit)}
          className="max-sm:w-full"
          rounded
        >
          <span className="flex flex-row items-center space-x-1">
            <TbDeviceFloppy size={18} />
            <p>Salvar alterações</p>
          </span>
        </Button>
      </div>
    </BoxSection>
  )
}

export default AnnouncementSection
