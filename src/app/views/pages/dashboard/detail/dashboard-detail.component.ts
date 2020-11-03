import {ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {ChartDataSets} from 'chart.js';
import {Label} from 'ng2-charts';
import {ActivatedRoute} from '@angular/router';
import {CommentModel} from '../../../../core/inbox/_models/comment.model';
import {CommentCountLanguageModel} from '../../../../core/inbox/_models/comment-count-language.model';
import {CommentCountTraveledWithModel} from '../../../../core/inbox/_models/comment-count-traveled-with.model';
import {EmployeeModel} from '../../../../core/task/_models/employee.model';
import {TaskModel} from '../../../../core/inbox/_models/task.model';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CommentService} from '../../../../core/inbox/_services/comment.service';
import {TaskService} from '../../../../core/task/_services/task.service';


@Component({
  selector: 'app-dashboard-detail',
  templateUrl: './dashboard-detail.component.html',
  styleUrls: ['./dashboard-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardDetailComponent implements OnInit {
  @ViewChild('commentTable') elRef;
  @ViewChild('languageTable') elRefLanguage;
  @ViewChild('travelTypeTable') elRefTravelType;
  commentList$: Observable<CommentModel[]>;
  commentList: CommentModel[] = [];
  commentsByLanguage$: Observable<CommentCountLanguageModel[]>;
  commentsByLanguage: CommentCountLanguageModel[] = [];
  commentsByTraveledWith$: Observable<CommentCountTraveledWithModel[]>;
  commentsByTraveledWith: CommentCountTraveledWithModel[] = [];
  employeeList$: Observable<EmployeeModel[]>;
  employeeList: EmployeeModel[];
  selectedComment: CommentModel;
  task: TaskModel = new TaskModel();

  closeResult = '';
  source: string;
  lineChartData: ChartDataSets[] = [
    {data: [72, 75, 77, 77, 80, 84], label: 'Bar'},
    {data: [72, 74, 78, 79, 79, 79], label: 'Reception'},
    {data: [70, 73, 75, 79, 80, 83], label: 'Rooms'},
    {data: [72, 72, 72, 72, 73, 73], label: 'Cleanliness'},
    {data: [74, 74, 75, 75, 75, 76], label: 'Pool'},
  ];
  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];
  resultFormatter = (result: EmployeeModel) => result.name + ' ' + result.surname;
  inputFormatter = (x: EmployeeModel) => x.name + ' ' + x.surname;

  constructor(private route: ActivatedRoute,
              private modalService: NgbModal,
              private commentService: CommentService,
              private taskService: TaskService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.source = this.route.snapshot.paramMap.get('source');
    this.commentList$ = this.commentService.getLatestCommentsBySource(this.source);
    this.commentList$.subscribe((commentList: CommentModel[]) => {
      this.commentList = commentList;
      this.cdr.detectChanges();
      this.addLabelTag();
    });

    this.commentsByLanguage$ = this.commentService.getCommentsByCountByLanguageAndSource(this.source);
    this.commentsByLanguage$.subscribe((commentCountLanguageModels: CommentCountLanguageModel[]) => {
      this.commentsByLanguage = commentCountLanguageModels;
      this.cdr.detectChanges();
      this.addLabelTagToLanguageTable();
    });

    this.commentsByTraveledWith$ = this.commentService.getCommentsByCountByTraveledWithAndSource(this.source);
    this.commentsByTraveledWith$.subscribe((assessmentByTravelType: CommentCountTraveledWithModel[]) => {
      this.commentsByTraveledWith = assessmentByTravelType;
      this.cdr.detectChanges();
      this.addLabelTagToTravelType();
    });

    this.employeeList$ = this.taskService.getEmployeeList();
    this.employeeList$.subscribe((employeeList: EmployeeModel[]) => {
      this.employeeList = employeeList;
      this.cdr.detectChanges();
    });
  }

  markAsStarred(comment: CommentModel) {
    comment.starred = !comment.starred;
    this.commentService.updateComment(comment.id, comment)
      .subscribe((commentModel: CommentModel) => {
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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  translate(comment) {
    this.selectedComment = comment;
  }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length > 1 ? []
        : this.employeeList.filter(
          v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  openDetailPopup(comment: CommentModel, contentReviewDetail: TemplateRef<any>) {
    this.selectedComment = comment;
    this.modalService.open(contentReviewDetail, {ariaLabelledBy: 'modal-basic-title', scrollable: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  addLabelTag() {
    const tableEl = this.elRef.nativeElement;
    const thEls = tableEl.querySelectorAll('thead th');
    const tdLabels = Array.from(thEls).map( (el:any) => el.innerText);
    tableEl.querySelectorAll('tbody tr').forEach( tr => {
      Array.from(tr.children).forEach(
        (td: any, ndx) =>  td.setAttribute('label', tdLabels[ndx])
      );
    });
  }
  addLabelTagToLanguageTable() {
    const tableEl = this.elRefLanguage.nativeElement;
    const thEls = tableEl.querySelectorAll('thead th');
    const tdLabels = Array.from(thEls).map( (el:any) => el.innerText);
    tableEl.querySelectorAll('tbody tr').forEach( tr => {
      Array.from(tr.children).forEach(
        (td: any, ndx) =>  td.setAttribute('label', tdLabels[ndx])
      );
    });
  }
  addLabelTagToTravelType() {
    const tableEl = this.elRefTravelType.nativeElement;
    const thEls = tableEl.querySelectorAll('thead th');
    const tdLabels = Array.from(thEls).map( (el:any) => el.innerText);
    tableEl.querySelectorAll('tbody tr').forEach( tr => {
      Array.from(tr.children).forEach(
        (td: any, ndx) =>  td.setAttribute('label', tdLabels[ndx])
      );
    });
  }
}
