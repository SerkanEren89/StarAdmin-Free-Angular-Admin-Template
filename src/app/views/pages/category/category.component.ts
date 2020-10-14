import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommentCategoryService} from '../../../core/category/_services/comment-category.service';
import {Observable} from 'rxjs';
import {CommentModel} from '../../../core/inbox/_models/comment.model';
import {CommentCategoryModel} from '../../../core/category/_models/comment-category.model';
import {CommentService} from '../../../core/inbox/_services/comment.service';
import {ToastrService} from 'ngx-toastr';
import {CategoryGroupModel} from '../../../core/category/_models/category-group.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['../../../app.component.scss', './category.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryComponent implements OnInit {
  commentCategoryList$: Observable<CommentCategoryModel[]>;
  commentCategoryList: CommentCategoryModel[] = [];
  categoryGroup$: Observable<CategoryGroupModel>;
  categoryGroup: CategoryGroupModel;
  commentList: CommentModel[] = [];
  selectedItem: CommentModel;
  type: string;
  selectedIndex = 0;
  totalElements = 0;
  pageSize = 10;
  page = 1;

  constructor(private route: ActivatedRoute,
              private cdr: ChangeDetectorRef,
              private commentCategoryService: CommentCategoryService,
              private commentService: CommentService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.type = this.route.snapshot.paramMap.get('type');
    this.categoryGroup$ = this.commentCategoryService.getCategorySentimentCountByCategoryName(this.type);
    this.categoryGroup$.subscribe((categoryGroup: CategoryGroupModel) => {
      this.categoryGroup = categoryGroup;
      this.cdr.detectChanges();
    });
    this.commentCategoryList$ = this.commentCategoryService.getCommentCategoriesByCategoryName(this.type, this.page - 1, this.pageSize);
    this.processComments();
  }

  loadComments(page: number) {
    this.page = page;
    this.commentCategoryList$ = this.commentCategoryService.getCommentCategoriesByCategoryName(this.type, this.page - 1, this.pageSize);
    this.processComments();
  }

  processComments() {
    this.commentCategoryList$.subscribe((commentCategoryList: CommentCategoryModel[]) => {
      this.commentCategoryList = commentCategoryList['content'];
      this.commentCategoryList.forEach(commentCategory => this.commentList.push(commentCategory.comment));
      this.commentList.forEach(commnet => commnet.ratingOverFive = commnet.rating / 2);
      this.selectedItem = this.commentList[0];
      this.totalElements = commentCategoryList['totalElements'];
      this.cdr.detectChanges();
    });
  }

  markAsStarred(selectedItem: CommentModel) {
    selectedItem.starred = !selectedItem.starred;
    this.commentService.updateComment(selectedItem.id, selectedItem)
      .subscribe((commentModel: CommentModel) => {
        if (commentModel.starred) {}
        this.toastr.success('Review marked as important');
      });
  }

  translate(selectedItem: CommentModel) {
    this.commentService.getTranslatedComment(selectedItem.id)
      .subscribe((translatedComment: CommentModel) => {
        this.selectedItem = translatedComment;
      });
  }

  selectItem(comment: CommentModel, index: number) {
    this.selectedItem = comment;
    this.selectedIndex = index;
  }
}
