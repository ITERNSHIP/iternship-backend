import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {config} from'dotenv'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  config()
  app.enableCors({
    origin: ['https://dev.iternship.net','http://localhost:3000','https://api.iternship.net','https://iternship.net'
    ,'https://dev-api.iternship.net'],
    // origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
});
  await app.listen(8081);
}
bootstrap();
