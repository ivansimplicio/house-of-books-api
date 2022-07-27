import { User } from 'src/modules/users/entities/user.entity';
import { GqlAuthGuard } from './../authentication/guards/auth.guard';
import { ChangePasswordInput } from './dto/change-password.input';
import { ResetPasswordInput } from './dto/reset-password.input';
import { ForgotAccountInput } from './dto/forgot-account.input';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { PasswordsService } from './passwords.service';
import { UseGuards } from '@nestjs/common';
import { AuthUser } from '../authentication/utils/auth-user.decorator';

@Resolver()
export class PasswordsResolver {
  constructor(private readonly passwordsService: PasswordsService) {}

  @Mutation(() => Boolean)
  async forgotPassword(@Args('data') data: ForgotAccountInput) {
    return this.passwordsService.forgot(data);
  }

  @Mutation(() => Boolean)
  async resetPassword(@Args('token') token: string, @Args('data') data: ResetPasswordInput) {
    return this.passwordsService.reset(token, data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async changePassword(@AuthUser() authUser: User,  @Args('data') data: ChangePasswordInput) {
    return this.passwordsService.change(authUser, data);
  }
}
