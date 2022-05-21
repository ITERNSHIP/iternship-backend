import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {config} from'dotenv'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  config()
  app.enableCors({
    // origin: "http://localhost:3000"
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
});
  await app.listen(3000);
}
bootstrap();
