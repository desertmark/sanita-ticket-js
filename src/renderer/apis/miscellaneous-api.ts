/* eslint-disable class-methods-use-this */
import { SupabaseClient } from '@supabase/supabase-js';
import { IDevice } from '../../types/device';

export class MiscellaneousAPI {
  constructor(private supabase: SupabaseClient) {
    this.upsertDevice = this.upsertDevice.bind(this);
    this.getDeviceById = this.getDeviceById.bind(this);
  }

  async upsertDevice(device: IDevice): Promise<void> {
    const { error } = await this.supabase.from('devices').upsert(device);
    if (error) {
      console.error('Error upserting device info:', error);
      throw error;
    }
  }

  async getDeviceById(id: string): Promise<IDevice | null> {
    const { data, error } = await this.supabase.from('devices').select<'*', IDevice>('*').eq('id', id).single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      console.error('Error fetching device by ID:', error);
      throw error;
    }

    return data;
  }
}
