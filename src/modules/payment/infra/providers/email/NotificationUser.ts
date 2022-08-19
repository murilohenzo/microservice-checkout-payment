import nodemailer from "nodemailer";
import Logger from "../../../../../lib/logger";


export class NotificationService {
  static execute(message: any, cashback: number) {
    let transport = nodemailer.createTransport({
      service: "Hotmail",
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
      }
  });

  let sqsMessage = JSON.parse(message.Body);
  const emailMessage = {
      from: "murilohezo@hotmail.com",
      to: sqsMessage.email,
      subject: 'Pagamento Recebido',
      html: 
      `
        <p>Olá ${sqsMessage.name}.</p>
        <p>Seu pagamento de <strong>R$${sqsMessage.amount}</strong> para o boleto foi recebido</p>
        <p>Só lembrando que você recebeu um dim dim a mais no valor de <strong>R$${cashback}</strong>, por pagar o boleto</p>
        <p> Com ❤️ Will </p>
      `
  };

  transport.sendMail(emailMessage, (err, info) => {
      if (err) {
          Logger.error(`Service: Emails Service, Action: Error, message: ${err} `)
      } else {
          Logger.info(`Service: Emails Service, Action: Successful action, message: ${JSON.stringify(info)} `)
      }
  });

  }
}