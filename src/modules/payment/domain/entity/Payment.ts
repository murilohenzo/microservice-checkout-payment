import { Customer } from "modules/customer/domain/entity/Customer";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";

@Entity("tb_payment")
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: "48", unique: true })
  billet: string;

  @Column({ type: "float"})
  amount: number;

  @CreateDateColumn({ name: "payment_date", type: 'date' })
  paymentDate: Date;

  @Column({ type: 'enum', default: "PENDENTE", enum: ['PENDENTE', 'FINALIZADO'] })
  status: string;

  @Column({ type: "float"})
  cashback: number;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: "customer_id", referencedColumnName: "id" })
  customer_id: string;
}