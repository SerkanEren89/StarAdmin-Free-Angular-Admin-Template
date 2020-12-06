import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TaskService} from '../../../core/task/_services/task.service';
import {ActivatedRoute} from '@angular/router';
import {TaskModel} from '../../../core/task/_models/task.model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['../../../app.component.scss', './task-management.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskManagementComponent implements OnInit {
  taskModel: TaskModel;

  constructor(private route: ActivatedRoute,
              private taskService: TaskService,
              private toastr: ToastrService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.taskService.getTaskByUUID(id)
      .subscribe((taskModel: TaskModel) => {
        this.taskModel = taskModel;
        this.cdr.detectChanges();
      });
  }

  finish(taskModel: TaskModel) {
    taskModel.endDate = new Date();
    this.taskService.saveTasks(taskModel)
      .subscribe((saved: TaskModel) => {
        this.toastr.success('Task finished with successfully');
        this.cdr.detectChanges();
      });
  }
}
