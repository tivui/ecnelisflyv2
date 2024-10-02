import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Utilisation de BehaviorSubject pour maintenir l'état de l'utilisateur
  private user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  private supabaseClient: SupabaseClient;

  constructor(
    private router: Router
  ) {
    this.supabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey);

    // Écoute les changements d'authentification
    this.supabaseClient.auth.onAuthStateChange((event, session) => {
      console.log("event", event);
      if (session) {
        this.user.next(session!.user);  // Mise à jour de BehaviorSubject avec l'utilisateur
      } else {
        this.user.next(null);
        this.router.navigate(['/auth/login'])
      }
    });
  }

  // Getter pour l'utilisateur, renvoie un observable du BehaviorSubject
  public getCurrentUser() {
    console.log("Current user (observable):", this.user.value);
    return this.user.asObservable();  // Retourne un observable
  }

  // Méthode pour accéder directement à la dernière valeur de l'utilisateur sans abonnement
  public getCurrentUserValue(): User | null {
    return this.user.getValue();  // Accède à la dernière valeur sans abonnement
  }

  // Register
  public signup(username: string, email: string, country: string, password: string) {
    return this.supabaseClient.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          clown: username,
          country: country
        },
      },
    });
  }

  // Déconnexion
  public async signOut() {
    await this.supabaseClient.auth.signOut();
    this.user.next(null); // Mise à jour du BehaviorSubject lorsque l'utilisateur se déconnecte
  }

  // Connexion avec email et mot de passe
  public signInWithPassword(email: string, password: string) {
    return this.supabaseClient.auth.signInWithPassword({ email, password });
  }

  // Connexion avec Github
  public signInWithGithub() {
    return this.supabaseClient.auth.signInWithOAuth({ provider: 'github' });
  }
}
