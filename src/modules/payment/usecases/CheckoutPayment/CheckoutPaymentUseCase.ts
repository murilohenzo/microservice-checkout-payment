import "reflect-metadata"

import AWS from "aws-sdk";
import { Consumer } from "sqs-consumer";
import { PaymentRepository } from "../../infra/repositories/impl/PaymentRepository";
import { NotificationService } from "../../infra/providers/email/NotificationUser";
import Logger from "../../../../lib/logger";

export class CheckoutPaymentUseCase {

  static execute(): void {
    const paymentRepository = new PaymentRepository();

    AWS.config.update({ region: process.env.AWS_REGION_SQS, credentials: {
      //@ts-ignore
      accessKeyId: process.env.AWS_USER_KEY,
      //@ts-ignore
      secretAccessKey: process.env.AWS_USER_SECRET_ACCESS_KEY,
    } });

    const app = Consumer.create({
      queueUrl: process.env.AWS_SQS_URL,
      handleMessage: async (message: any) => {
          console.log(JSON.parse(message.Body))
          const payment = await paymentRepository.findByBillet(JSON.parse(message.Body).billet);

          console.log("payment = ", payment)
          if (payment) {
            payment.status = "FINALIZADO";
            await paymentRepository.save(payment);
  
            NotificationService.execute(message);
          }
      },
      sqs: new AWS.SQS()
  });

  app.on('error', (err) => {
    Logger.error(err.message);
  });

  app.on('processing_error', (err) => {
      Logger.error(err.message);
  });

  Logger.info('Checkout Service is running');
  app.start();
  }
}