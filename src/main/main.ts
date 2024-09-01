import { NestFactory } from '@nestjs/core';
import log from 'electron-log';
import { AppModule } from './modules/app.module';
import { Controllers } from './decorators';

log.info(
  '[main] Environment:',
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
);

export async function bootstrap() {
  log.info('[main] Starting application');
  const app = await NestFactory.createApplicationContext(AppModule.register());
  log.info('[main] Initializing controllers');
  await Controllers.init(app);
}
bootstrap();
