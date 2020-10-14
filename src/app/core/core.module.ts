import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {PieChartComponent} from './pie-chart/pie-chart.component';
import {LineChartComponent} from './line-chart/line-chart.component';
import {ChartsModule} from 'ng2-charts';
import {FlagIconComponent} from './general/flag-icon/flag-icon.component';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule
  ],
  declarations: [
    PieChartComponent,
    LineChartComponent,
    FlagIconComponent
  ],
  exports: [
    PieChartComponent,
    LineChartComponent,
    FlagIconComponent
  ],
  providers: []
})
export class CoreModule {

}
