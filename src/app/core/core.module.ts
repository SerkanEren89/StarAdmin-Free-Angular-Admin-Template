import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {PieChartComponent} from "./pie-chart/pie-chart.component";
import {LineChartComponent} from "./line-chart/line-chart.component";
import {ChartsModule} from "ng2-charts";

@NgModule({
  imports: [
    CommonModule,
    ChartsModule
  ],
  declarations: [
    PieChartComponent,
    LineChartComponent
  ],
  exports: [
    PieChartComponent,
    LineChartComponent
  ],
  providers: []
})
export class CoreModule {

}
