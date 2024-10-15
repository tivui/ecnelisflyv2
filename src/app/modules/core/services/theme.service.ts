import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private isDarkMode: boolean = false;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  // Méthode pour basculer entre light et dark theme
  toggleTheme(isDarkMode: boolean): void {
    this.isDarkMode = isDarkMode;
    const theme = this.isDarkMode ? 'dark' : 'light';
    this.applyTheme(theme);
  }

  // Méthode pour appliquer le thème en fonction de la sélection
  applyTheme(theme: string): void {
    if (theme === 'dark') {
      this.renderer.addClass(document.body, 'dark-theme');
      localStorage.setItem('theme', 'dark'); // Sauvegarder la préférence dans localStorage
    } else {
      this.renderer.removeClass(document.body, 'dark-theme');
      localStorage.setItem('theme', 'light'); // Sauvegarder la préférence dans localStorage
    }
  }

  // Récupérer la préférence de thème de localStorage au démarrage de l'application
  loadTheme(): void {
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.isDarkMode = savedTheme === 'dark';
    this.applyTheme(savedTheme);
  }

  // Obtenir l'état actuel du mode sombre (utile pour initialiser le toggle dans les composants)
  getIsDarkMode(): boolean {
    return this.isDarkMode;
  }
}
