import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private translations: { [key: string]: { [lang: string]: string } } = {
    greeting: {
      'fr-FR': 'Bonjour',
      'en-US': 'Hello',
    },
    farewell: {
      'fr-FR': 'Au revoir',
      'en-US': 'Goodbye',
    },
  };

  translate(key: string, lang: string): string {
    return this.translations[key][lang] || key; // Retourner la traduction ou la clé si pas trouvée
  }
}
