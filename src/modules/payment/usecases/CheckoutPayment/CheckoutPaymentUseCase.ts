import AWS from "aws-sdk";
import { Consumer } from "sqs-consumer";

import { CustomerRepository } from "../../../customer/infra/repositories/impl/CustomerRepository";
import { PaymentRepository } from "../../infra/repositories/impl/PaymentRepository";
import { NotificationService } from "../../infra/providers/email/NotificationUser";

import Logger from "../../../../lib/logger";
import { api } from "../../../../shared/http/services/api";
export class CheckoutPaymentUseCase {

  static execute(): void {
    const paymentRepository = new PaymentRepository();
    const customerRepository = new CustomerRepository();

    AWS.config.update({ region: process.env.AWS_REGION_SQS, credentials: {
      //@ts-ignore
      accessKeyId: process.env.AWS_USER_KEY,
      //@ts-ignore
      secretAccessKey: process.env.AWS_USER_SECRET_ACCESS_KEY,
    } });

    const app = Consumer.create({
      queueUrl: process.env.AWS_SQS_URL,
      handleMessage: async (message: any) => {
          const payment = await paymentRepository.findByBillet(JSON.parse(message.Body).billet);
          if (payment) {
            payment.status = "FINALIZADO";
            await paymentRepository.save(payment);
            const cashback = (payment.amount * (payment.cashback / 100));
            const customer = await customerRepository.findById(payment.customer_id);
            customer.balance = (customer.balance - payment.amount) + cashback;

            api.post("", {
              "billet": payment.billet,
              "amount": payment.amount
            })
              .then(async () => {
                Logger.info(`Processing payment for billet: ${payment.billet}`)
                await customerRepository.save(customer)
                NotificationService.execute(message, cashback);
              })
              .catch((err) => {
                Logger.error(err.message)
              })
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