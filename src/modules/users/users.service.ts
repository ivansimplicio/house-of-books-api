import { MailerService } from '@nestjs-modules/mailer';
import { WelcomeClientMailer } from './../../services/mailer/mailers/welcome-client.mailer';
import { WelcomeAdminMailer } from './../../services/mailer/mailers/welcome-admin.mailer';
import { AccountDeletionMailer } from './../../services/mailer/mailers/account-deletion.mailer';
import { AddressesService } from './../addresses/addresses.service';
import { Injectable, UnprocessableEntityException, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { cpf } from 'cpf-cnpj-validator';
import { Role } from '../roles/entities/role.entity';
import Roles from '../roles/enums/roles.enum';
import { Role as RoleAuth } from '../authorization/common/roles.enum';
import { CreateAdminInput } from './dto/create-admin.input';

type Query = {
  where: any;
}

@Injectable()
export class UsersService {

  private preloadRelations = ['roles', 'addresses', 'orders', 'orders.deliveryAddress', 'orders.items', 'orders.items.book'];

  constructor(@InjectRepository(User) private usersRepository: Repository<User>,
              @InjectRepository(Role) private rolesRepository: Repository<Role>,
              private readonly addressesService: AddressesService,
              private readonly mailerService: MailerService) {}

  async create(data: CreateUserInput): Promise<User> {
    await this.validateNewUser(data);
    const role = await this.rolesRepository.findOne({ where: { id: Roles.CLIENT } });
    const user = this.usersRepository.create({ ...data, roles: [role] });
    const savedUser = await this.usersRepository.save(user);
    const savedAddress = await this.addressesService.create(savedUser.id, data.address);
    savedUser.addresses = [savedAddress];
    await new WelcomeClientMailer(this.mailerService).sendEmail(savedUser.name, savedUser.email);
    return savedUser;
  }

  async createAdmin(data: CreateAdminInput): Promise<User> {
    await this.validateNewUser(data);
    const role = await this.rolesRepository.findOne({ where: { id: Roles.ADMIN } });
    const admin = this.usersRepository.create({ ...data, roles: [role] });
    const savedAdmin = await this.usersRepository.save(admin);
    await new WelcomeAdminMailer(this.mailerService).sendEmail(savedAdmin.name, savedAdmin.email);
    return savedAdmin;
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: this.preloadRelations });
  }

  async findOne(authUser: User, id: string): Promise<User> {
    if(id !== authUser.id && !this.getUserRoles(authUser).includes(RoleAuth.ADMIN)){
      throw new UnauthorizedException('Access denied.');
    }
    let user: User;
    try{
      user = await this.usersRepository.findOne({ where: { id }, relations: this.preloadRelations });
    } catch {
      throw new BadRequestException('Invalid UUID.');
    }
    if(!user){
      throw new NotFoundException('User not found.');
    }
    return user;
  }

  async update(authUser: User, id: string, data: UpdateUserInput): Promise<User> {
    const userFound = await this.findOne(authUser, id);
    await this.validateUpdatedUser(id, data);
    return this.usersRepository.save({ ...userFound, ...data });
  }

  async remove(authUser: User, id: string): Promise<boolean> {
    const user = await this.findOne(authUser, id);
    const deletedUser = await this.usersRepository.remove(user);
    await new AccountDeletionMailer(this.mailerService).sendEmail(user.name, user.email);
    return deletedUser ? true : false;
  }
  
  private getUserRoles(user: User): string[] {
    return user.roles.map(role => role.role);
  }

  private async validateNewUser(data: CreateUserInput | CreateAdminInput): Promise<void> {
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