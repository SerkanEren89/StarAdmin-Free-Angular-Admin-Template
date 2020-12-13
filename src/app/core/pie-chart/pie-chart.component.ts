import {Component, Input} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label, PluginServiceGlobalRegistrationAndOptions} from 'ng2-charts';

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
          return ctx.chart.data.labels[ctx.dataIndex];
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
  public doughnutChartPlugins: PluginServiceGlobalRegistrationAndOptions[] = [{
    beforeDraw(chart) {
      const ctx = chart.ctx;
      const txt = 'Center Text';
      const data = chart.data.datasets[0].data;
      let sum = 0;
      for (const datum of data) {
        sum = (<number>datum) + sum;
      }
      const innerRadius = 10;

      const sidePadding = 60;
      const sidePaddingCalculated = (sidePadding / 100) * (innerRadius * 2);

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
      const centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);

      const stringWidth = ctx.measureText(txt).width;
      const elementWidth = (innerRadius * 2) - sidePaddingCalculated;

      // Find out how much the font can grow in width.
      const widthRatio = elementWidth / stringWidth;
      const newFontSize = Math.floor(30 * widthRatio);
      const elementHeight = (innerRadius * 2);

      // Pick a new font size so it will not be larger than the height of label.
      const fontSizeToUse = 16;

      ctx.font = fontSizeToUse + 'px Poppins';
      ctx.fillStyle = '#308ee0';

      // Draw text in center
      ctx.fillText(sum + '\n reviews', centerX, centerY);
    }
  }];

}
