/* eslint-disable class-methods-use-this */
import { Controller } from '@nestjs/common';
import { IpcHandler } from '../decorators';

export interface IConfig {
  supabaseAnnonKey: string;
  supabaseUrl: string;
}

@Controller()
export class AppController {
  @IpcHandler({ name: 'getData' })
  getConfig(): IConfig {
    return {
      supabaseAnnonKey: process.env.SUPABASE_ANON_KEY || '',
      supabaseUrl: process.env.SUPABASE_URL || '',
    };
  }
}
