import {ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {merge, Observable, Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {CommentModel} from '../../../../core/inbox/_models/comment.model';
import {CommentCountLanguageModel} from '../../../../core/inbox/_models/comment-count-language.model';
import {CommentCountTraveledWithModel} from '../../../../core/inbox/_models/comment-count-traveled-with.model';
import {TaskModel} from '../../../../core/task/_models/task.model';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CommentService} from '../../../../core/inbox/_services/comment.service';
import {TaskService} from '../../../../core/task/_services/task.service';
import {EmployeeModel} from '../../../../core/employee/_models/employee.model';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {TableService} from '../../../../core/general/_services/table.service';


@Component({
  selector: 'app-dashboard-detail',
  templateUrl: './dashboard-detail.component.html',
  styleUrls: ['../../../../app.component.scss', '../dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardDetailComponent implements OnInit {
  @ViewChild('contentReviewDetail') public contentReviewDetail: TemplateRef<any>;
  @ViewChild('commentTable') elRef;
  @ViewChild('languageTable') elRefLanguage;
  @ViewChild('travelTypeTable') elRefTravelType;
  focus$ = new Subject<string>();
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
  resultFormatter = (result: EmployeeModel) => result.firstName + ' ' + result.lastName;
  inputFormatter = (x: EmployeeModel) => x.firstName + ' ' + x.lastName;

  constructor(private route: ActivatedRoute,
              private modalService: NgbModal,
              private commentService: CommentService,
              private taskService: TaskService,
              private tableService: TableService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.source = this.route.snapshot.paramMap.get('source');
    this.commentList$ = this.commentService.getLatestCommentsBySource(this.source);
    this.commentList$.subscribe((commentList: CommentModel[]) => {
      this.commentList = commentList;
      this.cdr.detectChanges();
      this.tableService.addLabelTag(this.elRef);
    });

    this.commentsByLanguage$ = this.commentService.getCommentsByCountByLanguageAndSource(this.source);
    this.commentsByLanguage$.subscribe((commentCountLanguageModels: CommentCountLanguageModel[]) => {
      this.commentsByLanguage = commentCountLanguageModels;
      this.cdr.detectChanges();
      this.tableService.addLabelTag(this.elRefLanguage);
    });

    this.commentsByTraveledWith$ = this.commentService.getCommentsByCountByTraveledWithAndSource(this.source);
    this.commentsByTraveledWith$.subscribe((assessmentByTravelType: CommentCountTraveledWithModel[]) => {
      this.commentsByTraveledWith = assessmentByTravelType;
      this.cdr.detectChanges();
      this.tableService.addLabelTag(this.elRefTravelType);
    });
  }

  markAsStarred(comment: CommentModel) {
    comment.starred = !comment.starred;
    this.commentService.updateComment(comment.id, comment)
      .subscribe((commentModel: CommentModel) => {
      });
  }

  translate(comment: CommentModel) {
    this.commentService.getTranslatedComment(comment.id)
      .subscribe((translatedComment: CommentModel) => {
        this.selectedComment = translatedComment;
        this.open(this.selectedComment, this.contentReviewDetail);
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

  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$).pipe(
      map(term => (term === '' ? this.employeeList
        : this.employeeList.filter(v => v.firstName.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  };

  openDetailPopup(comment: CommentModel, contentReviewDetail: TemplateRef<any>) {
    this.selectedComment = comment;
    this.modalService.open(contentReviewDetail, {ariaLabelledBy: 'modal-basic-title', scrollable: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
}
