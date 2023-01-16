import { DefaultSeoProps } from 'next-seo'

export const defaultSeo: DefaultSeoProps = {
  description: 'As camisetas do seu personagem favorito você encontra aqui.',
  additionalMetaTags: [
    {
      name: 'title',
      content: 'Hytzen Shop',
    },
    {
      name: 'description',
      content: 'As camisetas do seu personagem favorito você encontra aqui.',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: 'https://www.shop.hytzen.com/',
    },
    {
      property: 'og:title',
      content: 'Hytzen Shop',
    },
    {
      property: 'og:description',
      content: 'As camisetas do seu personagem favorito você encontra aqui.',
    },
    {
      property: 'og:image',
      content: 'https://www.shop.hytzen.com/preview.svg',
    },
    {
      property: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      property: 'twitter:url',
      content: 'https://www.shop.hytzen.com/',
    },
    {
      property: 'twitter:title',
      content: 'Hytzen Shop',
    },
    {
      property: 'twitter:description',
      content: 'As camisetas do seu personagem favorito você encontra aqui.',
    },
    {
      property: 'twitter:image',
      content: 'https://www.shop.hytzen.com/preview.svg',
    },
  ],
}
