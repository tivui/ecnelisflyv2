import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MaptestComponent } from "./components/maptest/maptest.component";
import { Maptest2Component } from "./components/maptest2/maptest2.component";

const routes: Routes = [
  { path: 'leaflet', component: MaptestComponent },
  { path: 'ol', component: Maptest2Component }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapRoutingModule { }
