import { URL_FRONTEND } from '../../config'

const updateOrderStatusEmailTemplate = (
  order: any,
  status: string
) => `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
  <head>
    <meta charset="utf-8" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta
      name="format-detection"
      content="telephone=no, date=no, address=no, email=no"
    />
    <meta name="color-scheme" content="light dark" />
    <meta name="supported-color-schemes" content="light dark" />
    <style>
      @media (min-width: 640px) {
        .sm-inline-block {
          display: inline-block !important;
        }
        .sm-px-12 {
          padding-left: 48px !important;
          padding-right: 48px !important;
        }
      }
    </style>
  </head>
  <body
    style="
      word-break: break-word;
      -webkit-font-smoothing: antialiased;
      margin: 0;
      width: 100%;
      padding: 0;
      color: #80808c;
      background-color: #1c1c20;
    "
  >
    <div role="article" aria-roledescription="email" aria-label="" lang="en">
      <table
        style="
          width: 100%;
          font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI',
            sans-serif;
        "
        cellpadding="0"
        cellspacing="0"
        role="presentation"
      >
        <tr>
          <td align="center" style="padding-top: 24px; padding-bottom: 24px">
            <table cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td align="center">
                  <a
                    href="https://shop.hytzen.com.br"
                    style="text-decoration: none"
                  >
                    <span
                      style="font-size: 2rem; color: white; font-weight: 600"
                    >
                      <span style="color: #4fff70">Hytzen</span> Shop</span
                    >
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center">
            <table
              class="sm-px-12"
              style="
                max-width: 480px;
                border-radius: 8px;
                background-color: #1c1c20;
                padding: 24px;
                margin: 24px;
              "
              cellpadding="0"
              cellspacing="0"
              role="presentation"
            >
              <tr>
                <td>
                  <h1
                    class="sm-text-3xl"
                    style="text-align: center; font-size: 24px; color: #4fff70"
                  >
                    O status do seu pedido mudou para
                    <span style="color: white; text-transform: capitalize"
                      >${status}</span
                    >
                  </h1>
                </td>
              </tr>
              <tr>
                <td style="padding-top: 16px; padding-bottom: 16px">
                  <a
                    href="${URL_FRONTEND}/profile/pedidos/${order.id}"
                    style="
                      margin-left: auto;
                      margin-right: auto;
                      display: block;
                      max-width: max-content;
                      border-radius: 9999px;
                      background: #ffffff;
                      padding-left: 24px;
                      padding-right: 24px;
                      padding-top: 12px;
                      padding-bottom: 12px;
                      text-align: center;
                      font-weight: 500;
                      color: rgb(0, 0, 0);
                      text-decoration-line: none;
                    "
                    >Acompanhar pedido</a
                  >
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding-top: 24px">
            <table
              class="sm-px-12"
              style="
                max-width: 480px;
                border-radius: 8px;
                padding-left: 24px;
                padding-right: 24px;
              "
              cellpadding="0"
              cellspacing="0"
              role="presentation"
            >
              <tr>
                <td align="center" style="line-height: 1.25">
                  <p>
                    Precisa de ajuda?
                    <a
                      target="_blank"
                      href="mailto:contato@hyztenshop.com.br"
                      style="color: #4fff70"
                      >contato@hyztenshop.com.br</a
                    >
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p style="text-align: center; font-size: 14px">
                    Não responda a este email. Os emails enviados a este
                    endereço não serão respondidos.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>
`

export { updateOrderStatusEmailTemplate }
