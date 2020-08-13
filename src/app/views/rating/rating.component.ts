import {Component, ViewEncapsulation} from "@angular/core";
import {ChartDataSets} from "chart.js";
import {Label} from "ng2-charts";

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['../../app.component.scss', './rating.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RatingComponent {

  lineChartDataBooking: ChartDataSets[] = [
    { data: [72, 75, 77, 77, 80, 84], label: 'Booking' },
  ];
  lineChartLabelsBooking: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  lineChartDataTripAdvisor: ChartDataSets[] = [
    { data: [72, 74, 74, 76, 84, 86], label: 'TripAdvisor' },
  ];
  lineChartLabelsTripAdvisor: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  lineChartDataHotelsCom: ChartDataSets[] = [
    { data: [72, 74, 76, 77, 77, 79], label: 'Hotels.com' },
  ];
  lineChartLabelsHotelsCom: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  lineChartDataOdamax: ChartDataSets[] = [
    { data: [72, 76, 77, 77, 80, 89], label: 'Odamax' },
  ];
  lineChartLabelsOdamax: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  lineChartDataOtelPuan: ChartDataSets[] = [
    { data: [72, 75, 77, 77, 80, 84], label: 'OtelPuan' },
  ];
  lineChartLabelsOtelPuan: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  lineChartDataTatilSepeti: ChartDataSets[] = [
    { data: [72, 75, 77, 77, 80, 84], label: 'Tatil Sepeti' },
  ];
  lineChartLabelsTatilSepeti: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

}
