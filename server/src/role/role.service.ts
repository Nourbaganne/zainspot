import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from 'src/entities/role.entity';
import { Permission } from 'src/entities/permission.entity';

@Injectable()
export class RoleService {
  constructor() {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const newRole = Role.create({
      name: createRoleDto.name,
      permissions: createRoleDto.permissions,
    });
    return Role.save(newRole);
  }

  findAll(): Promise<Role[]> {
    return Role.find({ relations: ['permissions'] });
  }

  async findOne(id: number): Promise<Role> {
    const role = await Role.findOne({
      where: { id },
      relations: ['permissions'],
    });
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    return role;
  }

  async addPermissionToRole(
    roleId: number,
    permissionId: number,
  ): Promise<Role> {
    const role = await this.findOne(roleId);

    const permission = await Permission.findOne({
      where: { id: permissionId },
    });
    if (!permission) {
      throw new Error('Permission not found');
    }
    role.permissions.push(permission);
    await Role.save(role);
    return role;
  }

  async removePermissionFromRole(
    roleId: number,
    permissionId: number,
  ): Promise<Role> {
    // Fetch the role with its permissions
    const role = await Role.findOne({
      where: { id: roleId },
      relations: ['permissions'],
    });

    if (!role) {
      throw new Error('Role not found');
    }

    // Find the permission to remove
    const permission = await Permission.findOne({
      where: { id: permissionId },
    });

    if (!permission) {
      throw new Error('Permission not found');
    }

    // Remove the permission from the role
    role.permissions = role.permissions.filter((p) => p.id !== permissionId);

    // Save the updated role
    await Role.save(role);

    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await Role.preload({
      id,
      ...updateRoleDto,
    });
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    return Role.save(role);
  }

  async remove(id: number): Promise<void> {
    const result = await Role.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
  }
}
