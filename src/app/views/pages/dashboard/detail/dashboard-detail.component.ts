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
import {Label} from 'ng2-charts';
import {TemplateModel} from '../../../../core/template/_models/template.model';
import {TemplateService} from '../../../../core/template/_services/template.service';
import {TranslateService} from '@ngx-translate/core';
import {IClipboardResponse} from 'ngx-clipboard';
import {UserModel} from '../../../../core/auth/_models/user.model';
import {AuthService} from '../../../../core/auth/_service/auth.service';
import {ToastrService} from 'ngx-toastr';
import {AppSettings} from '../../../../core/consts/AppSettings';


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
  commentsByTraveledWith$: Observable<CommentCountTraveledWithModel[]>;
  templates: TemplateModel[];
  selectedTemplate: TemplateModel;
  newTemplate: TemplateModel;
  newTemplateFlow: boolean;
  noReviewText: string;
  currentUser: UserModel;
  employeeList: EmployeeModel[];
  selectedComment: CommentModel;
  task: TaskModel = new TaskModel();
  unknownTraveledWithData: boolean;
  closeResult = '';
  source: string;
  pieChartLabelsLanguage: Label[] = [];
  pieChartDataLanguage: number[] = [];
  pieChartLabelsTravelerType: Label[] = [];
  pieChartDataTravelerType: number[] = [];
  resultFormatter = (result: EmployeeModel) => result.firstName + ' ' + result.lastName;
  inputFormatter = (x: EmployeeModel) => x.firstName + ' ' + x.lastName;

  constructor(private route: ActivatedRoute,
              private modalService: NgbModal,
              private authService: AuthService,
              private commentService: CommentService,
              private taskService: TaskService,
              private templateService: TemplateService,
              private tableService: TableService,
              private translateService: TranslateService,
              private toastr: ToastrService,
              private cdr: ChangeDetectorRef) {
    this.noReviewText = AppSettings.NO_REVIEW;
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
      for (const commentCountLanguageModel of commentCountLanguageModels) {
        this.pieChartLabelsLanguage.push(commentCountLanguageModel.language);
        this.pieChartDataLanguage.push(commentCountLanguageModel.commentCount);
      }
      this.cdr.detectChanges();
      this.tableService.addLabelTag(this.elRefLanguage);
    });

    this.commentsByTraveledWith$ = this.commentService.getCommentsByCountByTraveledWithAndSource(this.source);
    this.commentsByTraveledWith$.subscribe((assessmentByTravelType: CommentCountTraveledWithModel[]) => {
      this.unknownTraveledWithData = assessmentByTravelType.length === 1 && assessmentByTravelType[0].traveledWith == null;
      for (const commentCountTravelerType of assessmentByTravelType) {
        this.pieChartLabelsTravelerType.push(commentCountTravelerType.traveledWith);
        this.pieChartDataTravelerType.push(commentCountTravelerType.commentCount);
      }
      this.cdr.detectChanges();
      this.tableService.addLabelTag(this.elRefTravelType);
    });
    this.currentUser = this.authService.currentUserValue;
  }

  markAsStarred(selectedItem: CommentModel) {
    selectedItem.starred = !selectedItem.starred;
    this.commentService.updateComment(selectedItem.id, selectedItem)
      .subscribe((commentModel: CommentModel) => {
        if (commentModel.starred) {
          this.toastr.success('This comment marked as imported');
        } else {
          this.toastr.success('This comment unmarked');
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
    this.modalService.open(contentReviewDetail, {size: 'xl', ariaLabelledBy: 'modal-basic-title', scrollable: true})
      .result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openReplyModal(content: TemplateRef<any>, comment: CommentModel) {
    this.selectedComment = comment;
    if (this.templates == null) {
      this.templateService.getTemplates()
        .subscribe((templateModels: TemplateModel[]) => {
          this.templates = templateModels;
          this.selectedTemplate = new TemplateModel();
          this.translateService.get('GENERAL.SELECT_TEMPLATE')
            .subscribe(title => {
              this.selectedTemplate.title = title;
            });
          this.newTemplate = new TemplateModel();
          this.cdr.detectChanges();
          this.modalService.open(content, {
            keyboard: false, backdrop: 'static',
            size: 'xl', ariaLabelledBy: 'modal-basic-title', scrollable: true
          }).result.then((result) => {
          }, (reason) => {
          });
        });
    } else {
      this.selectedTemplate = new TemplateModel();
      this.translateService.get('GENERAL.SELECT_TEMPLATE')
        .subscribe(title => {
          this.selectedTemplate.title = title;
        });
      this.newTemplate = new TemplateModel();
      this.modalService.open(content, {
        keyboard: false, backdrop: 'static',
        size: 'xl', ariaLabelledBy: 'modal-basic-title', scrollable: true
      }).result.then((result) => {
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

  selectTemplate(template: TemplateModel) {
    this.selectedTemplate = template;
    let content = this.selectedTemplate.content;
    content = content.replace(/--author-name--/g, this.selectedComment.author);
    content = content.replace(/--hotel-name--/g, this.currentUser.hotelName);
    this.selectedTemplate.content = content;
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

  copyAndGo($event: IClipboardResponse) {
    window.open(this.selectedComment.url, '_blank');
  }
}
