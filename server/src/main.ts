import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(bodyParser.json({ limit: '20mb' })); // Adjust the limit as needed
  app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));
  app.enableCors();
  console.log('Server running on http://localhost:3001');
  await app.listen(3001);
}
bootstrap();
