import { UserService } from './../services/user.service';
import { User } from './../../users/entities/user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './../utils/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(private userService: UserService){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret
    });
  }

  async validate(payload: { id: User['id']; email: User['email'] }){
    const user = await this.userService.findByIdAndEmail(payload.id, payload.email);
    if(!user){
      throw new UnauthorizedException('Unauthorized');
    }
    return user;
  }
}
