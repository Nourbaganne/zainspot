import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';
import { Permission } from 'src/entities/permission.entity';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  name?: string;

  permissions?: Permission[];
}
