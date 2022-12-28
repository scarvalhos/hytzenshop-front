import * as Modal from '@core/Modal'

import { EvaluationStars, trucate, Chip } from '@luma/ui'
import { TbBuildingStore, TbDashboard } from 'react-icons/tb'
import { useProductPageSection } from './ProductPageSection.hook'
import { ReactMinimalGallery } from 'react-minimal-gallery'
import { IoIosArrowForward } from 'react-icons/io'
import { c, money } from '@hytzenshop/helpers'
import { Product } from '@hytzenshop/types'

import ProductPageSectionSkeleton from './ProductPageSectionSkeleton'
import React from 'react'
import Link from '@core/Link'

interface ProductPageSectionProps {
  product?: Product
  products?: Product[]
  loading?: boolean
}

const ProductPageSection: React.FC<ProductPageSectionProps> = ({
  product,
  loading,
}) => {
  const { images, lg } = useProductPageSection({ product })

  if (loading) return <ProductPageSectionSkeleton />

  return (
    <>
      <div className="max-w-screen-2xl mx-auto flex items-center space-x-2 px-8 md:px-16 pt-10 pb-4 mb-4 sticky top-10 z-50 bg-black">
        <Link href="/dashboard">
          <span className="w-fit flex items-center justify-center space-x-1">
            <TbDashboard size={18} />
            <p>Dashboard</p>
          </span>
        </Link>

        <IoIosArrowForward />

        <Link href="/dashboard/products">
          <span className="w-fit flex items-center justify-center space-x-1">
            <TbBuildingStore size={18} />
            <p>Produtos</p>
          </span>
        </Link>
      </div>

      <div
        className={c(
          'max-w-screen-2xl mx-auto grid pb-8 space-x-8 px-8 md:px-16',
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

          <p>
            {trucate({
              text: product?.description || '',
              etc: (
                <a href="#description" style={{ color: 'white' }}>
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
            <div className="space-y-2">
              <p>Tamanhos:</p>
              <span className="flex flex-row space-x-2 flex-wrap">
                {product?.sizes?.map((s) => (
                  <Chip
                    key={s}
                    label={s}
                    rounded
                    variant="filled"
                    className="w-fit"
                  />
                ))}
              </span>
            </div>

            <div className="space-y-2">
              <p>Cores:</p>
              {product?.colors?.map((c) => (
                <Chip
                  key={c}
                  label={c}
                  rounded
                  variant="filled"
                  className="w-fit"
                />
              ))}
            </div>
          </div>

          <div className={c('grid gap-2 grid-cols-3')}>
            <Modal.EditProductButtonModal buttonClassName="col-start-1 col-end-4 md:col-end-2 mt-4" />
          </div>
        </div>
      </div>
      <div
        className={c('px-8 md:px-16 my-20 max-w-screen-2xl mx-auto')}
        id="description"
      >
        <div className="mb-10 space-y-4">
          <h2 className="text-xl text-light-gray-100 font-medium">Descrição</h2>
          <p>{product?.description}</p>
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
    </>
  )
}

export default ProductPageSection
