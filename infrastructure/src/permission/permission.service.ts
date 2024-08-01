import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from 'src/entities/permission.entity';

@Injectable()
export class PermissionService {
  constructor() {}

  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    const newPermission = Permission.create(createPermissionDto);
    return Permission.save(newPermission);
  }

  findAll(): Promise<Permission[]> {
    return Permission.find();
  }

  async findOne(id: number): Promise<Permission> {
    const permission = await Permission.findOneBy({ id });
    if (!permission) {
      throw new NotFoundException(`Permission with ID ${id} not found`);
    }
    return permission;
  }

  async update(
    id: number,
    updatePermissionDto: UpdatePermissionDto,
  ): Promise<Permission> {
    const permission = await Permission.preload({
      id,
      ...updatePermissionDto,
    });
    if (!permission) {
      throw new NotFoundException(`Permission with ID ${id} not found`);
    }
    return Permission.save(permission);
  }

  async remove(id: number): Promise<void> {
    const result = await Permission.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Permission with ID ${id} not found`);
    }
  }
}
