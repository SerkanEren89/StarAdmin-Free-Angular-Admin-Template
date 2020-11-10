import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Label} from 'ng2-charts';
import {ChartDataSets} from 'chart.js';
import {PopularityService} from '../../../core/popularity/_services/popularity.service';
import {MonthlyRatingsModel} from '../../../core/dashboard/_models/monthly-ratings.model';
import {Observable} from 'rxjs';
import {MonthlyCommentModel} from '../../../core/popularity/_models/monthly-comment.model';

@Component({
  selector: 'app-popularity',
  templateUrl: './popularity.component.html',
  styleUrls: ['../../../app.component.scss', './popularity.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PopularityComponent implements OnInit {
  monthlyComments$: Observable<MonthlyCommentModel>;
  monthlyComments: MonthlyCommentModel;
  barChartData: ChartDataSets[] = [];
  barChartLabels: Label[] = [];

  constructor(private popularityService: PopularityService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.monthlyComments$ = this.popularityService.getCommentCountMonthly();
    this.monthlyComments$.subscribe((monthlyComments: MonthlyCommentModel) => {
      this.monthlyComments = monthlyComments;
      this.barChartLabels = this.monthlyComments.months;
      this.barChartData = this.monthlyComments.item;
      this.cdr.detectChanges();
    });
  }

}
