import { UserService } from './../user/user.service';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CaslAbilityFactory } from './casl-ability.factory/casl-ability.factory';
import { IS_PUBLIC_KEY } from 'src/decorators/public.decorator';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = await this.userService.findUserRolesAndPermissionsById(
      request.user.userId,
    );
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
