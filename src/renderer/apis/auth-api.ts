/* eslint-disable class-methods-use-this */
import { SupabaseClient, User } from '@supabase/supabase-js';
import { IUser } from '../../types/auth';

export class AuthAPI {
  constructor(private supabase: SupabaseClient) {
    // Avoid this being undefined when destructuring methods
    this.getUserRole = this.getUserRole.bind(this);
    this.loadSession = this.loadSession.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.toLocalUser = this.toLocalUser.bind(this);
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
      return this.toLocalUser(data.user);
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
    return this.toLocalUser(userRes.user);
  }

  async logout(): Promise<void> {
    const { error } = await this.supabase.auth.signOut();
    if (error) {
      throw error;
    }
  }

  async toLocalUser(supaUser: User): Promise<IUser> {
    const role = await this.getUserRole(supaUser?.id!);
    return {
      id: supaUser?.id,
      email: supaUser?.email!,
      role: role || supaUser?.role!,
      isAdmin: role === 'admin',
    };
  }
}
