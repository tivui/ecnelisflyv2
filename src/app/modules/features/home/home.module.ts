import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { StorageService } from '../../core/services/storage.service';
import { SharedModule } from '../../shared/shared.module';
import { NgxAudioPlayerModule } from '@le2xx/ngx-audio-player';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    NgxAudioPlayerModule
  ],
  providers: [StorageService]
})
export class HomeModule { }
