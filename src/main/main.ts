import { NestFactory } from '@nestjs/core';
import { resolve } from 'path';
import { config } from 'dotenv';
import { AppModule } from './modules/app.module';
import { Controllers } from './decorators';

config({ path: resolve('.env') });

export async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule.register());
  Controllers.init(app);
}
bootstrap();
