import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { TranslationModule } from 'src/translation/translation.module';

@Module({
  imports: [TranslationModule],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule {}
