import { PureAbility, InferSubjects } from '@casl/ability';
import { User } from 'src/entities/user.entity';
import { Role } from 'src/entities/role.entity';
type Subjects = InferSubjects<typeof User | typeof Role> | 'all';
export declare class CaslAbilityFactory {
    createForUser(user: User): PureAbility<[string, Subjects], unknown>;
}
export {};
