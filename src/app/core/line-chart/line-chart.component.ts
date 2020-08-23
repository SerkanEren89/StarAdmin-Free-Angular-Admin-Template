import {Component, Input} from "@angular/core";
import {ChartDataSets} from "chart.js";
import {Color, Label} from "ng2-charts";

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})

export class LineChartComponent {
  @Input() lineChartData: ChartDataSets[] = [];
  @Input() lineChartLabels: Label[] = [];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgb(198, 231, 251)',
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
    },
    { // red
      backgroundColor: 'rgba(150,255,51,0.3)',
      borderColor: 'green',
    },
    { // red
      backgroundColor: 'rgba(255,254,120,0.3)',
      borderColor: 'yellow',
    }
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';
}
