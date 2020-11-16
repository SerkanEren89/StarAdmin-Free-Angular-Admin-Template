import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {CategoryGroupModel} from '../../../../core/category/_models/category-group.model';
import {CommentCategoryService} from '../../../../core/category/_services/comment-category.service';
import {Router} from '@angular/router';
import {CommentCategoryModel} from '../../../../core/category/_models/comment-category.model';
import {CommentModel} from '../../../../core/inbox/_models/comment.model';
import {CommentService} from '../../../../core/inbox/_services/comment.service';
import {ToastrService} from 'ngx-toastr';
import {CategoryGraphModel} from '../../../../core/category/_models/category-graph.model';
import {ChartDataSets} from 'chart.js';
import {Label} from 'ng2-charts';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['../../../../app.component.scss', './category-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryListComponent implements OnInit {
  categoryGroupList$: Observable<CategoryGroupModel[]>;
  categoryGroupList: CategoryGroupModel[];
  categoryPeriodic$: Observable<CategoryGraphModel>;
  categoryPeriodic: CategoryGraphModel;
  selectedCategoryGroup: CategoryGroupModel;
  commentCategoryList$: Observable<CommentCategoryModel[]>;
  commentCategoryList: CommentCategoryModel[] = [];
  categoryGroup$: Observable<CategoryGroupModel>;
  categoryGroup: CategoryGroupModel;
  lineChartData: ChartDataSets[] = [];
  lineChartLabels: Label[] = [];
  commentList: CommentModel[] = [];
  selectedItem: CommentModel;
  type: string;
  selectedIndex = 0;
  totalElements = 0;
  pageSize = 10;
  page = 1;

  constructor(private commentCategoryService: CommentCategoryService,
              private commentService: CommentService,
              private toastr: ToastrService,
              private router: Router,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.categoryGroupList$ = this.commentCategoryService.getCategorySentimentCount();
    this.categoryGroupList$.subscribe((categoryGroupList: CategoryGroupModel[]) => {
      this.categoryGroupList = categoryGroupList;
      this.cdr.detectChanges();
    });
    /*
    this.categoryPeriodic$ = this.commentCategoryService.findCategoryPeriodically();
    this.categoryPeriodic$.subscribe((categoryPeriodic: CategoryGraphModel) => {
      this.categoryPeriodic = categoryPeriodic;
      this.lineChartLabels = this.categoryPeriodic.labels;
      this.lineChartData = this.categoryPeriodic.item;
      this.cdr.detectChanges();
    });
     */
  }

  goToCategoryDetail(categoryGroup: CategoryGroupModel) {
    this.page = 1;
    this.selectedCategoryGroup = categoryGroup;
    this.categoryGroupList.forEach(item => item.selected = false);
    categoryGroup.selected = true;
    this.categoryGroup$ = this.commentCategoryService.getCategorySentimentCountByCategoryName(categoryGroup.category.name);
    this.categoryGroup$.subscribe((item: CategoryGroupModel) => {
      this.categoryGroup = item;
      this.cdr.detectChanges();
    });
    this.commentCategoryList$ = this.commentCategoryService
      .getCommentCategoriesByCategoryName(categoryGroup.category.name, this.page - 1, this.pageSize);
    this.processComments();
  }

  loadComments(page: number) {
    this.page = page;
    this.commentCategoryList$ = this.commentCategoryService.getCommentCategoriesByCategoryName(this.type, this.page - 1, this.pageSize);
    this.processComments();
  }

  processComments() {
    this.commentList = [];
    this.commentCategoryList$.subscribe((commentCategoryList: CommentCategoryModel[]) => {
      this.commentCategoryList = commentCategoryList['content'];
      this.commentCategoryList.forEach(commentCategory => {
        commentCategory.comment.sentiment = commentCategory.generalSentiment;
        this.commentList.push(commentCategory.comment);
      });
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
        if (commentModel.starred) {
        }
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

  filterBySentiment(sentiment: string) {
    this.page = 1;
    this.commentCategoryList$ = this.commentCategoryService.getCommentCategoriesByCategoryNameAndSentiment(this.categoryGroup.category.name,
      sentiment, this.page - 1, this.pageSize);
    this.processComments();
  }
}
