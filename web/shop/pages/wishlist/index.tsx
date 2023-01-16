import { useWishlist } from '@contexts/WishlistContext'
import { useConfig } from '@contexts/ConfigContext'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { TbHeart } from 'react-icons/tb'

import HeaderFooterLayout from '@layouts/HeaderFooterLayout'
import ProductSection from '@features/product/ProductSection'
import Image from 'next/image'
import React from 'react'

const WishlistPage: NextPage = () => {
  const { productsSugestions } = useConfig()
  const { wishlist } = useWishlist()

  return (
    <HeaderFooterLayout>
      <NextSeo title="Wishlist" />

      <div className="max-w-screen-2xl mx-auto px-8 sm:px-16 my-24">
        {wishlist && wishlist.length > 0 && (
          <ProductSection
            title="Wishlist"
            products={wishlist || []}
            showSeeAll={false}
          />
        )}

        {wishlist?.length === 0 && (
          <div className="flex flex-col items-center justify-center mb-12 px-8 space-y-8">
            <div className="flex flex-col items-center">
              <p className="text-4xl text-light-gray-100 font-semibold">
                Wishlist
              </p>
              <p className="text-base text-light-gray-100">
                Sua lista de desejos está vazia.{' '}
                <strong> Deseja salvar novos itens?</strong>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center space-y-8 sm:space-y-0 sm:space-x-8">
              <Image
                src="/images/product.svg"
                alt="Product"
                width={150}
                height={150}
              />

              <div className="flex flex-col items-start justify-start space-y-2">
                <p className="text-xl text-light-gray-100 font-medium">
                  Clique no coração para salvar
                </p>

                <div className="flex flex-row items-center justify-center space-x-1">
                  <TbHeart />
                  <p className="text-sm text-light-gray-500">
                    Armazene tudo o que você ama em uma página.
                  </p>
                </div>

                <div className="flex flex-row items-center justify-center space-x-1">
                  <TbHeart />
                  <p className="text-sm text-light-gray-500">
                    Receba notificações sobre itens esgotados.
                  </p>
                </div>
                <div className="flex flex-row items-center justify-center space-x-1">
                  <TbHeart />
                  <p className="text-sm text-light-gray-500">
                    Não perca os itens que você amou.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <ProductSection
          title="Você Também Pode Gostar"
          products={productsSugestions}
        />
      </div>
    </HeaderFooterLayout>
  )
}

export default WishlistPage
