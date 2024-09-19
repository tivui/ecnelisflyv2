import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User | null = null;

  private supabaseClient: SupabaseClient

  constructor() {
    this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey);

    // Écoute les changements d'authentification
    this.supabaseClient.auth.onAuthStateChange((event, session) => {
      if (session) {
        this.user = session.user;
      } else {
        this.user = null;
      }
    });
  }

  // Getter pour l'utilisateur
  public get currentUser(): User | null {
    return this.user;
  }

  // Register
  public signup(email: string, password: string) {
    return this.supabaseClient.auth.signUp({ email, password });
  }

  // Register
  public signOut() {
    return this.supabaseClient.auth.signOut();
  }

  // Login
  public signInWithPassword(email: string, password: string) {
    return this.supabaseClient.auth.signInWithPassword({ email, password });
  }

}
