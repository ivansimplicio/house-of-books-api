import { AuthenticationType } from './dto/authentication-type';
import { AuthenticationInput } from './dto/authentication.input';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthenticationService } from './authentication.service';

@Resolver(() => AuthenticationType)
export class AuthenticationResolver {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Mutation(() => AuthenticationType)
  async login(@Args('data') data: AuthenticationInput): Promise<AuthenticationType> {
    return this.authenticationService.login(data);
  }
}
