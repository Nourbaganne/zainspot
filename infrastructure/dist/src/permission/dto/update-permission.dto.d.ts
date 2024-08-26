import { CreatePermissionDto } from './create-permission.dto';
import { Action } from 'src/entities/permission.entity';
declare const UpdatePermissionDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreatePermissionDto>>;
export declare class UpdatePermissionDto extends UpdatePermissionDto_base {
    name: string;
    action: Action;
    resource: string;
}
export {};
