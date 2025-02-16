import { VERIFICATION_EMAIL_STYLES } from "./constants";

export const getVerificationEmailHtml = (url: string) => `
<body style="background: ${VERIFICATION_EMAIL_STYLES.emailBackgroundColor}; padding: 32px">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${VERIFICATION_EMAIL_STYLES.mainBackgroundColor}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${VERIFICATION_EMAIL_STYLES.textColor};">
        Вход в аккаунт <strong>Kite</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${VERIFICATION_EMAIL_STYLES.buttonColor}"><a href="${url}"
                target="_blank"
                style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${VERIFICATION_EMAIL_STYLES.mainBackgroundColor}; text-decoration: none; border-radius: 5px; padding: 10px 20px; display: inline-block; font-weight: bold;">Войти</a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${VERIFICATION_EMAIL_STYLES.textColor};">
        Если вы не запрашивали это письмо, проигнорируйте его.
      </td>
    </tr>
  </table>
</body>
`;
