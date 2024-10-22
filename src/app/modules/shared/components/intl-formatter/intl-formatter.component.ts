import { Component } from '@angular/core';
import { TranslationService } from '../../../core/services/translation.service';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '@supabase/supabase-js';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-intl-formatter',
  templateUrl: './intl-formatter.component.html',
  styleUrls: ['./intl-formatter.component.scss']
})
export class IntlFormatterComponent {
  date = new Date(); // Current date
  amount = 100;
  formattedDate!: string;
  formattedCurrency!: string;
  currentLang: string = 'fr-FR'; // Default language
  username$: Observable<User | null>;

  constructor(private translationService: TranslationService, private authService: AuthService) {
    this.formatDate(this.date);
    this.formatCurrency(this.amount);
    this.username$ = this.authService.getCurrentUser();
    console.log("this.username$", this.username$)
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
    this.currentLang = this.currentLang === 'fr-FR' ? 'en-US' : 'fr-FR'; // Toggle between French and English
    this.translationService.switchLanguage(this.currentLang === 'fr-FR' ? 'fr' : 'en');
    this.formatDate(this.date);
    this.formatCurrency(this.amount);
  }

  translate(key: string): string {
    return this.translationService.translateKey(key); // Use the service for translation
  }
}
