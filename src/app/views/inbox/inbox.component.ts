import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from "@angular/core";
import {CommentService} from "../../core/inbox/_services/comment.service";
import {Observable} from "rxjs";
import {CommentModel} from "../../core/inbox/_models/comment.model";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';
import {TaskModel} from "../../core/inbox/_models/task.model";

const assigneeList = ['Serkan', 'Fatih', 'Melih', 'Safa', 'Oğuzhan', 'Falcao', 'Muslera',
  'Hagi', 'Bülent', 'Popescu', 'Taffarel', 'Mondragon'];
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
  selectedIndex: number = 0;
  closeResult = '';
  public task: TaskModel = new TaskModel();

  constructor(private commentService: CommentService,
              private modalService: NgbModal,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.commentList$ = this.commentService.getCommentList();
    this.commentList$.subscribe((commentList: CommentModel[]) => {
      commentList.forEach(comment => comment.starRating = comment.rating / 2);
      this.commentList = commentList;
      this.selectedItem = this.commentList[0];
      this.cdr.detectChanges();
    });
  }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length > 1 ? []
        : assigneeList.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

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
}
