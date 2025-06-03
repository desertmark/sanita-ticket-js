/* eslint-disable class-methods-use-this */
import { SupabaseClient } from '@supabase/supabase-js';
import { IUser } from '../../types/auth';

export class AuthAPI {
  constructor(private supabase: SupabaseClient) {
    // Avoid this being undefined when destructuring methods
    this.getUserRole = this.getUserRole.bind(this);
    this.loadSession = this.loadSession.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async getUserRole(userId: string): Promise<string> {
    const { data: roleRes, error: roleError } = await this.supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId);
    if (roleError) {
      throw roleError;
    }
    return roleRes[0]?.role || '';
  }

  async loadSession(): Promise<IUser | null> {
    const { data } = await this.supabase.auth.getUser();
    if (data?.user) {
      const role = await this.getUserRole(data?.user?.id!);
      return {
        id: data?.user.id,
        email: data?.user.email!,
        role: role || data?.user.role!,
        isAdmin: data?.user.role === 'authenticated',
      };
    }
    return null;
  }

  async login(email: string, password: string): Promise<IUser> {
    const { data: userRes, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw error;
    }
    const role = await this.getUserRole(userRes?.user?.id!);
    return {
      id: userRes?.user?.id!,
      email: userRes?.user?.email!,
      role: role || userRes?.user?.role!,
      isAdmin: userRes?.user?.role === 'admin',
    };
  }

  async logout(): Promise<void> {
    const { error } = await this.supabase.auth.signOut();
    if (error) {
      throw error;
    }
  }
}
