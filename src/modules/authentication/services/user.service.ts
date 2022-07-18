import { User } from './../../users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email }, relations: ['roles']});
  }

  public getUserRoles(user: User): string[] {
    return user.roles.map(role => role.role);
  }
}
