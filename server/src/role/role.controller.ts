import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AddPermissionDto } from './dto/add-permission.dto';
import { Public } from 'src/decorators/public.decorator';
import { Permissions } from 'src/decorators/permissions.decorator';

@Controller('role')
export class RoleController {
	constructor(private readonly roleService: RoleService) {}

	@Public()
	@Post()
	create(@Body() createRoleDto: CreateRoleDto) {
		return this.roleService.create(createRoleDto);
	}

	@Permissions({ action: 'create', subject: 'permission' })
	@Post('add-permission')
	async addPermissionToRole(@Body() addPermissionDto: AddPermissionDto) {
		const { roleId, permissionId } = addPermissionDto;
		return this.roleService.addPermissionToRole(roleId, permissionId);
	}

	@Public()
	@Get()
	findAll() {
		return this.roleService.findAll();
	}

	@Public()
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.roleService.findOne(+id);
	}

	@Permissions({ action: 'update', subject: 'role' })
	@Patch(':id')
	update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
		return this.roleService.update(+id, updateRoleDto);
	}

	@Permissions({ action: 'delete', subject: 'role' })
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.roleService.remove(+id);
	}

	@Permissions({ action: 'delete', subject: 'permissionFromRole' })
	@Delete(':roleId/permissions/:permissionId')
	async removePermissionFromRole(
		@Param('roleId') roleId: number,
		@Param('permissionId') permissionId: number,
	) {
		return this.roleService.removePermissionFromRole(roleId, permissionId);
	}
}
