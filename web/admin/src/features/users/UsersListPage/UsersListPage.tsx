import * as React from 'react'

import { TbCirclePlus, TbDownload, TbSearch } from 'react-icons/tb'
import { useUsersListPage } from './UsersListPage.hook'
import { Button, Input } from '@luma/ui'
import { c, date } from '@hytzenshop/helpers'

import DashboardPagesLayout from '@layouts/DashboardPagesLayout'
import exportFromJSON from 'export-from-json'
import UsersList from '@features/users/UsersList'

const UsersListPage: React.FC = () => {
  const {
    setMobileSearch,
    setSearch,
    isLoading,
    register,
    setPage,
    control,
    state,
    data,
    push,
    sm,
  } = useUsersListPage()

  return (
    <DashboardPagesLayout
      isLoading={isLoading}
      title="Usuários"
      renderList={() => <UsersList users={data?.data.users || []} />}
      pagination={{
        limit: state.limit,
        onPageChange: setPage,
        page: state.page,
        totalRegisters: data?.data.count,
      }}
      header={{
        buttons: () => (
          <>
            <Button
              variant="filled"
              className="p-3"
              onClick={() => push('/dashboard/users/new-user')}
              rounded
            >
              <span className="flex items-center space-x-2">
                <TbCirclePlus size={20} />
                <span className="max-sm:hidden">Novo usuário</span>
              </span>
            </Button>

            <Button
              variant="outlined"
              rounded
              className="max-sm:p-2.5"
              onClick={() =>
                exportFromJSON({
                  data: data?.data.users || [],
                  fileName: `users-${date(new Date().toString())}`.replaceAll(
                    '_',
                    '-'
                  ),
                  exportType: exportFromJSON.types.json,
                })
              }
            >
              <span className="flex items-center space-x-2">
                <TbDownload />
                <p className="max-sm:hidden">Exportar</p>
              </span>
            </Button>
          </>
        ),
        inputs: () => (
          <>
            {sm ? (
              <Input.Field
                placeholder="Pesquisar"
                variant="filled"
                control={control}
                containerClassName="max-w-sm"
                {...register('search', {
                  onChange: (e) => setSearch(e.target.value),
                })}
                rounded
              />
            ) : (
              <Button
                variant="filled"
                className={c(
                  'sm:relative sm:pl-10 max-sm:p-2.5',
                  state.mobileSearch ? 'bg-success-400' : 'bg-dark-gray-500'
                )}
                rounded
                onClick={() => setMobileSearch(!state.mobileSearch)}
              >
                <TbSearch className="sm:absolute sm:left-4" />
              </Button>
            )}
          </>
        ),
        inputsMobile: ({ wrapper }) =>
          !sm && state.mobileSearch
            ? wrapper({
                children: (
                  <Input.Field
                    placeholder="Pesquisar"
                    variant="filled"
                    control={control}
                    isFullWidth
                    {...register('search', {
                      onChange: (e) => setSearch(e.target.value),
                    })}
                    rounded
                  />
                ),
              })
            : null,
      }}
    />
  )
}

export default UsersListPage
