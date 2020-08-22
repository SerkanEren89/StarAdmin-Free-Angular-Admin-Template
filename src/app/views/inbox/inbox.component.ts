import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from "@angular/core";
import {CommentService} from "../../core/inbox/_services/comment.service";
import {Observable} from "rxjs";
import {CommentModel} from "../../core/inbox/_models/comment.model";

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['../../app.component.scss', './inbox.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InboxComponent implements OnInit {
  commentList$: Observable<CommentModel[]>;
  commentList: CommentModel[];
  selectedItem: CommentModel;
  selectedIndex: number = 0;

  constructor(private commentService: CommentService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.commentList$ = this.commentService.getCommentList();
    this.commentList$.subscribe((commentList: CommentModel[]) => {
      commentList.forEach(comment => comment.starRating = comment.rating / 2);
      this.commentList = commentList;
      this.selectedItem = this.commentList[0];
      this.cdr.detectChanges();
    });
  }

  selectItem(comment: CommentModel, index: number) {
    this.selectedItem = comment;
    this.selectedIndex = index;
  }
}
