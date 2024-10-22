import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('fr'); // Set default language
    this.translate.use('fr'); // Set initial language
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
  }

  translateKey(key: string, params?: Object) {
    return this.translate.instant(key, params); // Synchronous translation
  }
}
