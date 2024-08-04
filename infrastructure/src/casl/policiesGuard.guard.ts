import { UserService } from './../user/user.service';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CaslAbilityFactory } from './casl-ability.factory/casl-ability.factory';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = await this.userService.findUserRolesAndPermissionsById(
      request.user.userId,
    );
    console.log('user', user);
    const ability = this.caslAbilityFactory.createForUser(user);

    const permissions = this.reflector.getAllAndOverride('permissions', [
      context.getHandler(),
      context.getClass(),
    ]);

    return permissions.every((permission) =>
      ability.can(permission.action, permission.subject),
    );
  }
}
