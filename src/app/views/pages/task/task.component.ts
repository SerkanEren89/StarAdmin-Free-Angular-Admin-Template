import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TaskService} from '../../../core/task/_services/task.service';
import {Observable} from 'rxjs';
import {TaskMockModel} from '../../../core/task/_models/task-mock.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['../../../app.component.scss', './task.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskComponent implements OnInit {
  reportedTaskList$: Observable<TaskMockModel[]>;
  reportedTaskList: TaskMockModel[];
  assignedTaskList$: Observable<TaskMockModel[]>;
  assignedTaskList: TaskMockModel[];

  constructor(private taskService: TaskService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.reportedTaskList$ = this.taskService.getReportedTaskList();
    this.reportedTaskList$.subscribe((reportedTaskList: TaskMockModel[]) => {
      this.reportedTaskList = reportedTaskList;
      this.cdr.detectChanges();
    });

    this.assignedTaskList$ = this.taskService.getAssignedTaskList();
    this.assignedTaskList$.subscribe((assignedTaskList: TaskMockModel[]) => {
      this.assignedTaskList = assignedTaskList;
      this.cdr.detectChanges();
    });
  }
}
