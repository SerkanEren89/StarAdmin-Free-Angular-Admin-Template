import {ChangeDetectorRef, Component, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {CommentModel} from '../../../core/inbox/_models/comment.model';
import {CommentService} from '../../../core/inbox/_services/comment.service';
import {ChartDataSets} from 'chart.js';
import {Label} from 'ng2-charts';
import {Router} from '@angular/router';
import {DashboardService} from '../../../core/dashboard/_service/dashboard.service';
import {ImprovementModel} from '../../../core/improvement/_models/improvement.model';
import {ImprovementService} from '../../../core/improvement/_services/improvement.service';
import {TaskModel} from '../../../core/inbox/_models/task.model';
import {EmployeeModel} from '../../../core/task/_models/employee.model';
import {TaskService} from '../../../core/task/_services/task.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import 'rxjs-compat/add/operator/debounceTime';
import 'rxjs-compat/add/operator/distinctUntilChanged';
import 'rxjs-compat/add/operator/map';
import {CompetitionModel} from '../../../core/competition/_models/competition.model';
import {CompetitionService} from '../../../core/competition/_services/competition.service';
import {CommentCountModel} from '../../../core/inbox/_models/comment-count.model';
import {CommentCountRatingModel} from '../../../core/dashboard/_models/comment-count-rating.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../../app.component.scss', './dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  commentList$: Observable<CommentModel[]>;
  commentList: CommentModel[] = [];
  commentCountList$: Observable<CommentCountModel[]>;
  commentCountList: CommentCountModel[];
  commentCountRatings$: Observable<CommentCountRatingModel[]>;
  commentCountRatings: CommentCountRatingModel[];
  improvementList$: Observable<ImprovementModel[]>;
  improvementList: ImprovementModel[];
  competitionList$: Observable<CompetitionModel[]>;
  competitionList: CompetitionModel[];
  lineChartData: ChartDataSets[] = [
    { data: [72, 75, 77, 77, 86, 89], label: 'Overall' },
    { data: [72, 75, 77, 77, 80, 84], label: 'Booking' },
    { data: [72, 74, 78, 79, 79, 79], label: 'TripAdvisor' },
    { data: [70, 73, 75, 79, 80, 83], label: 'Hotels.com' },
    { data: [72, 72, 72, 72, 73, 73], label: 'Google' },
  ];
  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];
  selectedComment: CommentModel;
  employeeList$: Observable<EmployeeModel[]>;
  employeeList: EmployeeModel[];
  closeResult = '';
  task: TaskModel = new TaskModel();
  form: any;
  selectedHotel: CompetitionModel;
  hotel: CompetitionModel;

  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];

  resultFormatter = (result: EmployeeModel) => result.name + ' ' + result.surname;
  inputFormatter =  (x: EmployeeModel) => x.name + ' ' + x.surname;

  constructor(private dashboardService: DashboardService,
              private commentService: CommentService,
              private improvementService: ImprovementService,
              private taskService: TaskService,
              private competitionService: CompetitionService,
              private modalService: NgbModal,
              private cdr: ChangeDetectorRef,
              private router: Router) {
  }

  ngOnInit() {
    this.commentList$ = this.commentService.getLatestComments();
    this.commentList$.subscribe((commentList: CommentModel[]) => {
      this.commentList = commentList;
      this.cdr.detectChanges();
    });
    this.commentCountList$ = this.commentService.getCommentsByCount();
    this.commentCountList$.subscribe((commentCountList: CommentCountModel[]) => {
      this.commentCountList = commentCountList;
      for (const commentCountModel of commentCountList) {
        this.pieChartLabels.push(commentCountModel.source);
        this.pieChartData.push(commentCountModel.commentCount);
      }
      this.cdr.detectChanges();
    });
    this.commentCountRatings$ = this.dashboardService.getCommentCountAndRatings();
    this.commentCountRatings$.subscribe((commentCountRatings: CommentCountRatingModel[]) => {
      this.commentCountRatings = commentCountRatings;
      this.cdr.detectChanges();
    });
    this.improvementList$ = this.improvementService.getAllImprovementList();
    this.improvementList$.subscribe((improvementList: ImprovementModel[]) => {
      this.improvementList = improvementList;
      this.cdr.detectChanges();
    });

    this.employeeList$ = this.taskService.getEmployeeList();
    this.employeeList$.subscribe((employeeList: EmployeeModel[]) => {
      this.employeeList = employeeList;
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

  goToDetail(source: string) {
    this.router.navigateByUrl('dashboard/' + source);
  }

  open(comment, content) {
    this.selectedComment = comment;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', scrollable: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  translate(comment) {
    this.selectedComment = comment;
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
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length > 1 ? []
        : this.employeeList.filter(
          v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))

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

  markAsStarred(comment: CommentModel) {
    comment.starred = !comment.starred;
    this.commentService.updateComment(comment.id, comment)
      .subscribe((commentModel: CommentModel) => {
      });
  }
}
