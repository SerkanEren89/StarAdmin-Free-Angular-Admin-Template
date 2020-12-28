import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent {
  @Input() barChartData: ChartDataSets[] = [];
  @Input() barChartLabels: Label[] = [];
  @Input() height: number;
  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

}
