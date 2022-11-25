import * as React from 'react'

import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="title" content="Hytzen Shop" />
        <meta
          name="description"
          content="As camisetas do seu personagem favorito você encontra aqui."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.shop.hytzen.com/" />
        <meta property="og:title" content="Hytzen Shop" />
        <meta
          property="og:description"
          content="As camisetas do seu personagem favorito você encontra aqui."
        />
        <meta
          property="og:image"
          content="https://www.shop.hytzen.com/icons/logo.svg"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.shop.hytzen.com/" />
        <meta
          property="twitter:title"
          content="Hytzen Shop - As camisetas do seu personagem favorito você encontra aqui."
        />
        <meta
          property="twitter:description"
          content="As camisetas do seu personagem favorito você encontra aqui."
        />
        <meta
          property="twitter:image"
          content="https://www.shop.hytzen.com/icons/logo.svg"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/icons/logo.svg" type="image/svg+xml" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
