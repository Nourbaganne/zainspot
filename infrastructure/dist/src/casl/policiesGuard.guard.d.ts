import { UserService } from './../user/user.service';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CaslAbilityFactory } from './casl-ability.factory/casl-ability.factory';
export declare class PoliciesGuard implements CanActivate {
    private reflector;
    private userService;
    private caslAbilityFactory;
    constructor(reflector: Reflector, userService: UserService, caslAbilityFactory: CaslAbilityFactory);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
