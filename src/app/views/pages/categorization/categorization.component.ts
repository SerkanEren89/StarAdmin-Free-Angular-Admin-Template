import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CommentService} from '../../../core/inbox/_services/comment.service';
import {Observable} from 'rxjs';
import {CommentModel} from '../../../core/inbox/_models/comment.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';
import {CategoryService} from '../../../core/category/_services/category.service';
import {CategoryModel} from '../../../core/category/_models/category.model';
import {CommentCategoryService} from '../../../core/category/_services/comment-category.service';
import {CategorizationModel} from '../../../core/category/_models/categorization.model';
import {CategorySentimentModel} from '../../../core/category/_models/category-sentiment.model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-categorization',
  templateUrl: './categorization.component.html',
  styleUrls: ['../../../app.component.scss', './categorization.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategorizationComponent implements OnInit {
  commentList$: Observable<CommentModel[]>;
  commentList: CommentModel[];
  categoryList$: Observable<CategoryModel[]>;
  categoryList: CategoryModel[];
  selectedItem: CommentModel;
  categorization: CategorizationModel = new CategorizationModel();
  categorySentiment: CategorySentimentModel = new CategorySentimentModel();
  categorySentimentList: CategorySentimentModel[] = [];
  commentCategorySentiment$: Observable<CategorySentimentModel[]>;
  commentCategorySentiment: CategorySentimentModel[];
  sentimentTypes: string[] = ['positive', 'negative', 'neutral'];
  selectedIndex = 0;
  pageSize = 10;
  page = 1;
  totalElements;

  constructor(private commentService: CommentService,
              private categoryService: CategoryService,
              private commentCategoryService: CommentCategoryService,
              private toastr: ToastrService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.commentList$ = this.commentService.getComments(this.page - 1, this.pageSize);
    this.processComments();
    this.categoryList$ = this.categoryService.getCategories();
    this.categoryList$.subscribe((categoryList: CategoryModel[]) => {
      this.categoryList = categoryList;
      this.categoryList.forEach(category => category.sentiment = 'Action');
      this.cdr.detectChanges();
    });
  }

  loadComments(page: number) {
    this.page = page;
    this.commentList$ = this.commentService.getComments(page - 1, this.pageSize);
    this.processComments();
  }

  processComments() {
    this.commentList$.subscribe((commentList: CommentModel[]) => {
      this.commentList = commentList['content'];
      this.commentList.forEach(commnet => commnet.ratingOverFive = commnet.rating / 2);
      this.totalElements = commentList['totalElements'];
      this.selectedItem = this.commentList[0];
      this.getCategorizationForComment();
      this.cdr.detectChanges();
    });
  }

  selectItem(comment: CommentModel, index: number) {
    this.selectedItem = comment;
    this.selectedIndex = index;
    this.categoryList.forEach(category => category.sentiment = 'Action');
    this.getCategorizationForComment();
  }

  selectSentiment(category: CategoryModel, sentiment: string) {
    category.sentiment = sentiment;
  }

  saveCategorization() {
    this.categoryList.forEach(category => {
      if (category.sentiment !== 'Action') {
        const categorySentiment = new CategorySentimentModel();
        categorySentiment.category = category;
        categorySentiment.sentiment = category.sentiment;
        this.categorySentimentList.push(categorySentiment);
      }
    });
    this.categorization.comment = this.selectedItem;
    this.categorization.commentCategoryList = this.categorySentimentList;
    this.commentCategoryService.saveCategorization(this.categorization)
      .subscribe((categorizationModel: CategorizationModel) => {
        this.toastr.success('Categorization saved with success!');
      });
  }

  getCategorizationForComment() {
    this.commentCategorySentiment$ = this.commentCategoryService.getCategories(this.selectedItem.id);
    this.commentCategorySentiment$.subscribe((categorySentimentModels: CategorySentimentModel[]) => {
      this.commentCategorySentiment = categorySentimentModels;
      this.categoryList.forEach(category => category.sentiment = 'Action');
      for (const categorySentimentModel of categorySentimentModels) {
        for (const categoryModel of this.categoryList) {
          if (categorySentimentModel.category.name === categoryModel.name) {
            categoryModel.sentiment = categorySentimentModel.sentiment;
          }
        }
      }
      this.cdr.detectChanges();
    });
  }
}

