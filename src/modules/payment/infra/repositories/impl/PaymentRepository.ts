import { IPaymentDTO } from "../../../domain/dto/IPaymentDTO";
import { Payment } from "../../../domain/entity/Payment";
import { getRepository, Repository } from "typeorm";
import { IPaymentRepository } from "../IPaymentRepository";

export class PaymentRepository implements IPaymentRepository {
  
  private paymentRepository: Repository<Payment>;

  constructor() {
    this.paymentRepository = getRepository(Payment);
  }

  async save(payment: IPaymentDTO): Promise<IPaymentDTO> {
    const newPayment = this.paymentRepository.create(payment);

    await this.paymentRepository.save(newPayment);

    return newPayment;
  }

  async findAll(take: number = 0, page: number = 10, customer_id: string): Promise<IPaymentDTO[]> {
    if (Number.isNaN(take) && Number.isNaN(page)) {
      return await this.paymentRepository.query(`select * from tb_payment tp where tp.customer_id = '${customer_id}' order by tp.id offset ${0} rows fetch next ${10} rows only`);
    }
    return await this.paymentRepository.query(`select * from tb_payment tp where tp.customer_id = '${customer_id}' order by tp.id offset ${page} rows fetch next ${take} rows only`);
  }

  async findByBillet(billet: string): Promise<IPaymentDTO | undefined> {
    console.log("AQUI - ", billet)
    const payment = await this.paymentRepository.findOne({ billet });
    console.log(payment)
    if (payment) return payment;
    return {} as IPaymentDTO;
  }
  
}