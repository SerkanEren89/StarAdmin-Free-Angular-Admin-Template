import {Component, Input} from '@angular/core';
import {ChartDataSets} from 'chart.js';
import {Color, Label} from 'ng2-charts';

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
    maintainAspectRatio: false,
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
    },
    { // red
      backgroundColor: 'rgba(222,91,20,0.3)',
      borderColor: 'orange',
    },
    { // red
      backgroundColor: 'rgba(19,90,33,0.3)',
      borderColor: 'blue',
    },
    { // red
      backgroundColor: 'rgba(90,5,69,0.3)',
      borderColor: 'pink',
    },
    { // red
      backgroundColor: 'rgba(90,59,9,0.3)',
      borderColor: 'gray',
    }
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';
}
