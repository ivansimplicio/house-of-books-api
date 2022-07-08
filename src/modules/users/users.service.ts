import { Injectable, UnprocessableEntityException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { cpf } from 'cpf-cnpj-validator';

type Query = {
  where: any;
}

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async create(data: CreateUserInput): Promise<User> {
    await this.validateNewUser(data);
    const user = this.usersRepository.create(data);
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    let user: User;
    try{
      user = await this.usersRepository.findOne({ where: { id } });
    } catch {
      throw new BadRequestException('Invalid UUID.');
    }
    if(!user){
      throw new NotFoundException('User not found.');
    }
    return user;
  }

  async update(id: string, data: UpdateUserInput): Promise<User> {
    const userFound = await this.findOne(id);
    await this.validateUpdatedUser(id, data);
    return this.usersRepository.save({ ...userFound, ...data });
  }

  async remove(id: string): Promise<boolean> {
    const user = await this.findOne(id);
    const deletedUser = await this.usersRepository.remove(user);
    return deletedUser ? true : false;
  }

  private async validateNewUser(data: CreateUserInput): Promise<void> {
    await this.findUserByQuery({ where: { email: data.email } }, 'email');
    await this.findUserByQuery({ where: { cpf: data.cpf } }, 'cpf');
    this.validateCpf(data.cpf);
  }

  private async validateUpdatedUser(id: string, data: UpdateUserInput): Promise<void> {
    if(data.email){
      const query = { where: { email: data.email, id: Not(id) }};
      await this.findUserByQuery(query, 'email');
    }
    if(data.cpf){
      const query = { where: { cpf: data.cpf, id: Not(id) }};
      await this.findUserByQuery(query, 'cpf');
      this.validateCpf(data.cpf);
    }
  }

  private async findUserByQuery(query: Query, field: string): Promise<void> {
    const user = await this.usersRepository.findOne(query);
    if(user){
      throw new UnprocessableEntityException(`The ${field} provided is already registered.`);
    }
  }

  private validateCpf(cpfNumber: string): void {
    if(!cpf.isValid(cpfNumber)) {
      throw new UnprocessableEntityException('Invalid CPF.');
    }
  }
}