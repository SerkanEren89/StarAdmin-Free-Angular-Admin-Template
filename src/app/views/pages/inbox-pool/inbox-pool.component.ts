import {ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
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
import {HotelFilterModel} from '../../../core/hotel/_models/hotel-filter.model';
import {HotelService} from '../../../core/hotel/_services/hotel.service';
import {HotelInfoModel} from '../../../core/hotel/_models/hotel-info.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-inbox-pool',
  templateUrl: './inbox-pool.component.html',
  styleUrls: ['../../../app.component.scss', './inbox-pool.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InboxPoolComponent implements OnInit {
  @ViewChild('filterModal') public hotelFilterModal: TemplateRef<any>;
  commentList$: Observable<CommentModel[]>;
  commentList: CommentModel[];
  categoryList$: Observable<CategoryModel[]>;
  categoryList: CategoryModel[];
  selectedItem: CommentModel;
  categorization: CategorizationModel = new CategorizationModel();
  categorySentimentList: CategorySentimentModel[] = [];
  commentCategorySentiment$: Observable<CategorySentimentModel[]>;
  commentCategorySentiment: CategorySentimentModel[];
  hotels: HotelInfoModel[] = [];
  filterHotel: HotelFilterModel = new HotelFilterModel();
  selectedHotel: HotelInfoModel;
  sentimentTypes: string[] = ['Action', 'positive', 'negative', 'neutral'];
  selectedIndex = 0;
  pageSize = 10;
  page = 1;
  totalElements;
  totalHotels;

  constructor(private commentService: CommentService,
              private categoryService: CategoryService,
              private hotelService: HotelService,
              private modalService: NgbModal,
              private commentCategoryService: CommentCategoryService,
              private toastr: ToastrService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.commentList$ = this.commentService.getCommentsForPool(this.page - 1, this.pageSize);
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
    this.commentList$ = this.commentService.getCommentsForPool(page - 1, this.pageSize,
      this.selectedHotel != null ? this.selectedHotel.id : null);
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
    this.categorySentimentList = [];
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
    this.categorization.hotelId =  this.selectedHotel.id;
    this.commentCategoryService.saveCategorization(this.categorization)
      .subscribe((categorizationModel: CategorizationModel) => {
        this.categorization.comment.categorized = true;
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

  translate(selectedItem: CommentModel) {
    this.commentService.getTranslatedComment(selectedItem.id)
      .subscribe((translatedComment: CommentModel) => {
        this.selectedItem = translatedComment;
      });
  }

  filterHotels(page?: number) {
    this.page = page ? page : 1;
    const columnName = 'name';
    const direction = 'ASC';
    this.hotelService.getHotelsByFilter(this.page - 1, this.pageSize,
      columnName, direction, this.filterHotel)
      .subscribe((hotels: HotelInfoModel[]) => {
        this.hotels = hotels['content'];
        this.totalHotels = hotels['totalElements'];
        this.cdr.detectChanges();
      });
  }

  openFilterModal() {
    this.modalService.open(this.hotelFilterModal, {size: 'xl'});
  }

  selectHotel(hotel: HotelInfoModel) {
    this.selectedHotel = hotel;
  }

  filterComments() {
    this.commentList$ = this.commentService.getCommentsForPool(this.page - 1, this.pageSize,
      this.selectedHotel != null ? this.selectedHotel.id : null);
    this.processComments();
    this.modalService.dismissAll();
  }

  clearFilter() {
    this.selectedHotel = null;
    this.page = 1;
    this.commentList$ = this.commentService.getCommentsForPool(this.page - 1, this.pageSize, null);
    this.processComments();
  }
}

