import { SupabaseClient } from '@supabase/supabase-js';
import { IDevice } from '../../types/device';

export class DevicesAPI {
  constructor(private supabase: SupabaseClient) {
    this.getAllDevices = this.getAllDevices.bind(this);
    this.deleteDevice = this.deleteDevice.bind(this);
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
}
