import { MailerService } from '@nestjs-modules/mailer';
import { ForgotPasswordMailer } from './../../services/mailer/mailers/forgot-password.mailer';
import { ChangePasswordMailer } from './../../services/mailer/mailers/change-password.mailer';
import { ChangePasswordInput } from './dto/change-password.input';
import { ResetPasswordInput } from './dto/reset-password.input';
import { ForgotAccountInput } from './dto/forgot-account.input';
import { LinkToken } from './entities/link-token.entity';
import { User } from './../users/entities/user.entity';
import { Injectable, NotFoundException, BadRequestException, GoneException, UnprocessableEntityException } from '@nestjs/common';
import { promisify } from 'util';
import { randomBytes } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as moment from 'moment';

@Injectable()
export class PasswordsService {

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(LinkToken) private linkTokenRepository: Repository<LinkToken>,
    private readonly mailerService: MailerService) {}

  public async forgot(data: ForgotAccountInput): Promise<boolean> {
    const user = await this.findUserByEmail(data.email);
    const token = await this.generateToken();
    await this.saveNewToken(user, token);
    await new ForgotPasswordMailer(this.mailerService).sendEmail(user.name, user.email, token);
    return true;
  }

  public async reset(token: string, data: ResetPasswordInput): Promise<boolean> {
    this.validatePasswords(data.newPassword, data.passwordConfirmation);
    const user = await this.findUserByToken(token);
    this.validateTokenTime(user.linkToken);
    await this.usersRepository.save({ ...user, password: bcrypt.hashSync(data.newPassword, 8) });
    await this.removeToken(user.linkToken);
    await new ChangePasswordMailer(this.mailerService).sendEmail(user.name, user.email);
    return true;
  }

  public async change(user: User, data: ChangePasswordInput): Promise<boolean> {
    if(!bcrypt.compareSync(data.currentPassword, user.password)){
      throw new UnprocessableEntityException('Current password incorrect');
    }
    this.validatePasswords(data.newPassword, data.passwordConfirmation);
    await this.usersRepository.save({ ...user, password: bcrypt.hashSync(data.newPassword, 8) });
    await new ChangePasswordMailer(this.mailerService).sendEmail(user.name, user.email);
    return true;
  }

  private async findUserByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where : { email }, relations: ['linkToken']});
    if (!user) {
      throw new NotFoundException('The email provided is not registered in the system');
    }
    return user;
  }

  private async generateToken(): Promise<string> {
    const random = await promisify(randomBytes)(24);
    return random.toString('hex');
  }

  private async saveNewToken(user: User, token: string): Promise<void> {
    if(!user.linkToken){
      await this.linkTokenRepository.save({ userId: user.id, token });
    }else{
      await this.linkTokenRepository.save({ ...user.linkToken, token });
    }
  }

  private validatePasswords(newPassword: string, passwordConfirmation: string): void {
    if(newPassword !== passwordConfirmation){
      throw new UnprocessableEntityException('Passwords don\'t match');
    }
  }

  private async findUserByToken(token: string): Promise<User> {
    const linkToken = await this.linkTokenRepository.findOne({ where: { token } });
    if(!linkToken){
      throw new BadRequestException('Invalid token');
    }
    return this.usersRepository.findOne({ where: { id: linkToken.userId }, relations: ['linkToken'] });
  }

  private validateTokenTime(token: LinkToken): void {
    const TOKEN_EXPIRY_HOURS = 4;
    const tokenDate = moment(token.updatedAt);
    const dateNow = moment(new Date()).add(3, 'hours');
    if(dateNow.diff(tokenDate, 'hours') > TOKEN_EXPIRY_HOURS){
      throw new GoneException('Token has expired');
    }
  }

  private async removeToken(linkToken: LinkToken): Promise<void>{
    await this.linkTokenRepository.remove(linkToken);
  }
}
