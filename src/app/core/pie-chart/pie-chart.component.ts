import {Component, Input} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent {
  @Input() pieChartData: ChartDataSets[] = [];
  @Input() pieChartLabels: Label[] = [];
  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          return  ctx.chart.data.labels[ctx.dataIndex];
        },
      },
    }
  };

  public pieChartType: ChartType = 'doughnut';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['rgb(198, 231, 251)', 'rgba(77,83,96,0.2)', 'rgba(255,129,21,0.3)',
        'rgba(255,0,0,0.3)', 'rgba(150,255,51,0.3)', 'rgba(255,254,120,0.3)', 'rgba(130,31,255,0.3)'],
    },
  ];

}
