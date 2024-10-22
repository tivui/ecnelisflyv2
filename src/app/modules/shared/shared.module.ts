import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NgxCountriesDropdownModule } from 'ngx-countries-dropdown';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { LayoutModule } from '@angular/cdk/layout';
import { IntlFormatterComponent } from './components/intl-formatter/intl-formatter.component';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    IntlFormatterComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    NgxCountriesDropdownModule,
    MatSelectModule,
    MatGridListModule,
    MatSliderModule,
    MatCardModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatListModule,
    LayoutModule,
    TranslateModule
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    NgxCountriesDropdownModule,
    MatSelectModule,
    MatGridListModule,
    MatSliderModule,
    MatCardModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatListModule,
    IntlFormatterComponent,
    LayoutModule,
    TranslateModule
  ]
})
export class SharedModule { }
