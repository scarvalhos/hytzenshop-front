import { URL_FRONTEND } from '../../config'

const resetPasswordEmailTemplate = (token: string) => `<!DOCTYPE html>
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
      width: 100%;
      margin: 0;
      padding: 0;
      background-color: #121214;
      color: #80808c;
    "
  >
    <div role="article" aria-roledescription="email" aria-label="" lang="en">
      <table
        style="
          width: 100%;
          padding: 0px 24px;
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
              <tr>
                <td align="center">
                  <p>
                    Precisa de ajuda?
                    <a
                      target="_blank"
                      href="mailto:contato@hyztenshop.com.br"
                      style="color: #4fff70"
                      >contato@hyzten.com</a
                    >
                  </p>
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
                width: 100%;
                max-width: 480px;
                border-radius: 8px;
                background-color: #1c1c20;
                padding: 24px;
              "
              cellpadding="0"
              cellspacing="0"
              role="presentation"
            >
              <tr>
                <td>
                  <h1
                    class="sm-text-3xl"
                    style="
                      text-align: center;
                      font-size: 24px;
                      font-weight: 500;
                      color: #4fff70;
                    "
                  >
                    Informações para<br />
                    redefinição de senha
                  </h1>
                </td>
              </tr>
              <tr>
                <td style="padding-top: 16px; padding-bottom: 16px">
                  <a
                    href="${URL_FRONTEND}/auth/reset-password?token=${token}"
                    style="
                      margin-left: auto;
                      margin-right: auto;
                      display: block;
                      max-width: max-content;
                      border-radius: 9999px;
                      background-color: #44d063;
                      padding-left: 24px;
                      padding-right: 24px;
                      padding-top: 12px;
                      padding-bottom: 12px;
                      text-align: center;
                      font-weight: 500;
                      color: #fff;
                      text-decoration-line: none;
                    "
                    >Redefinir a senha</a
                  >
                </td>
              </tr>
              <tr>
                <td>
                  <hr style="border-color: #242429; border-style: solid" />
                </td>
              </tr>
              <tr>
                <td>
                  <p>
                    Depois de clicar no botão acima, por favor, siga as etapas
                    abaixo:
                  </p>
                  <p>
                    <span style="font-weight: 500; color: #4fff70">1.</span>
                    Insira a nova senha
                  </p>
                  <p>
                    <span style="font-weight: 500; color: #4fff70">2.</span>
                    Confirme a sua nova senha
                  </p>
                  <p>
                    <span style="font-weight: 500; color: #4fff70">3.</span>
                    Clique em &quot;Enviar&quot;
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <h3 style="font-size: 20px; font-weight: 500; color: #4fff70">
                    Este link só pode ser utilizado uma única vez. Ele expirará
                    em duas horas.
                  </h3>
                  <p>
                    Se você não solicitou a redefinição de senha ou se acredita
                    que recebeu esta mensagem por engano, ignore este e-mail.
                  </p>
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
                <td>
                  <hr style="border-color: #242429; border-style: solid" />
                </td>
              </tr>
              <tr>
                <td>
                  <p style="text-align: center; font-size: 14px; margin-top: 24px;">
                    Esta é uma mensagem automática. Por favor, não responda este
                    e-mail.
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

export { resetPasswordEmailTemplate }
