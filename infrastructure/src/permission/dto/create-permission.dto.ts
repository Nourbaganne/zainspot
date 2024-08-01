import { Action } from 'src/entities/permission.entity';
import { Role } from 'src/entities/role.entity';

export class CreatePermissionDto {
  name: string;

  action: Action;

  resource: string;

  roles: Role[];
}
