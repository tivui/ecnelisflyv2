import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MaptestComponent } from "./components/maptest/maptest.component";
import { Maptest2Component } from "./components/maptest2/maptest2.component";
import { MaptestlazyloadingComponent } from './components/maptestlazyloading/maptestlazyloading.component';
import { MaptestvectorgridComponent } from "./components/maptestvectorgrid/maptestvectorgrid.component";
import { LegendtestComponent } from "./components/legendtest/legendtest.component";

const routes: Routes = [
  { path: 'leaflet', component: MaptestComponent },
  { path: 'ol', component: Maptest2Component },
  { path: 'leaflet/lazy-loading', component: MaptestlazyloadingComponent },
  { path: 'leaflet/vector-grid', component: MaptestvectorgridComponent },
  { path: 'leaflet/legend-test', component: LegendtestComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapRoutingModule { }
