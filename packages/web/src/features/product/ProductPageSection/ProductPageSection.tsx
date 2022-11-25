import * as Input from '@components/Input'

import { useProductPageSection } from './ProductPageSection.hook'
import { ReactMinimalGallery } from 'react-minimal-gallery'
import { useBreakpoint } from '@hooks/useBreakpoint'
import { c, money } from '@utils/helpers'
import { TbSearch } from 'react-icons/tb'
import { trucate } from '@core'
import { Product } from '@utils/types'
import { Divide } from 'core'

import ProductPageSectionSkeleton from './ProductPageSectionSkeleton'
import EvaluationStars from '@components/EvaluationStars'
import ProductSection from '@features/product/ProductSection'
import IconModal from '@components/Modal/IconModal'
import Button from '@components/Button'
import React from 'react'

interface ProductPageSection {
  product?: Product
  products?: Product[]
  loading?: boolean
}
const ProductPageSection: React.FC<ProductPageSection> = ({
  product,
  products,
  loading,
}) => {
  const { md } = useBreakpoint()

  const {
    control,
    errors,
    handleAddToCart,
    handleBuyNow,
    handleCloseModal,
    handleSubmit,
    images,
    openModal,
    register,
    setValue,
  } = useProductPageSection({ product })

  if (loading) return <ProductPageSectionSkeleton />

  return (
    <>
      <IconModal
        open={openModal}
        description="Seu produto foi adicionado ao carrinho com sucesso! O que deseja fazer agora?"
        icon="ozSuccess"
        title="Produto foi adicionado ao carrinho!"
        onClose={handleCloseModal}
        panelClassName="max-w-xl"
        renderActions={() => (
          <>
            <Button
              href="/checkout/cart"
              variant="outlined"
              rounded
              className="w-full"
            >
              Ver carrinho
            </Button>
            <Button
              variant="filled"
              onClick={handleCloseModal}
              rounded
              className="w-full"
            >
              Continuar comprando
            </Button>
          </>
        )}
      />

      <div
        className={c(
          'w-[100%] grid pt-20 space-x-8',
          md ? 'grid-cols-[30%,1fr] px-16' : 'grid-cols-1 px-8'
        )}
      >
        {md && (
          <ReactMinimalGallery
            images={images || []}
            width="100%"
            height={400}
            hoverColor="#4FFF70"
          />
        )}

        <div className="space-y-4">
          <div className="flex flex-col items-start space-y-2">
            <EvaluationStars />
            <h2 className="text-2xl text-light-gray-100 font-semibold">
              {product?.title}
            </h2>
          </div>

          <div className="flex flex-row items-center space-x-2">
            <p className="text-2xl font-semibold text-success-300">
              {money(product?.price)}
            </p>

            <p className="text-sm">
              Em até <strong style={{ color: 'white' }}>6x sem juros</strong>
            </p>
          </div>

          <p>{trucate(product?.description || '')}</p>

          {!md && (
            <ReactMinimalGallery
              images={images || []}
              width="100%"
              height={300}
              hoverColor="#4FFF70"
            />
          )}

          <div className={c('grid grid-cols-2 sm:grid-cols-3 gap-2')}>
            <Input.Select.Default
              label="Cor:"
              placeholder="Cor"
              options={product?.colors?.map((c) => {
                return {
                  label: c,
                  value: c,
                }
              })}
              control={control}
              variant="outlined"
              setValue={setValue}
              error={String(errors.color?.message || '')}
              containerClassName="col-start-1 col-end-2"
              isFullWidth
              {...register('color')}
            />

            <Input.Select.Default
              label="Tamanho:"
              placeholder="Tamanho"
              options={product?.sizes?.map((s) => {
                return {
                  label: s,
                  value: s,
                }
              })}
              control={control}
              variant="outlined"
              setValue={setValue}
              error={String(errors.size?.message || '')}
              containerClassName="col-start-2 col-end-4 sm:col-end-3"
              isFullWidth
              {...register('size')}
            />
          </div>

          <div className={c('grid gap-2 grid-cols-3')}>
            <Input.Cep
              label="Calcular Frete"
              control={control}
              variant="outlined"
              containerClassName="col-start-1 col-end-4 sm:col-end-2"
              isFullWidth
              renderAfter={
                <Button variant="filled" className="p-3">
                  <TbSearch size={20} />
                </Button>
              }
              {...register('frete')}
            />
          </div>

          <div className={c('grid gap-2 grid-cols-3')}>
            <Button
              variant="filled"
              className="col-start-1 col-end-4 sm:col-end-2 mt-4"
              onClick={handleSubmit(handleBuyNow)}
            >
              Comprar agora
            </Button>

            <Button
              variant="outlined"
              className="col-start-1 col-end-4 sm:col-end-2"
              onClick={handleSubmit(handleAddToCart)}
            >
              Adicionar ao carrinho
            </Button>
          </div>
        </div>
      </div>

      <Divide.DivideLine dividerClassName="mx-8 md:mx-16" />

      <div
        id="description"
        className={c('space-y-2 px-8 max-w-full md:px-16 md:max-w-screen-lg')}
      >
        <h2 className="text-xl text-light-gray-100">Descrição</h2>
        <p>{product?.description}</p>
      </div>

      <Divide.DivideLine dividerClassName="mx-8 md:mx-16" />

      <ProductSection
        title="Você Também Pode Gostar"
        products={products || []}
        isLoading={loading}
      />
    </>
  )
}

export default ProductPageSection
