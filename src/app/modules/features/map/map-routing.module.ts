import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MaptestComponent } from "./components/maptest/maptest.component";

const routes: Routes = [
  { path: '', component: MaptestComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapRoutingModule { }
