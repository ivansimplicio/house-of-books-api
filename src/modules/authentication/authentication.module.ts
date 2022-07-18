import { User } from './../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UserService } from './services/user.service';
import { AuthenticationResolver } from './authentication.resolver';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './utils/constants';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn }
    }),
  ],
  providers: [AuthenticationResolver, AuthenticationService, UserService, JwtStrategy]
})
export class AuthenticationModule {}
