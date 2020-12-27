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
  };

  lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(144,176,227,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
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

  ngOnInit(): void {
    if (this.lineChartOptions != null) {
      this.lineChartOptionsData = this.lineChartOptions;
    } else {
      this.lineChartOptionsData = {
        responsive: true,
        maintainAspectRatio: false,
      };
    }
  }
}
