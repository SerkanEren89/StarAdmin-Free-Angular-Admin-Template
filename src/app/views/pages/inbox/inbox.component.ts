import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CommentService} from '../../../core/inbox/_services/comment.service';
import {Observable} from 'rxjs';
import {CommentModel} from '../../../core/inbox/_models/comment.model';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';
import {TaskModel} from '../../../core/inbox/_models/task.model';
import {TaskService} from '../../../core/task/_services/task.service';
import {EmployeeModel} from '../../../core/task/_models/employee.model';
import {Moment} from 'moment';
import {Options} from '@angular-slider/ngx-slider';
import {CommentFilterModel} from '../../../core/inbox/_models/comment-filter.model';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['../../../app.component.scss', './inbox.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InboxComponent implements OnInit {
  commentList$: Observable<CommentModel[]>;
  commentList: CommentModel[];
  selectedItem: CommentModel;
  employeeList$: Observable<EmployeeModel[]>;
  employeeList: EmployeeModel[];
  selected: { start: Moment, end: Moment };
  commentFilter: CommentFilterModel;
  selectedIndex = 0;
  pageSize = 10;
  page = 1;
  totalElements;
  closeResult = '';
  filteredChannel = [];
  options: Options = {
    floor: 0,
    ceil: 10
  };
  commentSources = [{
    name: 'BOOKING',
    checked: false
  }, {
    name: 'HOTELSCOM',
    checked: false
  }, {
    name: 'TRIPADVISOR',
    checked: false
  }, {
    name: 'AGODA',
    checked: false
  }, {
    name: 'GOOGLE',
    checked: false
  }, {
    name: 'HOLIDAYCHECK',
    checked: false
  }, {
    name: 'OTELPUAN',
    checked: false
  }, {
    name: 'ODAMAX',
    checked: false
  }, {
    name: 'TATILSEPETI',
    checked: false
  }];
  public task: TaskModel = new TaskModel();
  resultFormatter = (result: EmployeeModel) => result.name + ' ' + result.surname;
  inputFormatter = (x: EmployeeModel) => x.name + ' ' + x.surname;

  constructor(private commentService: CommentService,
              private taskService: TaskService,
              private modalService: NgbModal,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.clearFilter();
    this.getUnfilteredResult();
    this.employeeList$ = this.taskService.getEmployeeList();
    this.employeeList$.subscribe((employeeList: EmployeeModel[]) => {
      this.employeeList = employeeList;
      this.cdr.detectChanges();
    });
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
    if (this.selected.start != null) {
      const startDate = this.selected.start.format('DD-MM-YYYY');
      const endDate = this.selected.end.format('DD-MM-YYYY');
      this.commentFilter.startDate = startDate;
      this.commentFilter.endDate = endDate;
    }
    this.commentList$ = this.commentService.getCommentsByFilter(this.page - 1, this.pageSize, this.commentFilter);
    this.processComments();
    this.modalService.dismissAll();
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
      this.selectedItem = this.commentList[0];
      this.cdr.detectChanges();
    });
  }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length > 1 ? []
        : this.employeeList.filter(
          v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

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
    this.commentService.getTranslatedComment(selectedItem.id)
      .subscribe((translatedComment: CommentModel) => {
        this.selectedItem = translatedComment;
      });
  }

  changeFilteredChannel(i: number) {
    if (this.commentSources) {
      this.commentSources[i].checked = !this.commentSources[i].checked;
      if (this.commentSources[i].checked) {
        this.filteredChannel.push(this.commentSources[i].name);
      }
    }
    this.commentFilter.channels = this.filteredChannel;
  }

  clearFilter() {
    this.filteredChannel = [];
    this.commentSources.forEach(source => source.checked = false);
    this.commentFilter = new CommentFilterModel();
    this.commentFilter.minRating = 0;
    this.commentFilter.maxRating = 10;
    this.commentFilter.starred = false;
    this.page = 1;
    if (this.selected != null) {
      this.selected = null;
    }
  }

  shouldFilterResult() {
    return (this.commentFilter.channels != null && this.commentFilter.channels.length > 0) ||
      (this.commentFilter.startDate != null && this.commentFilter.endDate != null) ||
      this.commentFilter.starred;
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', scrollable: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openFilterModal(content) {
    this.modalService.open(content, {size: 'lg', ariaLabelledBy: 'modal-basic-title', scrollable: true}).result.then((result) => {
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
}
