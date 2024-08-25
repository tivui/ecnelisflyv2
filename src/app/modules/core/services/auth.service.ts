import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private supabaseClient: SupabaseClient

  constructor() {
    this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  // Register
  public signup(email: string, password: string) {
    return this.supabaseClient.auth.signUp({ email, password });
  }

  // Login
  public signInWithPassord(email: string, password: string) {
    return this.supabaseClient.auth.signInWithPassword({ email, password });
  }

}
