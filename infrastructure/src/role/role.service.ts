import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from 'src/entities/role.entity';

@Injectable()
export class RoleService {
  constructor() {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const newRole = Role.create({
      role: createRoleDto.role,
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
