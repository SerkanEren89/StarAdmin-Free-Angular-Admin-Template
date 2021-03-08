import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {DoughnutChartComponent} from './doughnut-chart/doughnut-chart.component';
import {LineChartComponent} from './line-chart/line-chart.component';
import {ChartsModule} from 'ng2-charts';
import {FlagIconComponent} from './general/flag-icon/flag-icon.component';
import {BarChartComponent} from './bar-chart/bar-chart.component';
import {ChannelIconComponent} from './channel-icon/channel-icon.component';
import {CategoryIconComponent} from './category-icon/category-icon.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule
  ],
  declarations: [
    DoughnutChartComponent,
    LineChartComponent,
    ChannelIconComponent,
    CategoryIconComponent,
    BarChartComponent,
    FlagIconComponent
  ],
  exports: [
    DoughnutChartComponent,
    LineChartComponent,
    ChannelIconComponent,
    CategoryIconComponent,
    BarChartComponent,
    FlagIconComponent,
    TranslateModule
  ],
  providers: []
})
export class CoreModule {

}
