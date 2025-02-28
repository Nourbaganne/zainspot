// server/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
//need to be changed before deployment
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Fix CORS for development
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  });
  
  // Use Socket.IO adapter instead of raw WebSocket
  app.useWebSocketAdapter(new IoAdapter(app));
  await app.listen(3001);
}
bootstrap();