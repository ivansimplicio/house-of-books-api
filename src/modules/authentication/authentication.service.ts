import { UserService } from './services/user.service';
import { AuthenticationType } from './dto/authentication-type';
import { User } from './../users/entities/user.entity';
import { AuthenticationInput } from './dto/authentication.input';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthenticationService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService) {}

  async login(data: AuthenticationInput): Promise<AuthenticationType> {
    const user = await this.validateCredentials(data);
    const token = await this.generateJwtToken(user);
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roles: this.userService.getUserRoles(user)
      },
      token
    };
  }

  private async generateJwtToken(user: User): Promise<string>{
    const payload = {
      id: user.id,
      email: user.email,
      roles: this.userService.getUserRoles(user)
    };
    return this.jwtService.signAsync(payload);
  }

  private async validateCredentials(data: AuthenticationInput): Promise<User> {
    const user = await this.userService.findByEmail(data.email);
    if(user){
      const validPassword = bcrypt.compareSync(data.password, user.password);
      if(validPassword){
        return user;
      }
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}
