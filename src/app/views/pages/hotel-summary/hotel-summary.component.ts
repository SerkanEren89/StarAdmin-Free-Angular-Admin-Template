import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommentCountRatingModel} from '../../../core/dashboard/_models/comment-count-rating.model';
import {DashboardService} from '../../../core/dashboard/_service/dashboard.service';
import {CommentModel} from '../../../core/inbox/_models/comment.model';
import {CommentService} from '../../../core/inbox/_services/comment.service';

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
    this.name = this.route.snapshot.paramMap.get('name');
    this.dashboardService.getCommentCountAndRatingsForHotelId(Number(this.id))
      .subscribe((commentCountRatings: CommentCountRatingModel[]) => {
        this.commentCountRatings = commentCountRatings;
        this.cdr.detectChanges();
      });

    this.commentService.getCommentsForHotelId(Number(this.id), this.page - 1, this.pageSize)
      .subscribe((commentList: CommentModel[]) => {
        this.commentList = commentList['content'];
        this.commentList.forEach(commnet => commnet.ratingOverFive = commnet.rating / 2);
        this.totalElements = commentList['totalElements'];
        this.cdr.detectChanges();
      });
  }

  onScrollDown() {
    console.log('scrolled down!!');
    this.page++;
    console.log(this.page);
    this.commentService.getCommentsForHotelId(Number(this.id), this.page - 1, this.pageSize)
      .subscribe((commentList: CommentModel[]) => {
        const comments = commentList['content'];
        comments.forEach(commnet => commnet.ratingOverFive = commnet.rating / 2);
        this.commentList.push(...comments);
        this.totalElements = commentList['totalElements'];
        this.cdr.detectChanges();
      });
  }

  onScrollUp() {
    console.log('scrolled up!!');
  }
}
