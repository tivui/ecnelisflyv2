import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaptestComponent } from './components/maptest/maptest.component';
import { MapRoutingModule } from './map-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  declarations: [
    MaptestComponent
  ],
  imports: [
    MapRoutingModule,
    SharedModule,
    CommonModule,
    LeafletModule
  ]
})
export class MapModule { }
