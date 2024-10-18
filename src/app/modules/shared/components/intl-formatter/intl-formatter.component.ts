import { Component } from '@angular/core';
import { TranslationService } from '../../../core/services/translation.service';

@Component({
  selector: 'app-intl-formatter',
  templateUrl: './intl-formatter.component.html',
  styleUrl: './intl-formatter.component.scss'
})
export class IntlFormatterComponent {
  date = new Date(); // Date actuelle
  amount = 100;
  formattedDate!: string;
  formattedCurrency!: string;
  currentLang: string = 'fr-FR'; // Langue par défaut

  constructor(private translationService: TranslationService) {
    this.formatDate(this.date);
    this.formatCurrency(this.amount);
  }

  formatDate(date: Date) {
    this.formattedDate = new Intl.DateTimeFormat(this.currentLang, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  }

  formatCurrency(amount: number) {
    this.formattedCurrency = new Intl.NumberFormat(this.currentLang, {
      style: 'currency',
      currency: this.currentLang === 'fr-FR' ? 'EUR' : 'USD'
    }).format(amount);
  }

  switchLanguage() {
    this.currentLang = this.currentLang === 'fr-FR' ? 'en-US' : 'fr-FR'; // Alterner entre français et anglais
    this.formatDate(this.date);
    this.formatCurrency(this.amount);
  }

  translate(key: string, lang: string): string {
    return this.translationService.translate(key, lang); // Utiliser le service pour traduire
  }
}

