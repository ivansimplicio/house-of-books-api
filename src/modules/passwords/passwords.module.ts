import { LinkToken } from './entities/link-token.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PasswordsService } from './passwords.service';
import { PasswordsResolver } from './passwords.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User, LinkToken])],
  providers: [PasswordsResolver, PasswordsService]
})
export class PasswordsModule {}
