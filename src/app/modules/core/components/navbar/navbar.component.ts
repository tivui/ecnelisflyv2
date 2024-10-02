import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],  // Assurez-vous que c'est 'styleUrls' au lieu de 'styleUrl'
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;  // Variable locale pour suivre l'état de connexion
  private userSubscription: Subscription | undefined;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    // S'abonner aux changements d'état de l'utilisateur
    this.userSubscription = this.authService.getCurrentUser().subscribe(user => {
      this.isLoggedIn = !!user;  // Met à jour isLoggedIn en fonction de la présence d'un utilisateur
      console.log('User state in Navbar:', user);
      console.log("this.isLoggedIn", this.isLoggedIn)
    });
  }

  ngOnDestroy() {
    // Désabonnement pour éviter les fuites de mémoire
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  // Méthode pour déconnecter l'utilisateur
  signOut(): void {
    this.authService.signOut().then(() => {
      console.log('Déconnecté avec succès');
    }).catch(error => {
      console.error('Erreur de déconnexion', error);
    });
  }
}
