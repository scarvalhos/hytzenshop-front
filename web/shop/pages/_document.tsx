import * as React from 'react'

import { Html, Main, NextScript, Head } from 'next/document'

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
        <meta property="og:url" content="https://shop.hytzen.com/" />
        <meta property="og:title" content="Hytzen Shop" />
        <meta
          property="og:description"
          content="As camisetas do seu personagem favorito você encontra aqui."
        />
        <meta
          property="og:image"
          content="https://www.shop.hytzen.com/preview.svg"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://shop.hytzen.com/" />
        <meta property="twitter:title" content="Hytzen Shop" />
        <meta
          property="twitter:description"
          content="As camisetas do seu personagem favorito você encontra aqui."
        />
        <meta
          property="twitter:image"
          content="https://www.shop.hytzen.com/preview.svg"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Urbanist:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />

        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <body className="bg">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
