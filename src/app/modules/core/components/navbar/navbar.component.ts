import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],  // Assurez-vous que c'est 'styleUrls' au lieu de 'styleUrl'
})
export class NavbarComponent implements OnInit, OnDestroy {
  public isLoggedIn: boolean = false;  // Variable locale pour suivre l'état de connexion
  private userSubscription: Subscription | undefined;

  // Themes
  public isDarkMode: boolean = false;

  constructor(private authService: AuthService, private themeService: ThemeService) { }

  ngOnInit() {
    // Récupérer la préférence de thème sauvegardée au démarrage
    this.isDarkMode = this.themeService.getIsDarkMode();

    // S'abonner aux changements d'état de l'utilisateur
    this.userSubscription = this.authService.getCurrentUser().subscribe(user => {
      this.isLoggedIn = !!user;  // Met à jour isLoggedIn en fonction de la présence d'un utilisateur
      console.log('User state in Navbar:', user);
      console.log("this.isLoggedIn", this.isLoggedIn)
    });

    // Charger le thème initial à partir du localStorage
    this.themeService.loadTheme();
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

  // Méthode déclenchée lors du changement du switch
  toggleTheme(event: any): void {
    this.isDarkMode = event.checked;
    this.themeService.toggleTheme(this.isDarkMode);
  }

}
