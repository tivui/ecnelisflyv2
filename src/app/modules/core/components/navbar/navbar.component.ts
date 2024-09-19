import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(private authService: AuthService) { }

  get isLoggedIn(): boolean {
    return !!this.authService.currentUser; // Vérifie si l'utilisateur est connecté
  }

  signOut(): void {
    this.authService.signOut().then(() => {
      console.log('Déconnecté avec succès');
    }).catch(error => {
      console.error('Erreur de déconnexion', error);
    });
  }
}
