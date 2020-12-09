import {ChangeDetectorRef, Component, HostListener, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Label} from 'ng2-charts';
import {ChartDataSets} from 'chart.js';
import {PopularityService} from '../../../core/popularity/_services/popularity.service';
import {Observable} from 'rxjs';
import {MonthlyCommentModel} from '../../../core/popularity/_models/monthly-comment.model';
import {CommentCountLanguageModel} from '../../../core/inbox/_models/comment-count-language.model';
import {CommentService} from '../../../core/inbox/_services/comment.service';
import {CommentCountTraveledWithModel} from '../../../core/inbox/_models/comment-count-traveled-with.model';
import {TableService} from '../../../core/general/_services/table.service';

@Component({
  selector: 'app-popularity',
  templateUrl: './popularity.component.html',
  styleUrls: ['../../../app.component.scss', './popularity.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PopularityComponent implements OnInit {
  @ViewChild('languageTable') elRefLanguage;
  @ViewChild('travelTypeTable') elRefTravelType;
  monthlyComments$: Observable<MonthlyCommentModel>;
  monthlyComments: MonthlyCommentModel;
  commentsByLanguage$: Observable<CommentCountLanguageModel[]>;
  commentsByLanguage: CommentCountLanguageModel[] = [];
  commentsByTraveledWith$: Observable<CommentCountTraveledWithModel[]>;
  commentsByTraveledWith: CommentCountTraveledWithModel[] = [];
  barChartData: ChartDataSets[] = [];
  barChartLabels: Label[] = [];
  interval = 0;
  height: number;
  screenWidth: number;

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
    this.monthlyComments$ = this.popularityService.getCommentCountMonthly(this.interval);
    this.monthlyComments$.subscribe((monthlyComments: MonthlyCommentModel) => {
      this.monthlyComments = monthlyComments;
      this.barChartLabels = this.monthlyComments.months;
      this.barChartData = this.monthlyComments.item;
      this.cdr.detectChanges();
    });
    this.commentsByLanguage$ = this.commentService.getCommentsByCountByLanguage();
    this.commentsByLanguage$.subscribe((commentCountLanguageModels: CommentCountLanguageModel[]) => {
      this.commentsByLanguage = commentCountLanguageModels;
      this.cdr.detectChanges();
      this.tableService.addLabelTag(this.elRefLanguage);
    });
    this.commentsByTraveledWith$ = this.commentService.getCommentsByCountByTraveledWith();
    this.commentsByTraveledWith$.subscribe((assessmentByTravelType: CommentCountTraveledWithModel[]) => {
      this.commentsByTraveledWith = assessmentByTravelType;
      this.cdr.detectChanges();
      this.tableService.addLabelTag(this.elRefTravelType);
    });
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.screenWidth = window.innerWidth;
    console.log(this.screenWidth);
    if (this.screenWidth < 800) {
      this.height = 350;
    } else  {
      this.height = 300;
    }
  }
}
