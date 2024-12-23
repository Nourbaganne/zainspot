import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permissions } from 'src/decorators/permissions.decorator';
import { Public } from 'src/decorators/public.decorator';

@Controller('permission')
export class PermissionController {
	constructor(private readonly permissionService: PermissionService) {}

	@Permissions({ action: 'create', subject: 'permission' })
	@Post()
	create(@Body() createPermissionDto: CreatePermissionDto) {
		return this.permissionService.create(createPermissionDto);
	}

	@Public()
	@Get()
	findAll() {
		return this.permissionService.findAll();
	}

	@Public()
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.permissionService.findOne(+id);
	}

	@Permissions({ action: 'update', subject: 'permission' })
	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updatePermissionDto: UpdatePermissionDto,
	) {
		return this.permissionService.update(+id, updatePermissionDto);
	}

	@Permissions({ action: 'delete', subject: 'permission' })
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.permissionService.remove(+id);
	}
}
