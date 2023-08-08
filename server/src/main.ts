import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Add the line below, which you're missing:
  
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));
  await app.listen(3001);
  
}
bootstrap();