import {AfterViewInit, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {CommentModel} from '../../../core/inbox/_models/comment.model';
import {CommentService} from '../../../core/inbox/_services/comment.service';
import {ChartDataSets} from 'chart.js';
import {Label} from 'ng2-charts';
import {Router} from '@angular/router';
import {DashboardService} from '../../../core/dashboard/_service/dashboard.service';
import {TaskService} from '../../../core/task/_services/task.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import 'rxjs-compat/add/operator/debounceTime';
import 'rxjs-compat/add/operator/distinctUntilChanged';
import 'rxjs-compat/add/operator/map';
import {CompetitionModel} from '../../../core/competition/_models/competition.model';
import {CompetitionService} from '../../../core/competition/_services/competition.service';
import {CommentCountModel} from '../../../core/inbox/_models/comment-count.model';
import {CommentCountRatingModel} from '../../../core/dashboard/_models/comment-count-rating.model';
import {AuthService} from '../../../core/auth/_service/auth.service';
import {UserModel} from '../../../core/auth/_models/user.model';
import {MonthlyRatingsModel} from '../../../core/dashboard/_models/monthly-ratings.model';
import {CommentCategoryService} from '../../../core/category/_services/comment-category.service';
import {CategoryGroupModel} from '../../../core/category/_models/category-group.model';
import {ToastrService} from 'ngx-toastr';
import {TaskModel} from '../../../core/task/_models/task.model';
import {EmployeeService} from '../../../core/employee/_services/employee.service';
import {EmployeeModel} from '../../../core/employee/_models/employee.model';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {TableService} from '../../../core/general/_services/table.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../../app.component.scss', './dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit, AfterViewInit {

  @ViewChild('contentReviewDetail') public contentReviewDetail: TemplateRef<any>;
  @ViewChild('commentTable') elRef;
  commentList$: Observable<CommentModel[]>;
  commentList: CommentModel[] = [];
  commentCountList$: Observable<CommentCountModel[]>;
  commentCountList: CommentCountModel[];
  monthlyRating$: Observable<MonthlyRatingsModel>;
  monthlyRating: MonthlyRatingsModel;
  commentCountRatings$: Observable<CommentCountRatingModel[]>;
  commentCountRatings: CommentCountRatingModel[];
  commentCountPeriods$: Observable<CommentCountModel[]>;
  commentCountPeriods: CommentCountModel[];
  categoryGroupList$: Observable<CategoryGroupModel[]>;
  categoryGroupList: CategoryGroupModel[];
  competitionList$: Observable<CompetitionModel[]>;
  competitionList: CompetitionModel[];
  currentUser: UserModel;
  lineChartData: ChartDataSets[] = [];
  lineChartLabels: Label[] = [];
  selectedComment: CommentModel;
  employeeList: EmployeeModel[];
  closeResult = '';
  task: TaskModel = new TaskModel();
  form: any;
  selectedHotel: CompetitionModel;
  hotel: CompetitionModel;
  selectedItem: CommentModel;
  totalElements = 0;
  pageSize = 10;
  page = 1;

  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];

  resultFormatter = (result: EmployeeModel) => result.firstName + ' ' + result.lastName;
  inputFormatter = (x: EmployeeModel) => x.firstName + ' ' + x.lastName;

  constructor(private dashboardService: DashboardService,
              private commentService: CommentService,
              private authService: AuthService,
              private taskService: TaskService,
              private competitionService: CompetitionService,
              private commentCategoryService: CommentCategoryService,
              private employeeService: EmployeeService,
              private modalService: NgbModal,
              private tableService: TableService,
              private toastr: ToastrService,
              private cdr: ChangeDetectorRef,
              private router: Router) {
  }

  ngOnInit() {
    this.commentList$ = this.commentService.getComments(this.page - 1, this.pageSize);
    this.processComments();
    this.commentCountList$ = this.commentService.getCommentsByCount();
    this.commentCountList$.subscribe((commentCountList: CommentCountModel[]) => {
      this.commentCountList = commentCountList;
      for (const commentCountModel of commentCountList) {
        this.pieChartLabels.push(commentCountModel.label);
        this.pieChartData.push(commentCountModel.count);
      }
      this.cdr.detectChanges();
    });
    this.commentCountRatings$ = this.dashboardService.getCommentCountAndRatings();
    this.commentCountRatings$.subscribe((commentCountRatings: CommentCountRatingModel[]) => {
      this.commentCountRatings = commentCountRatings;
      this.cdr.detectChanges();
    });

    this.commentCountPeriods$ = this.dashboardService.getCommentCount();
    this.commentCountPeriods$.subscribe((commentCount: CommentCountModel[]) => {
      this.commentCountPeriods = commentCount;
      this.cdr.detectChanges();
    });
    this.monthlyRating$ = this.dashboardService.getMonthlyRating();
    this.monthlyRating$.subscribe((monthlyRating: MonthlyRatingsModel) => {
      this.monthlyRating = monthlyRating;
      this.lineChartLabels = this.monthlyRating.months;
      this.lineChartData = this.monthlyRating.item;
      this.cdr.detectChanges();
    });
    this.currentUser = this.authService.currentUserValue;
    this.categoryGroupList$ = this.commentCategoryService.getCategorySentimentCount();
    this.categoryGroupList$.subscribe((categoryGroupList: CategoryGroupModel[]) => {
      this.categoryGroupList = categoryGroupList;
      this.cdr.detectChanges();
    });

    this.competitionList$ = this.competitionService.getCompetitionList();
    this.competitionList$.subscribe((competitionList: CompetitionModel[]) => {
      this.competitionList = competitionList;
      this.selectedHotel = this.competitionList[0];
      this.hotel = this.competitionList[0];
      this.cdr.detectChanges();
    });
  }

  ngAfterViewInit() {

  }

  goToDetail(source: string) {
    if (!source.toLowerCase().includes('hoteluplift')) {
      this.router.navigateByUrl('dashboard/' + source);
    }
  }

  goToCategoryDetail(type: string) {
    this.router.navigateByUrl('category/' + type);
  }

  markAsStarred(selectedItem: CommentModel) {
    selectedItem.starred = !selectedItem.starred;
    this.commentService.updateComment(selectedItem.id, selectedItem)
      .subscribe((commentModel: CommentModel) => {
        if (commentModel.starred) {
          this.toastr.success('This comment marked as imported');
        } else {
          this.toastr.success('This comment marked as imported');
        }
      });
  }

  translate(comment: CommentModel) {
    this.commentService.getTranslatedComment(comment.id)
      .subscribe((translatedComment: CommentModel) => {
        this.selectedComment = translatedComment;
        this.open(this.selectedComment, this.contentReviewDetail);
      });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1
        ? []
        : this.employeeList.filter(v => v.firstName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  openDetailPopup(comment: CommentModel, contentReviewDetail: TemplateRef<any>) {
    this.selectedComment = comment;
    this.modalService.open(contentReviewDetail, {ariaLabelledBy: 'modal-basic-title', scrollable: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openHotelSelectionPopup(contentCompetition: TemplateRef<any>) {
    this.modalService.open(contentCompetition, {ariaLabelledBy: 'modal-basic-title', scrollable: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  changeHotel() {
    this.hotel = this.selectedHotel;
    this.modalService.dismissAll();
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
      this.cdr.detectChanges();
      this.tableService.addLabelTag(this.elRef);
    });
  }

  open(comment, content) {
    this.selectedComment = comment;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', scrollable: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openTaskModal(comment: CommentModel, content: TemplateRef<any>) {
    this.selectedComment = comment;
    this.task = new TaskModel();
    if (this.employeeList == null) {
      this.employeeService.getAllEmployees()
        .subscribe((employeeList: EmployeeModel[]) => {
          this.employeeList = employeeList;
          this.cdr.detectChanges();
          this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', scrollable: true}).result.then((result) => {
          }, (reason) => {
          });
        });
    } else {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', scrollable: true}).result.then((result) => {
      }, (reason) => {
      });
    }
  }

  assignTask(task: TaskModel) {
    task.comment = this.selectedComment;
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
}
