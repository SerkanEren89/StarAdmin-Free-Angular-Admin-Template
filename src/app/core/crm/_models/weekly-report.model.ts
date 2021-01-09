import {WeeklyReportItemModel} from './weekly-report-item.model';

export class WeeklyReportModel {
  hotelId: number;
  reportItemDtos: WeeklyReportItemModel[];
  reportType: string;
}
