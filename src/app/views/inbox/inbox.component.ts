import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CommentService} from '../../core/inbox/_services/comment.service';
import {Observable} from 'rxjs';
import {CommentModel} from '../../core/inbox/_models/comment.model';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';
import {TaskModel} from '../../core/inbox/_models/task.model';
import {TaskService} from '../../core/task/_services/task.service';
import {EmployeeModel} from '../../core/task/_models/employee.model';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['../../app.component.scss', './inbox.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InboxComponent implements OnInit {
  commentList$: Observable<CommentModel[]>;
  commentList: CommentModel[];
  selectedItem: CommentModel;
  employeeList$: Observable<EmployeeModel[]>;
  employeeList: EmployeeModel[];
  selectedIndex = 0;
  pageSize = 10;
  page = 1;
  totalPage;
  closeResult = '';
  public task: TaskModel = new TaskModel();
  resultFormatter = (result: EmployeeModel) => result.name + ' ' + result.surname;
  inputFormatter =  (x: EmployeeModel) => x.name + ' ' + x.surname;

  constructor(private commentService: CommentService,
              private taskService: TaskService,
              private modalService: NgbModal,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.commentList$ = this.commentService.getComments(this.page - 1, this.pageSize);
    this.processComments();
    this.employeeList$ = this.taskService.getEmployeeList();
    this.employeeList$.subscribe((employeeList: EmployeeModel[]) => {
      this.employeeList = employeeList;
      this.cdr.detectChanges();
    });
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
      this.totalPage = commentList['totalPages'];
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

  open(content) {
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
}
