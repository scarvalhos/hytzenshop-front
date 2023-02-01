import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useDebounceCallback } from '@react-hook/debounce'
import { withSSRAuth } from '@hocs/withSSRAuth'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { useForm } from 'react-hook-form'
import { useAuth } from '@contexts/AuthContext'
import { IFile } from '@luma/ui/src/components/Input/File/FileGrid'
import { Input } from '@luma/ui'
import { api } from '@hytzenshop/services'

import UserProfileFormSection from '@features/user/UserProfileFormSection'
import ProfileLayout from '@layouts/ProfileLayout'
import React from 'react'

interface AvatarInitialValuesProps {
  uploaded: boolean
  preview?: string
  url?: string
  id?: string
}

const ProfileDadosPessoaisPage: NextPage = () => {
  const { user } = useAuth()

  const [initialValue, setInitialValue] =
    React.useState<AvatarInitialValuesProps | null>({
      id: user?.profile?.avatar,
      preview: user?.profile?.avatar,
      url: user?.profile?.avatar,
      uploaded: true,
    })

  const queryClient = useQueryClient()

  const { register, control } = useForm()

  const onChange = useMutation(
    (files: IFile[]) => {
      return api.put(`/users/${user?.id}`, {
        profile: { ...user?.profile, avatar: files[0].url },
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['me'])
      },
    }
  ).mutateAsync

  const onChangeDebounce = useDebounceCallback(onChange, 1000)

  const onDelete = useMutation(
    (_id: string) => {
      setInitialValue(null)

      return api.put(`/users/${user?.id}`, {
        profile: { ...user?.profile, avatar: null },
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['me'])
      },
    }
  ).mutateAsync

  return (
    <>
      <NextSeo title="Meu perfil" />

      <ProfileLayout>
        <div className="w-full h-44 bg-primary">
          <div className="max-w-screen-md mx-auto h-full relative px-6">
            {/* <Avatar
              src={user?.profile?.avatar}
              name={user?.profile?.completeName || user?.username}
              imageClassName="w-32 h-32 absolute -bottom-16"
              fallbackClassName="p-12 bg-primary text-xl absolute -bottom-16"
            /> */}

            <Input.File
              control={control}
              filesListDisplay="rounded"
              containerClassName="absolute -bottom-16"
              maxFiles={1}
              multiple={false}
              variant="filled"
              rounded
              onDelete={onDelete}
              onChangeFiles={onChangeDebounce}
              {...register('avatar')}
              defaultValue={initialValue?.id ? [initialValue] : null}
            />
          </div>
        </div>

        <main className="my-20 max-w-screen-md mx-auto">
          <UserProfileFormSection />
        </main>
      </ProfileLayout>
    </>
  )
}

export default ProfileDadosPessoaisPage

export const getServerSideProps = withSSRAuth(
  async () => {
    return {
      props: {},
    }
  },
  {
    mustBeAuthenticated: true,
  }
)
