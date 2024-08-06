// casl-ability.factory.ts
import {
  AbilityBuilder,
  createMongoAbility,
  PureAbility,
  ExtractSubjectType,
  InferSubjects,
  Subject,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { Role } from 'src/entities/role.entity';

type Subjects = InferSubjects<typeof User | typeof Role> | 'all';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type AppAbility = PureAbility<[string, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { can, cannot, build } = new AbilityBuilder<
      PureAbility<[string, Subjects]>
    >(createMongoAbility);

    user.role.permissions.forEach((permission) => {
      console.log('permission');
      can(permission.action, permission.resource as Subject);
    });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
