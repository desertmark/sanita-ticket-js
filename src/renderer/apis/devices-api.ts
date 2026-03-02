import { SupabaseClient } from '@supabase/supabase-js';
import { IDevice } from '../../types/device';

export class DevicesAPI {
  constructor(private supabase: SupabaseClient) {
    this.getAllDevices = this.getAllDevices.bind(this);
    this.deleteDevice = this.deleteDevice.bind(this);
    this.upsertDevice = this.upsertDevice.bind(this);
    this.getDeviceById = this.getDeviceById.bind(this);
  }

  async getAllDevices(): Promise<IDevice[]> {
    const { data, error } = await this.supabase.from('devices').select('*').order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching devices:', error);
      throw error;
    }

    return data || [];
  }

  async deleteDevice(id: string): Promise<void> {
    const { error } = await this.supabase.from('devices').delete().eq('id', id);

    if (error) {
      console.error('Error deleting device:', error);
      throw error;
    }
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
