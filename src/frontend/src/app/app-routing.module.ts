import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {PortaComponent} from "./porta/porta.component";

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'porta', component: PortaComponent}
  // { path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
