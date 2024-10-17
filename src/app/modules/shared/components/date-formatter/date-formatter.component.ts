import { Component } from '@angular/core';
import { TranslationService } from '../../../core/services/translation.service';

@Component({
  selector: 'app-date-formatter',
  templateUrl: './date-formatter.component.html',
  styleUrl: './date-formatter.component.scss'
})
export class DateFormatterComponent {
  date = new Date(); // Date actuelle
  formattedDate!: string;
  currentLang: string = 'fr-FR'; // Langue par défaut

  constructor(private translationService: TranslationService) {
    this.formatDate(this.date); // Formater la date initiale
  }

  formatDate(date: Date) {
    this.formattedDate = new Intl.DateTimeFormat(this.currentLang, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date); // Utiliser Intl.DateTimeFormat pour formater la date
  }

  switchLanguage() {
    this.currentLang = this.currentLang === 'fr-FR' ? 'en-US' : 'fr-FR'; // Alterner entre français et anglais
    this.formatDate(this.date); // Mettre à jour le format de la date
  }

  translate(key: string, lang: string): string {
    return this.translationService.translate(key, lang); // Utiliser le service pour traduire
  }
}
