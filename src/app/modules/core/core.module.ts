import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './components/app/app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '../shared/shared.module';
import { provideClientHydration, withI18nSupport } from '@angular/platform-browser';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule
  ],
  providers: [
    // { provide: LOCALE_ID, useValue: 'fr-FR' }  // Valeur par défaut
    provideClientHydration(withI18nSupport())
  ],
})
export class CoreModule { }
