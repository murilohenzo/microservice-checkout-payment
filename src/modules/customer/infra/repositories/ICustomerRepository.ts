import { ICustomerDTO } from "../../domain/dto/ICustomerDTO";

export interface ICustomerRepository {
  save(customer: Omit<ICustomerDTO, "id">): Promise<ICustomerDTO>
  findAll(take: number, page: number): Promise<ICustomerDTO[]>;
  findById(id: string): Promise<ICustomerDTO>;
  update(
    id: string,
    customer: Omit<ICustomerDTO, "id">
  ): Promise<ICustomerDTO>;
  delete(id: string): Promise<void>;
}