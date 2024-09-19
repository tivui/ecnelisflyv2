import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service'; // Chemin vers ton AuthService

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = !!authService.currentUser; // Vérifie si l'utilisateur est authentifié

  if (!isAuthenticated) {
    router.navigate(['/auth/login']); // Redirige vers la page de connexion si non authentifié
  }

  return isAuthenticated;
};
