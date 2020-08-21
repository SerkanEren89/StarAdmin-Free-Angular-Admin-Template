import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {Observable} from "rxjs";
import {CommentModel} from "../../core/inbox/_models/comment.model";
import {CommentService} from "../../core/inbox/_services/comment.service";
import {ChartDataSets} from "chart.js";
import {Label} from "ng2-charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../app.component.scss','./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  commentList$: Observable<CommentModel[]>;
  commentList: CommentModel[];
  lineChartData: ChartDataSets[] = [
    { data: [72, 75, 77, 77, 80, 84], label: 'Booking' },
    { data: [72, 74, 78, 79, 79, 79], label: 'TripAdvisor' },
    { data: [70, 73, 75, 79, 80, 83], label: 'Hotels.com' },
    { data: [72, 72, 72, 72, 73, 73], label: 'Google' },
    { data: [74, 74, 75, 75, 75, 76], label: 'Tatil Sepeti' },
  ];
  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  public pieChartLabels: Label[] = ['Booking', 'TripAdvisor', 'Hotels.com', 'Google', 'Tatil sepeti'];
  public pieChartData: number[] = [300, 500, 100, 200, 300];


  constructor(private commentService: CommentService,
              private cdr: ChangeDetectorRef,) {
  }

  ngOnInit() {
    this.commentList$ = this.commentService.getCommentList();
    this.commentList$.subscribe((commentList: CommentModel[]) => {
      this.commentList = commentList;
      this.cdr.detectChanges();
    });
  }

}
