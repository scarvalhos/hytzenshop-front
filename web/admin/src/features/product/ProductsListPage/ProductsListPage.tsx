import * as React from 'react'

import { TbCirclePlus, TbDownload, TbFilter, TbSearch } from 'react-icons/tb'
import { useProductsListPage } from './ProductsListPage.hook'
import { Button, Input } from '@luma/ui'
import { ProductsList } from '@features/product/ProductsList'
import { c, date } from '@hytzenshop/helpers'

import DashboardPagesLayout from '@layouts/DashboardPagesLayout'
import exportFromJSON from 'export-from-json'

const ProductsListPage: React.FC = () => {
  const {
    setMobileInputs,
    deleteProduct,
    mobileInputs,
    setCategory,
    setSearch,
    isLoading,
    register,
    setPage,
    options,
    control,
    limit,
    page,
    data,
    sm,
  } = useProductsListPage()

  return (
    <DashboardPagesLayout
      isLoading={isLoading}
      title="Produtos"
      renderList={() => (
        <ProductsList
          products={data?.data.products || []}
          deleteProduct={deleteProduct}
        />
      )}
      pagination={{
        limit,
        onPageChange: setPage,
        page,
        totalRegisters: data?.data.count,
      }}
      header={{
        buttons: () => (
          <>
            <Button
              href="/dashboard/products/new-product"
              variant="filled"
              rounded
              className="lg:relative lg:pl-10 max-lg:p-2.5 bg-success-400"
            >
              <TbCirclePlus size={20} className="lg:absolute lg:left-4" />
              <span className="max-lg:hidden">Novo produto</span>
            </Button>

            <Button
              variant="outlined"
              rounded
              className="lg:relative lg:pl-10 max-lg:p-2.5"
              onClick={() =>
                exportFromJSON({
                  data:
                    data?.data.products?.map((product) => {
                      return {
                        ...product,
                        images: product.images.map((i) => i._id),
                      }
                    }) || [],
                  fileName: `produtos-${date(
                    new Date().toString()
                  )}`.replaceAll('_', '-'),
                  exportType: exportFromJSON.types.json,
                })
              }
            >
              <TbDownload className="lg:absolute lg:left-4" />
              <span className="max-lg:hidden">Exportar</span>
            </Button>
          </>
        ),
        inputs: () => (
          <>
            {sm ? (
              <>
                <Input.Select.Default
                  name="filter"
                  placeholder="Filtre por categoria"
                  variant="filled"
                  options={options}
                  onChangeValue={(e) => setCategory((e as any).value) as any}
                  rounded
                />

                <Input.Field
                  type="text"
                  placeholder="Pesquisar"
                  variant="filled"
                  control={control}
                  isFullWidth
                  {...register('search', {
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
                    mobileInputs?.category
                      ? 'bg-success-400'
                      : 'bg-dark-gray-500'
                  )}
                  rounded
                  onClick={() =>
                    setMobileInputs({
                      search: false,
                      category: !mobileInputs?.category,
                    })
                  }
                >
                  <TbFilter className="sm:absolute sm:left-4" />
                </Button>

                <Button
                  variant="filled"
                  className={c(
                    'sm:relative sm:pl-10 max-sm:p-2.5',
                    mobileInputs?.search ? 'bg-success-400' : 'bg-dark-gray-500'
                  )}
                  rounded
                  onClick={() =>
                    setMobileInputs({
                      search: !mobileInputs?.search,
                      category: false,
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
          !sm && (mobileInputs?.category || mobileInputs?.search)
            ? wrapper({
                children: (
                  <>
                    {mobileInputs?.category && (
                      <Input.Select.Default
                        name="filter"
                        placeholder="Filtre por categoria"
                        variant="filled"
                        options={options}
                        isFullWidth
                        onChangeValue={(e) =>
                          setCategory((e as any).value) as any
                        }
                        rounded
                      />
                    )}

                    {mobileInputs.search && (
                      <Input.Field
                        type="text"
                        placeholder="Pesquisar"
                        variant="filled"
                        control={control}
                        isFullWidth
                        {...register('search', {
                          onChange: (e) => setSearch(e.target.value),
                        })}
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

export default ProductsListPage
