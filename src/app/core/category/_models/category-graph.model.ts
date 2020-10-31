import {BarChartItemModel} from './bar-chart-item.model';
import {CategoryPeriodModel} from './category-period.model';

export class CategoryGraphModel {
  labels: string[];
  item: BarChartItemModel[];
  bestCategory: CategoryPeriodModel;
  worstCategory: CategoryPeriodModel;
  bestPeriod: CategoryPeriodModel;
  worstPeriod: CategoryPeriodModel;
  increase: number;
  decrease: number;
}
