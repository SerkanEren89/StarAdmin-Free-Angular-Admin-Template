import {Component, Input, OnInit} from '@angular/core';
import {ChartDataSets} from 'chart.js';
import {Color, Label} from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})

export class LineChartComponent implements OnInit {
  @Input() lineChartData: ChartDataSets[] = [];
  @Input() lineChartLabels: Label[] = [];
  @Input() height: number;
  @Input() lineChartOptions: {};
  lineChartOptionsData: {} = {
    responsive: true,
    maintainAspectRatio: false,
    fill: false
  };

  lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'transparent',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // red
      backgroundColor: 'transparent',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'transparent',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'transparent',
      borderColor: 'green',
    },
    { // red
      backgroundColor: 'transparent',
      borderColor: 'yellow',
    },
    { // red
      backgroundColor: 'transparent',
      borderColor: 'orange',
    },
    { // red
      backgroundColor: 'transparent',
      borderColor: 'blue',
    },
    { // red
      backgroundColor: 'transparent',
      borderColor: 'pink',
    },
    { // red
      backgroundColor: 'transparent',
      borderColor: 'gray',
    }
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  ngOnInit(): void {
    if (this.lineChartOptions != null) {
      this.lineChartOptionsData = this.lineChartOptions;
    } else {
      this.lineChartOptionsData = {
        responsive: true,
        maintainAspectRatio: false
      };
    }
  }
}
