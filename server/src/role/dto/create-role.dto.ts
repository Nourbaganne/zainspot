import { Permission } from 'src/entities/permission.entity';

export class CreateRoleDto {
  name: string;

  permissions: Permission[];
}
