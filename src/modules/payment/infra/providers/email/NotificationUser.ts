import nodemailer from "nodemailer";
import Logger from "../../../../../lib/logger";


export class NotificationService {
  static execute(message: any) {
    let transport = nodemailer.createTransport({
      service: "Hotmail",
      auth: {
        user: "murilohezo@hotmail.com",
        pass: "@Mkt86220221"
      }
  });

  let sqsMessage = JSON.parse(message.Body);
  const emailMessage = {
      from: "murilohezo@hotmail.com",
      to: sqsMessage.email,
      subject: 'Pagamento Recebido',
      html: `<p>Ola ${sqsMessage.name}.</p. <p>Seu pagamento de R$ ${sqsMessage.amount} para o boleto foi recebido</p> <p> With ❤️ Will </p>`
  };

  transport.sendMail(emailMessage, (err, info) => {
      if (err) {
          Logger.error(`Service: Emails Service, Action: Error, message: ${err} `)
          console.log(`EmailsSvc | ERROR: ${err}`)
      } else {
          Logger.info(`Service: Emails Service, Action: Successful action, message: ${JSON.stringify(info)} `)
      }
  });

  }
}