import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {DashboardComponent} from "./dashboard.component";
import {CoreModule} from "../../core/core.module";
import {CommonModule} from "@angular/common";
import {DashboardDetailComponent} from "./detail/dashboard-detail.component";

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: ':source',
        component: DashboardDetailComponent
      }
    ]),
  ],
  providers: [],
  declarations: [
    DashboardComponent,
    DashboardDetailComponent
  ]
})
export class DashboardModule {

}
