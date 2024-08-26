import { SetMetadata } from '@nestjs/common';

export const Permissions = (
  ...permissions: { action: string; subject: string }[]
) => SetMetadata('permissions', permissions);
