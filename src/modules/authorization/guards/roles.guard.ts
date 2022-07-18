import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../common/roles.decorator';
import { Role } from '../common/roles.enum';
import { Reflector } from '@nestjs/core';
import { User } from './../../users/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<Role[]>(ROLES_KEY,
      context.getHandler(),
    );
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    if (!req.user) return true;
    const userRoles = this.getUserRoles(req.user);
    if (!this.userContainsRole(userRoles, requiredRoles)) {
      throw new UnauthorizedException('Access denied');
    }
    return true;
  }

  private userContainsRole(userRoles: string[], requiredRoles: string[]): boolean {
    for(let role of requiredRoles){
      const contains = userRoles.includes(role);
      if(contains){
        return true;
      }
    }
    return false;
  }

  private getUserRoles(user: User): string[] {
    return user.roles.map(role => role.role);
  }
}