import { PartialType } from '@nestjs/mapped-types';
import { CreatePermissionDto } from './create-permission.dto';
import { Action } from 'src/entities/permission.entity';

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {
  name: string;

  action: Action;

  resource: string;
}
