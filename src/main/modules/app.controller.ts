/* eslint-disable class-methods-use-this */
// import { Controller } from '@nestjs/common';
import { IpcHandler, Controller } from '../decorators';

export interface IConfig {
  supabaseAnnonKey: string;
  supabaseUrl: string;
}

@Controller('App')
export class AppController {
  @IpcHandler({ name: 'getConfig' })
  getConfig(): IConfig {
    return {
      supabaseAnnonKey: process.env.SUPABASE_ANON_KEY || '',
      supabaseUrl: process.env.SUPABASE_URL || '',
    };
  }
}
