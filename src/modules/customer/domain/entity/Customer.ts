import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from "typeorm";

@Entity("tb_customer")
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: "100", unique: false })
  name: string;

  @Column({ length: "50" })
  email: string;

  @Column()
  age: number;

  @Column()
  sex: string;

  @Column({ length: "11", unique: true })
  cpf: string;

  @Column()
  balance: number;
}