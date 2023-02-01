import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TbEye, TbTrash } from 'react-icons/tb'
import { withSSRAuth } from '@hocs/withSSRAuth'
import { UserGetDto } from '@hytzenshop/types'
import { NextPage } from 'next'
import { useAuth } from '@contexts/AuthContext'
import { NextSeo } from 'next-seo'
import { c, date } from '@hytzenshop/helpers'
import { Button } from '@luma/ui'
import { api } from '@hytzenshop/services'

import SiderbarLayout from '@layouts/SiderbarLayout'

const onVisualizeNotification = async (id: string) => {
  return api.put(`/notification/${id}?view=true`)
}

const onDeleteNotification = async (id: string) => {
  return api.delete(`/notification/${id}`).then(({ data }) => data)
}

const DashboardNotifications: NextPage = () => {
  const { user } = useAuth()

  const queryClient = useQueryClient()

  const href = {
    user: '/dashboard/users',
    cart: '/dashboard/carts',
    evaluation: '/dashboard/evaluations',
    newsletter: '/dashboard/newsletter',
    order: '/dashboard/orders',
    payment: '/dashboard/products',
    product: '/dashboard/products',
    chat: '/dashboard/customer-service/chat',
  }

  const onVisualizeNotificationMutation = useMutation(onVisualizeNotification, {
    onSuccess: () => queryClient.invalidateQueries(['me']),
  }).mutateAsync

  const onDeleteNotificationMutation = useMutation(onDeleteNotification, {
    onMutate: async (notificationViewId) => {
      await queryClient.cancelQueries({ queryKey: ['me'] })

      const previousMe = queryClient.getQueryData<UserGetDto>(['me'])

      queryClient.setQueryData(['me'], {
        ...previousMe,
        user: {
          ...previousMe?.user,
          notificationsViews: previousMe?.user.notificationsViews.filter(
            (n) => n.id !== notificationViewId
          ),
        },
      })

      return {
        previousMe,
        user: {
          ...previousMe?.user,
          notificationsViews: previousMe?.user.notificationsViews.filter(
            (n) => n.id !== notificationViewId
          ),
        },
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] })
    },

    onError: (_err, _newMe, context) => {
      queryClient.setQueryData(['me'], context?.previousMe)
    },
  }).mutateAsync

  return (
    <>
      <NextSeo title="Notificações" />

      <div className="sticky top-0 mb-8 z-40 bg">
        <h1 className="text-primary py-2 bg font-semibold text-2xl">
          Notificações
        </h1>
      </div>

      <div className="space-y-4 mb-20">
        {user?.notificationsViews
          .filter((n) => n.notification.application === 'adm')
          .map((n) => (
            <div
              key={n?.id}
              className={c(
                'flex justify-between items-center rounded-md bg-primary bg-opacity-90 hover:bg-opacity-100 px-6 py-4 transition-all'
              )}
            >
              <div className="relative pl-3">
                {!n.visualized ? (
                  <div className="w-2 h-2 bg-danger-300 rounded-full absolute top-5 -left-2" />
                ) : null}

                <p className="text-sm">
                  {date(n.notification.createdAt, { withHour: true })}
                </p>
                <p className="text-primary text-lg font-medium">
                  {n.notification.message}
                </p>
              </div>

              <div className="flex justify-center items-center space-x-2 max-lg:px-4">
                <Button
                  onClick={() => onDeleteNotificationMutation(n.id)}
                  variant="outlined-danger"
                  className="transition-all p-3"
                  rounded
                >
                  <TbTrash size={16} />
                </Button>

                <Button
                  onClick={() =>
                    !n.visualized && onVisualizeNotificationMutation(n.id)
                  }
                  href={`${href[n.notification.reference]}/${
                    n.notification.referenceId
                  }`}
                  variant="outlined"
                  className="transition-all p-3"
                  rounded
                >
                  <TbEye size={16} />
                </Button>
              </div>
            </div>
          ))}
      </div>
    </>
  )
}

// @ts-expect-error layout
DashboardNotifications.getLayout = (page: ReactElement) => {
  return <SiderbarLayout>{page}</SiderbarLayout>
}

export default DashboardNotifications

export const getServerSideProps = withSSRAuth(
  async () => {
    return {
      props: {},
    }
  },
  {
    isAdmin: true,
  }
)
