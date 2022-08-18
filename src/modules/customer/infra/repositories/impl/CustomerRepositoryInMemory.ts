import { Customer } from "../../../domain/entity/Customer";
import { ICustomerDTO } from "../../../domain/dto/ICustomerDTO";
import { ICustomerRepository } from "../ICustomerRepository";
import { v4 as uuidv4 } from 'uuid'

export class CustomerRepositoryInMemory implements ICustomerRepository {
  
  private customers: ICustomerDTO[] = [];
  
  async save(customer: ICustomerDTO): Promise<ICustomerDTO> {
    const newCustomer = new Customer();

    Object.assign(newCustomer, { id: uuidv4() }, customer);

    await this.customers.push(newCustomer);

    return newCustomer;
  }
  async findAll(take: number, page: number): Promise<ICustomerDTO[]> {
    const customers = await this.customers.slice((page - 1) * take, page * take);
    return customers;
  }
  async findById(id: string): Promise<ICustomerDTO> {
    const customer = await this.customers.find((customer) => customer.id === id);
    if (customer) return customer;
    throw new Error("Not found customer");
  }
  async update(id: string, customer: Omit<ICustomerDTO, "id">): Promise<ICustomerDTO> {
    const existsCustomer = await this.findById(id);

    existsCustomer.name = customer.name || existsCustomer.name;
    existsCustomer.age = customer.age || existsCustomer.age;
    existsCustomer.cpf = customer.cpf || existsCustomer.cpf;
    existsCustomer.balance = customer.balance || existsCustomer.balance;

    return existsCustomer;
  }
  async delete(id: string): Promise<void> {
    this.customers = await this.customers.filter(
      (customer) => customer.id !== id
    );
  }
  
}