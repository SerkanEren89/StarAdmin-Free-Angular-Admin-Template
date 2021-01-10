import {ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {merge, Observable, Subject} from 'rxjs';
import {CommentModel} from '../../../core/inbox/_models/comment.model';
import {CommentService} from '../../../core/inbox/_services/comment.service';
import {ChartDataSets} from 'chart.js';
import {Label} from 'ng2-charts';
import {ActivatedRoute, Router} from '@angular/router';
import {DashboardService} from '../../../core/dashboard/_service/dashboard.service';
import {TaskService} from '../../../core/task/_services/task.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import 'rxjs-compat/add/operator/debounceTime';
import 'rxjs-compat/add/operator/distinctUntilChanged';
import 'rxjs-compat/add/operator/map';
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
import {HotelService} from '../../../core/hotel/_services/hotel.service';
import {HotelModel} from '../../../core/hotel/_models/hotel.model';
import {TemplateModel} from '../../../core/template/_models/template.model';
import {TemplateService} from '../../../core/template/_services/template.service';
import {IClipboardResponse} from 'ngx-clipboard';
import {DeviceDetectorService} from 'ngx-device-detector';
import {ResponseRateModel} from '../../../core/dashboard/_models/response-rate.model';
import {AppSettings} from '../../../core/consts/AppSettings';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../../app.component.scss', './dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  focus$ = new Subject<string>();
  @ViewChild('contentReviewDetail') public contentReviewDetail: TemplateRef<any>;
  @ViewChild('commentTable') elRef;
  commentList: CommentModel[] = [];
  commentCountList: CommentCountModel[];
  monthlyRating: MonthlyRatingsModel;
  commentCountRatings: CommentCountRatingModel[];
  commentCountPeriods: CommentCountModel[];
  categoryGroupList: CategoryGroupModel[];
  competitionList: HotelModel[];
  currentUser: UserModel;
  lineChartData: ChartDataSets[] = [];
  lineChartLabels: Label[] = [];
  selectedComment: CommentModel;
  employeeList: EmployeeModel[];
  templates: TemplateModel[];
  selectedTemplate: TemplateModel;
  newTemplate: TemplateModel;
  newTemplateFlow: boolean;
  closeResult = '';
  task: TaskModel = new TaskModel();
  responseRateModel: ResponseRateModel;
  form: any;
  competitorHotel: HotelModel;
  selectedCompetitor: HotelModel;
  selectedItem: CommentModel;
  totalElements = 0;
  pageSize = 10;
  page = 1;
  isMobile: boolean;
  noReviewText: string;
  showAddEmployeeFlow = false;

  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];

  resultFormatter = (result: EmployeeModel) => result.firstName + ' ' + result.lastName;
  inputFormatter = (x: EmployeeModel) => x.firstName + ' ' + x.lastName;

  constructor(private dashboardService: DashboardService,
              private commentService: CommentService,
              private authService: AuthService,
              private taskService: TaskService,
              private hotelService: HotelService,
              private commentCategoryService: CommentCategoryService,
              private employeeService: EmployeeService,
              private templateService: TemplateService,
              private modalService: NgbModal,
              private tableService: TableService,
              private toastr: ToastrService,
              private cdr: ChangeDetectorRef,
              private route: ActivatedRoute,
              private router: Router,
              private deviceService: DeviceDetectorService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.noReviewText = AppSettings.NO_REVIEW;
  }

  ngOnInit() {
    this.isMobile = this.deviceService.isMobile();
    const uuid = this.route.snapshot.paramMap.get('uuid');
    if (uuid == null) {
      this.getInitialDataForMainHotel();
    } else {
      this.competitionList = this.hotelService.savedCompetitors;
      if (this.competitionList == null) {
        this.hotelService.getCompetitors()
          .subscribe((competitionList: HotelModel[]) => {
            this.competitionList = competitionList;
            this.hotelService.savedCompetitors = competitionList;
            this.competitorHotel = this.competitionList.find(competitior => competitior.uuid === uuid);
            this.getInitialDataForCompetitorHotel();
            this.cdr.detectChanges();
          });
      } else {
        this.competitorHotel = this.competitionList.find(competitior => competitior.uuid === uuid);
        this.getInitialDataForCompetitorHotel();
      }
    }
  }

  getInitialDataForMainHotel() {
    this.processComments(this.page);
    this.commentService.getCommentsByCount()
      .subscribe((commentCountList: CommentCountModel[]) => {
        this.commentCountList = commentCountList;
        for (const commentCountModel of commentCountList) {
          this.pieChartLabels.push(commentCountModel.label);
          this.pieChartData.push(commentCountModel.count);
        }
        this.cdr.detectChanges();
      });
    this.dashboardService.getCommentCountAndRatings()
      .subscribe((commentCountRatings: CommentCountRatingModel[]) => {
        this.commentCountRatings = commentCountRatings;
        this.cdr.detectChanges();
      });

    this.dashboardService.getCommentCount()
      .subscribe((commentCount: CommentCountModel[]) => {
        this.commentCountPeriods = commentCount;
        this.cdr.detectChanges();
      });
    this.dashboardService.getMonthlyRating().subscribe((monthlyRating: MonthlyRatingsModel) => {
      this.monthlyRating = monthlyRating;
      this.lineChartLabels = this.monthlyRating.months;
      this.lineChartData = this.monthlyRating.item;
      this.cdr.detectChanges();
    });
    this.currentUser = this.authService.currentUserValue;
    this.commentCategoryService.getCategorySentimentCount()
      .subscribe((categoryGroupList: CategoryGroupModel[]) => {
        this.categoryGroupList = categoryGroupList;
        this.cdr.detectChanges();
      });
    this.dashboardService.getResponseRate().subscribe((responseRateModel: ResponseRateModel) => {
      this.responseRateModel = responseRateModel;
      this.cdr.detectChanges();
    });
  }

  getInitialDataForCompetitorHotel() {
    const hotelId = this.competitorHotel.id;
    this.processComments(this.page);
    this.commentService.getCommentsByCountForHotelId(hotelId)
      .subscribe((commentCountList: CommentCountModel[]) => {
        this.commentCountList = commentCountList;
        for (const commentCountModel of commentCountList) {
          this.pieChartLabels.push(commentCountModel.label);
          this.pieChartData.push(commentCountModel.count);
        }
        this.cdr.detectChanges();
      });
    this.dashboardService.getCommentCountAndRatingsForHotelId(hotelId)
      .subscribe((commentCountRatings: CommentCountRatingModel[]) => {
        this.commentCountRatings = commentCountRatings;
        this.cdr.detectChanges();
      });

    this.dashboardService.getCommentCountForHotelId(hotelId)
      .subscribe((commentCount: CommentCountModel[]) => {
        this.commentCountPeriods = commentCount;
        this.cdr.detectChanges();
      });
    this.dashboardService.getMonthlyRatingForHotelId(hotelId)
      .subscribe((monthlyRating: MonthlyRatingsModel) => {
        this.monthlyRating = monthlyRating;
        this.lineChartLabels = this.monthlyRating.months;
        this.lineChartData = this.monthlyRating.item;
        this.cdr.detectChanges();
      });
    this.currentUser = this.authService.currentUserValue;
    this.commentCategoryService.getCategorySentimentCountForHotelId(hotelId)
      .subscribe((categoryGroupList: CategoryGroupModel[]) => {
        this.categoryGroupList = categoryGroupList;
        this.cdr.detectChanges();
      });
    this.dashboardService.getResponseRateByHotelId(hotelId).subscribe((responseRateModel: ResponseRateModel) => {
      this.responseRateModel = responseRateModel;
      this.cdr.detectChanges();
    });
  }

  goToDetail(source: string) {
    if (!source.toLowerCase().includes('hoteluplift') && this.competitorHotel == null) {
      this.router.navigateByUrl('dashboard/detail/' + source);
    }
  }

  goToCategoryDetail(type: string) {
    if (this.competitorHotel == null) {
      this.router.navigateByUrl('category/' + type);
    }
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

  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$).pipe(
      map(term => {
        if (term.length < 1) {
          return this.employeeList;
        }
        this.showAddEmployeeFlow = false;
        const searchResults = this.employeeList
          .filter(v => v.firstName.toLowerCase().indexOf(term.toLowerCase()) > -1)
          .slice(0, 10);
        if (searchResults.length > 0) {
          return searchResults;
        } else {
          this.showAddEmployeeFlow = true;
          return this.employeeList;
        }
      })
    );
  };

  openDetailPopup(comment: CommentModel, contentReviewDetail: TemplateRef<any>) {
    this.selectedComment = comment;
    this.modalService.open(contentReviewDetail, {size: 'xl',
      ariaLabelledBy: 'modal-basic-title', scrollable: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  changeHotel() {
    if (!this.selectedCompetitor.selected) {
      this.competitorHotel = this.selectedCompetitor;
      this.router.navigateByUrl('dashboard/' + this.competitorHotel.uuid);
    } else {
      this.competitorHotel = null;
      this.router.navigateByUrl('dashboard');
    }
    this.modalService.dismissAll();
  }

  processComments(page: number) {
    if (this.competitorHotel == null) {
      this.commentService.getComments(page - 1, this.pageSize)
        .subscribe((commentList: CommentModel[]) => {
          this.commentList = commentList['content'];
          this.commentList.forEach(commnet => commnet.ratingOverFive = commnet.rating / 2);
          this.totalElements = commentList['totalElements'];
          this.selectedItem = this.commentList[0];
          this.cdr.detectChanges();
          this.tableService.addLabelTag(this.elRef);
        });
    } else {
      this.commentService.getCommentsForHotelId(this.competitorHotel.id, page - 1, this.pageSize)
        .subscribe((commentList: CommentModel[]) => {
          this.commentList = commentList['content'];
          this.commentList.forEach(commnet => commnet.ratingOverFive = commnet.rating / 2);
          this.totalElements = commentList['totalElements'];
          this.selectedItem = this.commentList[0];
          this.cdr.detectChanges();
          this.tableService.addLabelTag(this.elRef);
        });
    }
  }

  open(comment, content) {
    this.selectedComment = comment;
    this.modalService.open(content, {size: 'xl', ariaLabelledBy: 'modal-basic-title', scrollable: true}).result.then((result) => {
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
          this.modalService.open(content, {size: 'xl', ariaLabelledBy: 'modal-basic-title', scrollable: true}).result.then((result) => {
          }, (reason) => {
          });
        });
    } else {
      this.modalService.open(content, {size: 'xl', ariaLabelledBy: 'modal-basic-title', scrollable: true}).result.then((result) => {
      }, (reason) => {
      });
    }
  }

  openCompetitorModal(content: TemplateRef<any>) {
    if (this.competitionList == null) {
      this.hotelService.getCompetitors()
        .subscribe((competitionList: HotelModel[]) => {
          this.competitionList = competitionList;
          this.hotelService.savedCompetitors = competitionList;
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

  openReplyModal(content: TemplateRef<any>) {
    if (this.templates == null) {
      this.templateService.getTemplates()
        .subscribe((templateModels: TemplateModel[]) => {
          this.templates = templateModels;
          this.selectedTemplate = new TemplateModel();
          this.selectedTemplate.title = 'Select template';
          this.newTemplate = new TemplateModel();
          this.cdr.detectChanges();
          this.modalService.open(content, {keyboard: false, backdrop: 'static',
            size: 'xl', ariaLabelledBy: 'modal-basic-title', scrollable: true}).result.then((result) => {
          }, (reason) => {
          });
        });
    } else {
      this.selectedTemplate = new TemplateModel();
      this.selectedTemplate.title = 'Select template';
      this.newTemplate = new TemplateModel();
      this.modalService.open(content, {keyboard: false, backdrop: 'static',
        size: 'xl', ariaLabelledBy: 'modal-basic-title', scrollable: true}).result.then((result) => {
      }, (reason) => {
      });
    }
  }

  toNewTemplate() {
    this.newTemplateFlow = true;
    this.newTemplate = new TemplateModel();
    this.newTemplate.content = this.selectedTemplate.content;
  }

  cancelTemplateFlow() {
    this.newTemplateFlow = false;
  }

  saveNewTemplate() {
    this.templateService.saveTemplates(this.newTemplate)
      .subscribe((templateModel: TemplateModel) => {
        this.templateService.getTemplates()
          .subscribe((templates: TemplateModel[]) => {
            this.templates = templates;
            this.selectedTemplate = new TemplateModel();
            this.newTemplateFlow = false;
          });
        this.toastr.success('Your template saved successfully');
      });
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

  selectTemplate(template: TemplateModel) {
    this.selectedTemplate = template;
  }

  copyAndGo($event: IClipboardResponse) {
    window.open(this.selectedItem.url, '_blank');
  }
  addNewEmployee() {
    this.modalService.dismissAll();
    this.router.navigateByUrl('/employee');
  }
}
