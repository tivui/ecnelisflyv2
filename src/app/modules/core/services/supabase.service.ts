import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  private supabaseClient: SupabaseClient

  constructor() {
    this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  // Register
  private signup(email: string, password: string) {
    return this.supabaseClient.auth.signUp({ email, password });
  }

  // Login
  private signInWithPassord(email: string, password: string) {
    return this.supabaseClient.auth.signInWithPassword({ email, password });
  }

}
