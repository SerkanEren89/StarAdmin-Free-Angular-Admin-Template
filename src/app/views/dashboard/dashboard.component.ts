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
    { data: [72, 75, 77, 77, 80, 84], label: 'Hotel Performance' },
  ];
  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

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
