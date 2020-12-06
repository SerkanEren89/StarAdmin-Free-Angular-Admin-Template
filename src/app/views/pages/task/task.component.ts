import {ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {TaskService} from '../../../core/task/_services/task.service';
import {TaskModel} from '../../../core/task/_models/task.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['../../../app.component.scss', './task.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskComponent implements OnInit {
  @ViewChild('taskTable') elRef;
  tasks: TaskModel[] = [];
  selectedTask: TaskModel;
  totalElements = 0;
  pageSize = 10;
  page = 1;

  constructor(private taskService: TaskService,
              private modalService: NgbModal,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.getAllTasks();
  }

  private getAllTasks() {
    this.taskService.getTasks(this.page - 1, this.pageSize).subscribe((tasks: TaskModel[]) => {
      this.tasks = tasks['content'];
      this.totalElements = tasks['totalElements'];
      this.cdr.detectChanges();
      this.addLabelTag();
    });
  }

  addLabelTag() {
    if (this.elRef != null) {
      const tableEl = this.elRef.nativeElement;
      const thEls = tableEl.querySelectorAll('thead th');
      const tdLabels = Array.from(thEls).map((el: any) => el.innerText);
      tableEl.querySelectorAll('tbody tr').forEach(tr => {
        Array.from(tr.children).forEach(
          (td: any, ndx) => td.setAttribute('label', tdLabels[ndx])
        );
      });
    }
  }

  openDetailPopup(task: TaskModel, contentReviewDetail: TemplateRef<any>) {
    this.selectedTask = task;
    this.modalService.open(contentReviewDetail, {ariaLabelledBy: 'modal-basic-title', scrollable: true}).result.then((result) => {
    }, (reason) => {
    });
  }

  loadTasks(page: number) {
    this.page = page;
    this.getAllTasks();
  }
}
