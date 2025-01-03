import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from 'src/entities/role.entity';
import { Permission } from 'src/entities/permission.entity';
import { TranslationService } from 'src/translation/translation.service';

@Injectable()
export class RoleService {
  constructor(
    private translationService: TranslationService
  ) { }

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const newRole = Role.create({
      name: createRoleDto.name,
      permissions: createRoleDto.permissions,
    });
    return Role.save(newRole);
  }

  async findAll(lang: string): Promise<Role[]> {
    const roles = await Role.find({ relations: ['permissions'] });

    for (const role of roles) {
      role.name = await this.translationService.translateText(role.name, 'en', lang);
    }

    return roles; 
  }

  async findOne(id: number, lang?: string): Promise<Role> {
    const role = await Role.findOne({
      where: { id },
      relations: ['permissions'],
    });
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    if (lang){
      role.name = await this.translationService.translateText(role.name, 'en', lang)
    }
    return role;
  }

  async addPermissionToRole(roleId: number, permissionId: number): Promise<Role> {
    const role = await this.findOne(roleId);

    const permission = await Permission.findOne({ where: { id: permissionId } });
    if (!permission) {
      throw new Error('Permission not found');
    }

    // Avoid duplicates
    if (!role.permissions.some((perm) => perm.id === permission.id)) {
      role.permissions.push(permission);
    }

    return Role.save(role);
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
    const role = await this.findOne(id);

    // Update role name
    if (updateRoleDto.name) {
      role.name = updateRoleDto.name;
    }

    // Update permissions
    if (updateRoleDto.permissions) {
      const newPermissions = await Permission.findByIds(updateRoleDto.permissions);
      role.permissions = newPermissions; // Replace with the new permissions
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
