import { Injectable } from '@nestjs/common';
import { CreateVisitorDto } from './dto/create-visitor.dto';
import { Visitor } from './visitor.entity';
import { DeepPartial } from 'typeorm';

@Injectable()
export class VisitorService {
  async create(createVisitorDto: CreateVisitorDto): Promise<Visitor> {
    const visitor = Visitor.create(
      createVisitorDto as any as DeepPartial<Visitor>,
    );
    await visitor.save();

    delete visitor.password;
    return visitor;
  }

  async findAll(): Promise<Visitor> {
    const visitor = this.findAll();
    return visitor;
  }

  async showById(id: number): Promise<Visitor> {
    const visitor = await this.findById(id);

    delete visitor.password;
    return visitor;
  }

  async findById(id: number) {
    return await this.findById(id);
  }

  async findByEmail(email: string) {
    return await Visitor.findOne({
      where: {
        email: email,
      },
    });
  }
}
