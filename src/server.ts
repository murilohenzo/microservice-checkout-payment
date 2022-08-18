import dotenv from "dotenv";

dotenv.config();

import { getDBConnection } from "./config/database";
import { CheckoutPaymentUseCase } from "./modules/payment/usecases/CheckoutPayment/CheckoutPaymentUseCase";
import Logger from "./lib/logger";

(async () => {
  try {
    await getDBConnection();
  } catch (error) {
    Logger.error(error);
  }
  CheckoutPaymentUseCase.execute();
})();