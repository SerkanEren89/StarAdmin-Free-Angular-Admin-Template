import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {PieChartComponent} from './pie-chart/pie-chart.component';
import {LineChartComponent} from './line-chart/line-chart.component';
import {ChartsModule} from 'ng2-charts';
import {FlagIconComponent} from './general/flag-icon/flag-icon.component';
import {BarChartComponent} from './bar-chart/bar-chart.component';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule
  ],
  declarations: [
    PieChartComponent,
    LineChartComponent,
    BarChartComponent,
    FlagIconComponent
  ],
  exports: [
    PieChartComponent,
    LineChartComponent,
    BarChartComponent,
    FlagIconComponent
  ],
  providers: []
})
export class CoreModule {

}
