import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { Controllers } from './decorators';

export async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule.register());
  Controllers.init(app);
}
bootstrap();
