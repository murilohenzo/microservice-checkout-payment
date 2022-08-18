export class IPaymentDTO {
  id: string;
  billet: string;
  amount: number;
  paymentDate: Date;
  status: string;
  cashback: number;
  customer_id: string;
}