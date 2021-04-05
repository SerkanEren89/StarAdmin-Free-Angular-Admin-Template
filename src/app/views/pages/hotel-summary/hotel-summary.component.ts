import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommentCountRatingModel} from '../../../core/dashboard/_models/comment-count-rating.model';
import {DashboardService} from '../../../core/dashboard/_service/dashboard.service';
import {CommentModel} from '../../../core/inbox/_models/comment.model';
import {CommentService} from '../../../core/inbox/_services/comment.service';
import {WidgetModel} from '../../../core/inbox/_models/widget.model';

@Component({
  selector: 'app-hotel-summary',
  templateUrl: './hotel-summary.component.html',
  styleUrls: ['../../../app.component.scss',
    './hotel-summary.component.scss', '../../theme/navbar/navbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HotelSummaryComponent implements OnInit {
  commentCountRatings: CommentCountRatingModel[];
  commentList: CommentModel[] = [];
  pageSize = 10;
  page = 1;
  totalElements = 0;
  array = [];
  throttle = 300;
  scrollUpDistance = 2;
  direction = '';
  id: string;
  name: string;

  constructor(private route: ActivatedRoute,
              private dashboardService: DashboardService,
              private commentService: CommentService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    const name = this.route.snapshot.paramMap.get('name');
    this.name = name.split('-').join(' ');
    this.commentService.getWidgetData(Number(this.id))
      .subscribe((widgetData: WidgetModel) => {
        this.commentCountRatings = widgetData.commentCountRatingItemList;
        this.commentList = widgetData.lastComments;
        this.cdr.detectChanges();
      });
  }

  onScrollDown() {
    this.page++;
    console.log(this.page);
    this.commentService.getCommentsForPublic(Number(this.id), this.page - 1)
      .subscribe((commentList: CommentModel[]) => {
        commentList.forEach(commnet => commnet.ratingOverFive = commnet.rating / 2);
        this.commentList.push(...commentList);
        this.totalElements = commentList['totalElements'];
        this.cdr.detectChanges();
      });
  }
}
