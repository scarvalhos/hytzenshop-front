import { EvaluationStars, trucate, Button, Input } from '@luma/ui'
import { useProductPageSection } from './ProductPageSection.hook'
import { ReactMinimalGallery } from 'react-minimal-gallery'
import { c, money } from '@hytzenshop/helpers'
import { Product } from '@hytzenshop/types'

import ProductEvalutionQuestionsSection from '../ProductEvaluationQuestionsSection/ProductEvaluationQuestionsSection'
import ProductPageSectionSkeleton from './ProductPageSectionSkeleton'
import ShippingSimulationModal from '@components/Modal/ShippingSimulationModal'
import ProductSection from '@features/product/ProductSection'
import IconModal from '@components/Modal/IconModal'
import React from 'react'

interface ProductPageSectionProps {
  product?: Product
  products?: Product[]
  loading?: boolean
}

const ProductPageSection: React.FC<ProductPageSectionProps> = ({
  product,
  products,
  loading,
}) => {
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
    lg,
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
          'max-w-screen-2xl mx-auto grid space-x-8 px-8 md:px-16',
          lg ? 'grid-cols-[30%,1fr]' : 'grid-cols-1'
        )}
      >
        {lg && (
          <ReactMinimalGallery
            images={images || []}
            width="100%"
            height={400}
            hoverColor="#4FFF70"
          />
        )}

        <div className="space-y-4">
          <div className="flex flex-col items-start space-y-2">
            <EvaluationStars
              show="total"
              note={product?.averageRating || 0}
              totalEvaluations={product?.evaluation?.length || 0}
            />
            <h2 className="text-2xl text-primary font-semibold">
              {product?.title}
            </h2>
          </div>

          <div className="flex flex-row items-center space-x-2">
            <p className="text-2xl font-semibold text-success-300">
              {money(product?.price)}
            </p>

            <p className="text-sm">
              Em até <strong className="primary">6x sem juros</strong>
            </p>
          </div>

          <p>
            {trucate({
              text: product?.description || '',
              etc: (
                <a href="#description" className="primary">
                  Ver tudo
                </a>
              ),
            })}
          </p>

          {!lg && (
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
              containerClassName="col-start-2 col-end-4 md:col-end-3"
              isFullWidth
              {...register('size')}
            />
          </div>

          <div className={c('grid gap-2 grid-cols-3')}>
            <ShippingSimulationModal />
          </div>

          <div className={c('grid gap-2 grid-cols-3')}>
            <Button
              variant="filled"
              className="col-start-1 col-end-4 md:col-end-2 mt-4"
              onClick={handleSubmit(handleBuyNow)}
            >
              Comprar agora
            </Button>

            <Button
              variant="outlined"
              className="col-start-1 col-end-4 md:col-end-2"
              onClick={handleSubmit(handleAddToCart)}
            >
              Adicionar ao carrinho
            </Button>
          </div>
        </div>
      </div>

      <div
        className={c('px-8 md:px-16 my-20 max-w-screen-2xl mx-auto')}
        id="description"
      >
        <div className="mb-10 space-y-4">
          <h2 className="text-xl text-primary font-medium">Descrição</h2>
          <p className="whitespace-pre-wrap">{product?.description}</p>
        </div>

        {/* <div className="mb-20 space-y-4">
          <h2 className="text-xl text-light-gray-100 font-medium">
            Especificaçoes técnicas
          </h2>

          <div className="bg-dark-gray-500 bg-opacity-50 rounded-md p-6 flex flex-col sm:flex-row justify-between sm:items-center my-4 max-sm:space-y-4">
            <p>{product?.description}</p>
          </div>
        </div> */}
      </div>

      <ProductEvalutionQuestionsSection product={product} />

      <div className={c('my-20 max-w-screen-2xl mx-auto px-8 sm:px-16')}>
        <ProductSection
          title="Você Também Pode Gostar"
          products={products || []}
          isLoading={loading}
        />
      </div>
    </>
  )
}

export default ProductPageSection
