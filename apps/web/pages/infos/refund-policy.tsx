import { InfosLayout } from '@layouts/InfosLayout'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'

import HeaderFooterLayout from '@layouts/HeaderFooterLayout'
import React from 'react'

const RefundPolicyPage: NextPage = () => {
  return (
    <HeaderFooterLayout glassEffect={false}>
      <NextSeo title="Política de reembolso" />
      <InfosLayout>
        <h1 className="text-light-gray-100 text-2xl">Política de reembolso</h1>
        <p>Esta política de reembolso é válida a partir de Dec 2022.</p>
        <p className="text-light-gray-100 text-body-md">
          POLÍTICA DE REEMBOLSO — Hytzen Shop
        </p>

        <p className="text-light-gray-100 text-body-md">
          Como solicitar uma devolução por arrependimento:
        </p>

        <p>
          Caso você não esteja satisfeito com o produto ou tenha se arrependido
          da compra, você poderá solicitar a devolução em até 7 dias contados da
          data do recebimento do pedido no seu endereço.
        </p>
        <p>
          Envie um e-mail para adm@hytzen.com, informando seu nome completo e
          número do pedido. Você receberá o reembolso em até 30 dias contados da
          data em que recebermos os produtos devolvidos. O valor será
          reembolsado utilizando o mesmo método de pagamento que você selecionou
          ao comprar na nossa loja virtual. Não haverá custo adicional para você
          receber o reembolso.
        </p>
        <p className="text-light-gray-100 text-body-md">
          Como solicitar uma devolução de produtos com defeito:
        </p>
        <p>
          De acordo com a legislação brasileira, no caso de itens com defeito de
          fabricação, você tem o direito de solicitar a devolução em até 30
          dias, contados da data do recebimento do pedido no seu endereço.
        </p>
        <p>
          Envie um e-mail para adm@hytzen.com, informando seu nome completo,
          número do pedido e informações sobre o defeito de fabricação
          (descrição com fotos ou vídeos). Analisaremos o seu caso em até 30
          dias contados da data em que recebermos os produtos devolvidos. O
          valor será reembolsado utilizando o mesmo método de pagamento que você
          selecionou ao comprar na nossa loja virtual. Não haverá custo
          adicional para você receber o reembolso.
        </p>
        <p className="text-light-gray-100 text-body-md">
          Como devolver os produtos:
        </p>
        <p>
          Seguindo o estabelecido pelo Direito do Consumidor, os custos de envio
          da devolução de produtos por direito de arrependimento ou itens com
          defeito de fabricação serão cobertos pela nossa loja através do
          processo de logística reversa.
        </p>
        <p>
          Você receberá um código de autorização de postagem por e-mail após a
          sua solicitação de devolução e deverá postar a mercadoria em uma
          agência dos Correios. Não cobrimos os custos de embalagem, por isso,
          sugerimos que você utilize a mesma embalagem na qual recebeu a sua
          compra (caso não esteja danificada) ou uma caixa adequada que preserve
          as peças durante o transporte.
        </p>

        <div>
          <p className="text-light-gray-100 text-body-md">
            Endereço para devolução de produtos:
          </p>
          <p>Av. Coronel Mateus Cunha, n 513, Sernamby - São Mateus/ES.</p>
        </div>

        <p className="text-light-gray-100 text-body-md">
          Entre em contato conosco:
        </p>

        <p>
          Caso você tenha qualquer dúvida sobre a nossa política de reembolso e
          devolução, por favor, entre em contato pelo e-mail adm@hytzen.com.
        </p>
      </InfosLayout>
    </HeaderFooterLayout>
  )
}

export default RefundPolicyPage
