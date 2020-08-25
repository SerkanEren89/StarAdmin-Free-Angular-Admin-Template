import {ChangeDetectorRef, Component, ViewEncapsulation} from "@angular/core";
import {TaskService} from "../../core/task/_services/task.service";
import {Observable} from "rxjs";
import {TaskModel} from "../../core/task/_models/task.model";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskComponent {
  reportedTaskList$: Observable<TaskModel[]>;
  reportedTaskList: TaskModel[];
  assignedTaskList$: Observable<TaskModel[]>;
  assignedTaskList: TaskModel[];

  constructor(private taskService: TaskService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.reportedTaskList$ = this.taskService.getReportedTaskList();
    this.reportedTaskList$.subscribe((reportedTaskList: TaskModel[]) => {
      this.reportedTaskList = reportedTaskList;
      this.cdr.detectChanges();
    });

    this.assignedTaskList$ = this.taskService.getAssignedTaskList();
    this.assignedTaskList$.subscribe((assignedTaskList: TaskModel[]) => {
      this.assignedTaskList = assignedTaskList;
      this.cdr.detectChanges();
    });
  }
}
