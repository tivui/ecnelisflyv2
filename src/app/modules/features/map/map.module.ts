import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaptestComponent } from './components/maptest/maptest.component';
import { MapRoutingModule } from './map-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Maptest2Component } from './components/maptest2/maptest2.component';

@NgModule({
  declarations: [
    MaptestComponent,
    Maptest2Component
  ],
  imports: [
    MapRoutingModule,
    SharedModule,
    CommonModule,
    LeafletModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MapModule { }
