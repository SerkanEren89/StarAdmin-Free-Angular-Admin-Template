import {ChangeDetectorRef, Component, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {CommentService} from '../../../core/inbox/_services/comment.service';
import {merge, Observable, Subject} from 'rxjs';
import {CommentModel} from '../../../core/inbox/_models/comment.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';
import moment from 'moment';
import {Options} from '@angular-slider/ngx-slider';
import {CommentFilterModel} from '../../../core/inbox/_models/comment-filter.model';
import {IClipboardResponse} from 'ngx-clipboard';
import {TemplateService} from '../../../core/template/_services/template.service';
import {TemplateModel} from '../../../core/template/_models/template.model';
import * as FileSaver from 'file-saver';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {EmployeeService} from '../../../core/employee/_services/employee.service';
import {EmployeeModel} from '../../../core/employee/_models/employee.model';
import {TaskModel} from '../../../core/task/_models/task.model';
import {TaskService} from '../../../core/task/_services/task.service';
import {ToastrService} from 'ngx-toastr';
import {DeviceDetectorService} from 'ngx-device-detector';
import {Router} from '@angular/router';
import {AppSettings} from '../../../core/consts/AppSettings';
import {CommonService} from '../../../core/general/_services/common.service';
import {UserModel} from '../../../core/auth/_models/user.model';
import {AuthService} from '../../../core/auth/_service/auth.service';
import {TranslateService} from '@ngx-translate/core';
import {HotelResponseModel} from '../../../core/hotel-response/_models/hotel-response.model';
import {HotelResponseService} from '../../../core/hotel-response/_services/hotel-response.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['../../../app.component.scss', './inbox.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InboxComponent implements OnInit {
  focus$ = new Subject<string>();
  commentList$: Observable<CommentModel[]>;
  commentList: CommentModel[];
  employeeList: EmployeeModel[];
  selectedItem: CommentModel;
  selected: any;
  maxDate: any;
  commentFilter: CommentFilterModel;
  templates: TemplateModel[] = [];
  selectedTemplate: TemplateModel;
  currentUser: UserModel;
  hotelResponseList: HotelResponseModel;
  selectedTravellerType: any;
  selectedIndex = 0;
  pageSize = 10;
  page = 1;
  totalElements;
  totalPages;
  closeResult = '';
  isMobile = false;
  newTemplateFlow: boolean;
  newTemplate: TemplateModel;
  noReviewText: string;
  filteredChannel = [];
  options: Options = {
    floor: 0,
    ceil: 10
  };
  commentSources;
  travelerTypes;
  task: TaskModel = new TaskModel();
  showAddEmployeeFlow: boolean;
  isFremium: boolean;
  resultFormatter = (result: EmployeeModel) => result.firstName + ' ' + result.lastName;
  inputFormatter = (x: EmployeeModel) => x.firstName + ' ' + x.lastName;

  constructor(private router: Router,
              private commentService: CommentService,
              private employeeService: EmployeeService,
              private templateService: TemplateService,
              private authService: AuthService,
              private taskService: TaskService,
              private hotelResponseService: HotelResponseService,
              private modalService: NgbModal,
              private toastr: ToastrService,
              private deviceService: DeviceDetectorService,
              private commonService: CommonService,
              private cdr: ChangeDetectorRef,
              private translateService: TranslateService) {
  }

  ngOnInit() {
    this.commentSources = this.commonService.getChannelFilter();
    this.travelerTypes = this.commonService.getTravelerTypes();
    this.hotelResponseList = this.hotelResponseService.hotelResponseList;
    this.selectedTravellerType = this.travelerTypes[0];
    this.currentUser = this.authService.currentUserValue;
    this.clearFilter();
    this.getUnfilteredResult();
    this.noReviewText = AppSettings.NO_REVIEW;
    this.isMobile = this.deviceService.isMobile();
    this.templateService.getTemplates()
      .subscribe((templates: TemplateModel[]) => {
        this.templates = templates;
        this.selectedTemplate = new TemplateModel();
      });
    this.maxDate = moment();
    this.selected = {
      start: moment().add(-3, 'months'),
      end: moment()
    };
    this.isFremium = this.authService.isFremium();
  }

  loadComments(page: number) {
    this.page = page;
    if (this.shouldFilterResult()) {
      this.getFilteredReviews();
    } else {
      this.getUnfilteredResult();
    }
  }

  getFilteredReviews() {
    this.buildFilter();
    this.commentList$ = this.commentService.getCommentsByFilter(this.page - 1, this.pageSize, this.commentFilter);
    this.processComments();
    this.modalService.dismissAll();
  }

  private buildFilter() {
    if (this.selected.start != null) {
      const startDate = this.selected.start.format('DD-MM-YYYY');
      const endDate = this.selected.end.format('DD-MM-YYYY');
      this.commentFilter.startDate = startDate;
      this.commentFilter.endDate = endDate;
    }
  }

  getUnfilteredResult() {
    this.commentList$ = this.commentService.getComments(this.page - 1, this.pageSize);
    this.processComments();
  }

  processComments() {
    this.commentList$.subscribe((commentList: CommentModel[]) => {
      this.commentList = commentList['content'];
      this.commentList.forEach(comment => comment.ratingOverFive = comment.rating / 2);
      this.totalElements = commentList['totalElements'];
      this.totalPages = Math.ceil(this.totalElements / this.pageSize);
      this.selectedItem = this.commentList[0];
      this.cdr.detectChanges();
    });
  }

  export() {
    if (this.shouldFilterResult()) {
      this.buildFilter();
      this.commentService.exportCommentsByFilter(this.commentFilter).subscribe((byteArray: Uint8Array) => {
        const blob = new Blob([byteArray]);
        const date = new Date().toISOString().slice(0, 10);
        FileSaver.saveAs(blob, 'ReviewExport_' + date + '.xlsx');
      });
    } else {
      this.commentService.exportComments().subscribe((byteArray: Uint8Array) => {
        const blob = new Blob([byteArray]);
        const date = new Date().toISOString().slice(0, 10);
        FileSaver.saveAs(blob, 'ReviewExport_' + date + '.xlsx');
      });
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

  selectItem(comment: CommentModel, index: number) {
    this.selectedItem = comment;
    this.selectedIndex = index;
  }

  markAsStarred(selectedItem: CommentModel) {
    selectedItem.starred = !selectedItem.starred;
    this.commentService.updateComment(selectedItem.id, selectedItem)
      .subscribe((commentModel: CommentModel) => {
      });
  }

  translate(selectedItem: CommentModel) {
    if (!this.isFremium) {
      this.commentService.getTranslatedComment(selectedItem.id)
        .subscribe((translatedComment: CommentModel) => {
          this.selectedItem = translatedComment;
        });
    } else {
      this.router.navigate(['pricing/premium']);
    }
  }

  changeFilteredChannel(i: number) {
    this.filteredChannel = [];
    if (this.commentSources) {
      this.commentSources[i].checked = !this.commentSources[i].checked;
      this.commentSources.forEach(item => {
        if (item.checked) {
          this.filteredChannel.push(item.name);
        }
      });
    }
    this.commentFilter.channels = this.filteredChannel;
  }

  clearFilter() {
    this.filteredChannel = [];
    this.commentSources.forEach(source => source.checked = true);
    this.commentFilter = new CommentFilterModel();
    this.commentFilter.minRating = 0;
    this.commentFilter.maxRating = 10;
    this.commentFilter.starred = false;
    let allText = '';
    this.translateService.get('GENERAL.ALL')
      .subscribe(text => {
        allText = text;
      });
    this.selectedTravellerType = {
      name: allText,
      value: 'ALL'
    };
    this.page = 1;
    if (this.selected != null) {
      this.selected = null;
    }
  }

  shouldFilterResult() {
    return (this.commentFilter.channels != null && this.commentFilter.channels.length > 0) ||
      (this.commentFilter.startDate != null && this.commentFilter.endDate != null) ||
      (this.commentFilter.minRating !== 0 || this.commentFilter.maxRating !== 10) ||
      this.commentFilter.travellerType !== 'ALL' ||
      this.commentFilter.starred;
  }

  selectTemplate(template: TemplateModel) {
    this.selectedTemplate = template;
    let content = this.selectedTemplate.content;
    content = content.replace(/--author-name--/g, this.selectedItem.author);
    content = content.replace(/--hotel-name--/g, this.currentUser.hotelName);
    this.selectedTemplate.content = content;
  }

  selectTravellerType(travellerType) {
    this.selectedTravellerType = travellerType;
    this.commentFilter.travellerType = travellerType.value;
  }

  copyAndGo($event: IClipboardResponse) {
    this.hotelResponseService.goToReply(this.selectedItem);
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

  openFilterModal(content) {
    this.modalService.open(content, {size: 'xl', ariaLabelledBy: 'modal-basic-title', scrollable: true, centered: true})
      .result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

  open(content) {
    this.modalService.open(content, {size: 'xl', ariaLabelledBy: 'modal-basic-title', scrollable: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

  openTaskModal(content) {
    this.task.employee = null;
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

  openReplyPopup(answer: TemplateRef<any>) {
    this.selectedTemplate = new TemplateModel();
    this.translateService.get('GENERAL.SELECT_TEMPLATE')
      .subscribe(title => {
        this.selectedTemplate.title = title;
      });
    this.newTemplate = new TemplateModel();
    this.modalService.open(answer, {
      keyboard: false, backdrop: 'static',
      size: 'xl', ariaLabelledBy: 'modal-basic-title', scrollable: true
    }).result.then((result) => {
    }, (reason) => {
    });
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

  addNewEmployee() {
    this.modalService.dismissAll();
    this.router.navigateByUrl('/employee');
  }
}
