import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {merge, Observable, Subject} from 'rxjs';
import {CategoryGroupModel} from '../../../../core/category/_models/category-group.model';
import {CommentCategoryService} from '../../../../core/category/_services/comment-category.service';
import {Router} from '@angular/router';
import {CommentCategoryModel} from '../../../../core/category/_models/comment-category.model';
import {CommentModel} from '../../../../core/inbox/_models/comment.model';
import {CommentService} from '../../../../core/inbox/_services/comment.service';
import {ToastrService} from 'ngx-toastr';
import {TaskModel} from '../../../../core/task/_models/task.model';
import {EmployeeModel} from '../../../../core/employee/_models/employee.model';
import {EmployeeService} from '../../../../core/employee/_services/employee.service';
import {TaskService} from '../../../../core/task/_services/task.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['../../../../app.component.scss', './category-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryListComponent implements OnInit {
  focus$ = new Subject<string>();
  categoryGroupList: CategoryGroupModel[];
  selectedCategoryGroup: CategoryGroupModel;
  commentCategoryList$: Observable<CommentCategoryModel[]>;
  commentCategoryList: CommentCategoryModel[] = [];
  categoryGroup: CategoryGroupModel;
  commentList: CommentModel[] = [];
  selectedItem: CommentModel;
  employeeList: EmployeeModel[];
  public task: TaskModel = new TaskModel();
  type: string;
  selectedSentiment: string;
  selectedIndex = 0;
  totalElements = 0;
  pageSize = 10;
  page = 1;
  resultFormatter = (result: EmployeeModel) => result.firstName + ' ' + result.lastName;
  inputFormatter = (x: EmployeeModel) => x.firstName + ' ' + x.lastName;

  constructor(private commentCategoryService: CommentCategoryService,
              private commentService: CommentService,
              private employeeService: EmployeeService,
              private taskService: TaskService,
              private toastr: ToastrService,
              private modalService: NgbModal,
              private router: Router,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.commentCategoryService.getCategorySentimentCount()
      .subscribe((categoryGroupList: CategoryGroupModel[]) => {
        this.categoryGroupList = categoryGroupList;
        this.cdr.detectChanges();
      });
  }

  goToCategoryDetail(categoryGroup: CategoryGroupModel) {
    this.page = 1;
    this.selectedCategoryGroup = categoryGroup;
    this.selectedSentiment = null;
    this.categoryGroupList.forEach(item => item.selected = false);
    categoryGroup.selected = true;
    this.commentCategoryService.getCategorySentimentCountByCategoryName(categoryGroup.category.name)
      .subscribe((item: CategoryGroupModel) => {
        this.categoryGroup = item;
        this.cdr.detectChanges();
      });
    this.commentCategoryList$ = this.commentCategoryService
      .getCommentCategoriesByCategoryName(categoryGroup.category.name, this.page - 1, this.pageSize);
    this.processComments();
  }

  loadComments(page: number) {
    this.page = page;
    this.commentCategoryList$ = this.commentCategoryService
      .getCommentCategoriesByCategoryName(this.selectedCategoryGroup.category.name, this.page - 1, this.pageSize);
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
      const toScroll = document.getElementById('emotionElement');
      toScroll.scrollIntoView({behavior: 'smooth', block: 'center'});
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
    this.selectedSentiment = sentiment;
    this.commentCategoryList$ = this.commentCategoryService.getCommentCategoriesByCategoryNameAndSentiment(this.categoryGroup.category.name,
      sentiment, this.page - 1, this.pageSize);
    this.processComments();
  }

  openTaskModal(content) {
    this.task.employee = null;
    if (this.employeeList == null) {
      this.employeeService.getAllEmployees()
        .subscribe((employeeList: EmployeeModel[]) => {
          this.employeeList = employeeList;
          this.cdr.detectChanges();
          this.modalService.open(content, {
            size: 'xl',
            ariaLabelledBy: 'modal-basic-title', scrollable: true
          }).result.then((result) => {
          }, (reason) => {
          });
        });
    } else {
      this.modalService.open(content, {
        size: 'xl',
        ariaLabelledBy: 'modal-basic-title', scrollable: true
      }).result.then((result) => {
      }, (reason) => {
      });
    }
  }

  assignTask(task: TaskModel) {
    task.comment = this.selectedItem;
    this.taskService.saveTasks(task)
      .subscribe((saved: TaskModel) => {
        this.toastr.success('Task assigned successfully');
        this.cdr.detectChanges();
        if (task.employee.phoneNumber != null) {
          let link = 'https://wa.me/' + task.employee.phoneNumber;
          const text = 'Hotel Uplift: you have new assignment. Click the link to see detail\n'
            + 'https://app.hoteluplift.com/task-management/' + saved.uuid;
          link = link + '?text=' + encodeURIComponent(text);
          window.open(link, '_blank');
        }
      });
    this.modalService.dismissAll();
  }

  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$).pipe(
      map(term => (term === '' ? this.employeeList
        : this.employeeList.filter(v => v.firstName.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  };
}
