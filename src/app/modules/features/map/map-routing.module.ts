import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MaptestComponent } from "./components/maptest/maptest.component";
import { Maptest2Component } from "./components/maptest2/maptest2.component";
import { MaptestlazyloadingComponent } from './components/maptestlazyloading/maptestlazyloading.component';

const routes: Routes = [
  { path: 'leaflet', component: MaptestComponent },
  { path: 'ol', component: Maptest2Component },
  { path: 'leaflet/lazy-loading', component: MaptestlazyloadingComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapRoutingModule { }
