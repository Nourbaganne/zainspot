import { Permission } from 'src/entities/permission.entity';

export class CreateRoleDto {
  role: string;

  permissions: Permission[];
}
