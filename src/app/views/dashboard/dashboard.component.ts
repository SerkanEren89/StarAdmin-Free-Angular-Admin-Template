import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {Observable} from "rxjs";
import {CommentModel} from "../../core/inbox/_models/comment.model";
import {CommentService} from "../../core/inbox/_services/comment.service";
import {ChartDataSets} from "chart.js";
import {Label} from "ng2-charts";
import {Router} from "@angular/router";
import {DashboardService} from "../../core/dashboard/_service/dashboard.service";
import {BrandRating} from "../../core/dashboard/_models/brand-rating";
import {ImprovementModel} from "../../core/improvement/_models/improvement.model";
import {ImprovementService} from "../../core/improvement/_services/improvement.service";
import {TaskModel} from "../../core/inbox/_models/task.model";
import {EmployeeModel} from "../../core/task/_models/employee.model";
import {TaskService} from "../../core/task/_services/task.service";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import "rxjs-compat/add/operator/debounceTime";
import "rxjs-compat/add/operator/distinctUntilChanged";
import "rxjs-compat/add/operator/map";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../app.component.scss','./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  commentList$: Observable<CommentModel[]>;
  commentList: CommentModel[];
  brandRatings$: Observable<BrandRating[]>;
  brandRatings: BrandRating[];
  improvementList$: Observable<ImprovementModel[]>;
  improvementList: ImprovementModel[];
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
  resultFormatter = (result: EmployeeModel) => result.name + " " + result.surname;
  inputFormatter =  (x: EmployeeModel) => x.name + " " + x.surname;
  public task: TaskModel = new TaskModel();
  form: any;

  public pieChartLabels: Label[] = ['Booking', 'TripAdvisor', 'Hotels.com', 'Google', 'Tatil sepeti'];
  public pieChartData: number[] = [300, 500, 100, 200, 300];


  constructor(private dashbordService: DashboardService,
              private commentService: CommentService,
              private improvementService: ImprovementService,
              private taskService: TaskService,
              private modalService: NgbModal,
              private cdr: ChangeDetectorRef,
              private router: Router) {
  }

  ngOnInit() {
    this.commentList$ = this.commentService.getCommentList();
    this.commentList$.subscribe((commentList: CommentModel[]) => {
      this.commentList = commentList;
      this.cdr.detectChanges();
    });
    this.brandRatings$ = this.dashbordService.getBrandRating();
    this.brandRatings$.subscribe((brandRatings: BrandRating[]) => {
      this.brandRatings = brandRatings;
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
  }

  goToDetail(source: string) {
    this.router.navigateByUrl("dashboard/" + source)
  }

  open(comment, content) {
    this.selectedComment = comment;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', scrollable: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length > 1 ? []
        : this.employeeList.filter(
          v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));
}
