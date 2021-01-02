import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TaskService} from '../../../core/task/_services/task.service';
import {ActivatedRoute} from '@angular/router';
import {TaskModel} from '../../../core/task/_models/task.model';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['../../../app.component.scss', './task-management.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskManagementComponent implements OnInit {
  taskModel: TaskModel;
  resultStatuses = [{
    title: 'Successfully Completed',
    value: 'SUCCESSFULLYCOMPLETED'
  }, {
    title: 'Cannot be completed',
    value: 'CANNOTBECOMPLETED'
  }, {
    title: 'Will be Considered Later',
    value: 'WILLBECONSIDEREDLATER'
  }];
  selectedStatus: { title: string; value: string };

  constructor(private route: ActivatedRoute,
              private taskService: TaskService,
              private toastr: ToastrService,
              private modalService: NgbModal,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.taskService.getTaskByUUID(id)
      .subscribe((taskModel: TaskModel) => {
        this.taskModel = taskModel;
        this.selectedStatus = this.resultStatuses[0];
        this.taskModel.resultStatus = this.selectedStatus.value;
        this.cdr.detectChanges();
      });
  }

  finish(taskModel: TaskModel) {
  }

  selectStatus(resultStatus: { title: string; value: string }) {
    this.selectedStatus = resultStatus;
    this.taskModel.resultStatus = this.selectedStatus.value;
  }

  finalize() {
    this.taskModel.endDate = new Date();
    this.taskService.saveTasks(this.taskModel)
      .subscribe((saved: TaskModel) => {
        this.toastr.success('Task closed successfully');
        this.modalService.dismissAll();
        this.cdr.detectChanges();
      });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', scrollable: true}).result.then((result) => {
    }, (reason) => {
    });
  }
}
