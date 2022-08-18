import { IPaymentDTO } from "modules/payment/domain/dto/IPaymentDTO";

export interface IPaymentRepository {
  save(payment: Omit<IPaymentDTO, "id" | "status" | "paymentDate">): Promise<IPaymentDTO>;
  findByBillet(billet: string): Promise<IPaymentDTO | undefined>;
  findAll(take: number, page: number, customer_id: string): Promise<IPaymentDTO[]>;
}