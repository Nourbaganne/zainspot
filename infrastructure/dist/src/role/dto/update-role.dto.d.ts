import { CreateRoleDto } from './create-role.dto';
import { Permission } from 'src/entities/permission.entity';
declare const UpdateRoleDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateRoleDto>>;
export declare class UpdateRoleDto extends UpdateRoleDto_base {
    role?: string;
    permissions?: Permission[];
}
export {};
