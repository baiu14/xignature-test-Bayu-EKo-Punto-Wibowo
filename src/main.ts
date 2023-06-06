import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*'
  })
  await app.listen(process.env.APP_PORT)
  .then(() => {
    console.log(`successfully stared on port ${process.env.APP_PORT}`);
  });
}
bootstrap();
