import {ChangeDetectorRef, Component, HostListener, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Label} from 'ng2-charts';
import {ChartDataSets} from 'chart.js';
import {PopularityService} from '../../../core/popularity/_services/popularity.service';
import {MonthlyCommentModel} from '../../../core/popularity/_models/monthly-comment.model';
import {CommentCountLanguageModel} from '../../../core/inbox/_models/comment-count-language.model';
import {CommentService} from '../../../core/inbox/_services/comment.service';
import {CommentCountTraveledWithModel} from '../../../core/inbox/_models/comment-count-traveled-with.model';
import {TableService} from '../../../core/general/_services/table.service';
import {MonthlyRatingsModel} from '../../../core/dashboard/_models/monthly-ratings.model';

@Component({
  selector: 'app-popularity',
  templateUrl: './popularity.component.html',
  styleUrls: ['../../../app.component.scss', './popularity.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PopularityComponent implements OnInit {
  @ViewChild('languageTable') elRefLanguage;
  @ViewChild('travelTypeTable') elRefTravelType;
  monthlyComments: MonthlyCommentModel;
  commentsByLanguage: CommentCountLanguageModel[] = [];
  commentsByTraveledWith: CommentCountTraveledWithModel[] = [];
  lineChartData: ChartDataSets[] = [];
  lineChartLabels: Label[] = [];
  barChartData: ChartDataSets[] = [];
  barChartLabels: Label[] = [];
  barChartDataCommentCount: ChartDataSets[] = [];
  pieChartLabelsTravelerType: Label[] = [];
  pieChartDataTravelerType: number[] = [];
  pieChartLabelsLanguage: Label[] = [];
  pieChartDataLanguage: number[] = [];
  interval = 0;
  height: number;
  screenWidth: number;
  overallPerformance: number;
  lineChartOptionsData = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            steps: 1,
            stepValue: 1,
            max: 10,
            min: 5
          }
        }
      ]
    }
  };

  constructor(private popularityService: PopularityService,
              private commentService: CommentService,
              private tableService: TableService,
              private cdr: ChangeDetectorRef) {
    this.getScreenSize();
  }

  ngOnInit(): void {
    this.processPopularity();
  }

  changeInterval(number: number) {
    this.interval += number;
    this.processPopularity();
  }

  processPopularity() {
    this.popularityService.getCommentCountMonthly(this.interval)
      .subscribe((monthlyComments: MonthlyCommentModel) => {
        this.monthlyComments = monthlyComments;
        this.barChartLabels = this.monthlyComments.months;
        this.barChartData = this.monthlyComments.item;
        this.cdr.detectChanges();
      });
    this.commentService.getCommentsByCountByLanguage()
      .subscribe((commentCountLanguageModels: CommentCountLanguageModel[]) => {
        this.commentsByLanguage = commentCountLanguageModels;
        for (const commentCountLanguageModel of commentCountLanguageModels) {
          if (commentCountLanguageModel.language != null) {
            this.pieChartLabelsLanguage.push(commentCountLanguageModel.language);
            this.pieChartDataLanguage.push(commentCountLanguageModel.commentCount);
          }
        }
        this.cdr.detectChanges();
        this.tableService.addLabelTag(this.elRefLanguage);
      });
    this.commentService.getCommentsByCountByTraveledWith()
      .subscribe((assessmentByTravelType: CommentCountTraveledWithModel[]) => {
        this.commentsByTraveledWith = assessmentByTravelType;
        for (const commentCountTravelerType of assessmentByTravelType) {
          if (commentCountTravelerType.traveledWith != null) {
            this.pieChartLabelsTravelerType.push(commentCountTravelerType.traveledWith);
            this.pieChartDataTravelerType.push(commentCountTravelerType.commentCount);
          }
        }
        this.cdr.detectChanges();
        this.tableService.addLabelTag(this.elRefTravelType);
      });
    this.popularityService.getAverageMonthlyRating()
      .subscribe((monthlyRating: MonthlyRatingsModel) => {
        this.lineChartLabels = monthlyRating.months;
        this.lineChartData = monthlyRating.item;

        this.cdr.detectChanges();
      });
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth < 800) {
      this.height = 350;
    } else {
      this.height = 300;
    }
  }
}
