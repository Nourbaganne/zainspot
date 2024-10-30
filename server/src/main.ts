import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as bodyParser from 'body-parser';
// import { join } from 'path';
// import { existsSync, mkdirSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3001);
}
bootstrap();
