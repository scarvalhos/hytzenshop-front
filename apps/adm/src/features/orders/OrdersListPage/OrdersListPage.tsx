import * as React from 'react'
import * as Input from '@core/Input'

import { TbDownload, TbFilter, TbSearch } from 'react-icons/tb'
import { useOrdersListPage } from './OrdersListPage.hook'
import { OrdersList } from '../OrdersList'
import { c, date } from '@hytzenshop/helpers'
import { Button } from '@luma/ui'

import DashboardPagesLayout from '@layouts/DashboardPagesLayout'
import exportFromJSON from 'export-from-json'

const OrdersListPage: React.FC = () => {
  const {
    setMobileInputs,
    mobileInputs,
    setSearch,
    isLoading,
    setStatus,
    register,
    setPage,
    options,
    control,
    state,
    data,
    sm,
  } = useOrdersListPage()

  return (
    <DashboardPagesLayout
      isLoading={isLoading}
      title="Pedidos"
      renderList={() => <OrdersList orders={data?.data.orders} />}
      pagination={{
        limit: state.limit,
        onPageChange: setPage,
        page: state.page,
        totalRegisters: data?.data.count,
      }}
      header={{
        buttons: () => (
          <Button
            variant="filled"
            className="sm:relative sm:pl-10 max-sm:p-2.5"
            rounded
            onClick={() =>
              exportFromJSON({
                data: data?.data.orders || [],
                fileName: `pedidos-${date(new Date().toString())}`.replaceAll(
                  '_',
                  '-'
                ),
                exportType: exportFromJSON.types.json,
              })
            }
          >
            <TbDownload className="sm:absolute sm:left-4" />
            <span className="max-sm:hidden">Exportar</span>
          </Button>
        ),
        inputs: () => (
          <>
            {sm ? (
              <>
                <Input.Select.Default
                  name="status"
                  placeholder="Filtre por status"
                  variant="filled"
                  options={options}
                  onChangeValue={(e) => setStatus((e as any).value) as any}
                  rounded
                />

                <Input.Field
                  variant="filled"
                  control={control}
                  placeholder="Pesquisar (Usuário ou nº do pedido)"
                  {...register('filter', {
                    onChange: (e) => setSearch(e.target.value),
                  })}
                  rounded
                />
              </>
            ) : (
              <>
                <Button
                  variant="filled"
                  className={c(
                    'sm:relative sm:pl-10 max-sm:p-2.5',
                    mobileInputs.status ? 'bg-success-400' : 'bg-dark-gray-500'
                  )}
                  rounded
                  onClick={() =>
                    setMobileInputs({
                      search: false,
                      status: !mobileInputs.status,
                    })
                  }
                >
                  <TbFilter className="sm:absolute sm:left-4" />
                </Button>

                <Button
                  variant="filled"
                  className={c(
                    'sm:relative sm:pl-10 max-sm:p-2.5',
                    mobileInputs.search ? 'bg-success-400' : 'bg-dark-gray-500'
                  )}
                  rounded
                  onClick={() =>
                    setMobileInputs({
                      search: !mobileInputs.search,
                      status: false,
                    })
                  }
                >
                  <TbSearch className="sm:absolute sm:left-4" />
                </Button>
              </>
            )}
          </>
        ),
        inputsMobile: ({ wrapper }) =>
          !sm && (mobileInputs.status || mobileInputs.search)
            ? wrapper({
                children: (
                  <>
                    {mobileInputs.status && (
                      <Input.Select.Default
                        name="status"
                        placeholder="Filtre por status"
                        variant="filled"
                        options={options}
                        onChangeValue={(e) =>
                          setStatus((e as any).value) as any
                        }
                        isFullWidth
                        rounded
                      />
                    )}

                    {mobileInputs.search && (
                      <Input.Field
                        placeholder="Pesquisar (Usuário ou nº do pedido)"
                        variant="filled"
                        control={control}
                        {...register('filter', {
                          onChange: (e) => setSearch(e.target.value),
                        })}
                        isFullWidth
                        rounded
                      />
                    )}
                  </>
                ),
              })
            : null,
      }}
    />
  )
}

export default OrdersListPage
