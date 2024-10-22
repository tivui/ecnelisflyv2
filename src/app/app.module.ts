import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './modules/core/core.module';
import { AppComponent } from './modules/core/components/app/app.component';
import { AppRoutingModule } from './modules/core/components/app/app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
