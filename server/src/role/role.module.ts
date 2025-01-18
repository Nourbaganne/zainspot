import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TranslationModule } from 'src/translation/translation.module';

@Module({
  imports: [TranslationModule],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule { }
