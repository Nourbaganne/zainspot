import { Action } from 'src/entities/permission.entity';
import { Role } from 'src/entities/role.entity';
export declare class CreatePermissionDto {
    action: Action;
    resource: string;
    roles: Role[];
}
