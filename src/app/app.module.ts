import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './modules/core/core.module';
import { AppComponent } from './modules/core/components/app/app.component';
import { AppRoutingModule } from './modules/core/components/app/app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
