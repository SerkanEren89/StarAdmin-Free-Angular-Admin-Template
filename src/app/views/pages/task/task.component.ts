import {ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {TaskService} from '../../../core/task/_services/task.service';
import {TaskModel} from '../../../core/task/_models/task.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EmployeeModel} from '../../../core/employee/_models/employee.model';
import {merge, Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {EmployeeService} from '../../../core/employee/_services/employee.service';
import {TaskFilterModel} from '../../../core/task/_models/task-filter.model';
import moment from 'moment';
import {TableService} from '../../../core/general/_services/table.service';
import {TaskStatsModel} from '../../../core/task/_models/task-stats.model';
import {ToastrService} from 'ngx-toastr';
import {CommonService} from '../../../core/general/_services/common.service';
import {TaskEmployeeModel} from '../../../core/task/_models/task-employee.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['../../../app.component.scss', './task.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskComponent implements OnInit {
  @ViewChild('taskTable') elRef;
  focus$ = new Subject<string>();
  tasks$: Observable<TaskModel[]>;
  tasks: TaskModel[] = [];
  taskStats: TaskStatsModel;
  employeeList: EmployeeModel[];
  selectedTask: TaskModel;
  newTask: TaskModel = new TaskModel();
  taskFilter: TaskFilterModel = new TaskFilterModel();
  selected: any;
  maxDate: any;
  filteredStatus = [];
  totalElements = 0;
  pageSize = 10;
  page = 1;
  statuses;
  employees: TaskEmployeeModel[];
  reminderFlow = false;
  remindEmail = true;
  remindWhatsapp = true;
  resultFormatter = (result: EmployeeModel) => result.firstName + ' ' + result.lastName;
  inputFormatter = (x: EmployeeModel) => x.firstName + ' ' + x.lastName;

  constructor(private taskService: TaskService,
              private employeeService: EmployeeService,
              private toastr: ToastrService,
              private modalService: NgbModal,
              private tableService: TableService,
              private commonService: CommonService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.statuses = this.commonService.getTaskFilterStatus();
    this.getAllTasks();
    this.taskService.getTaskStats()
      .subscribe((taskStats: TaskStatsModel) => {
        this.taskStats = taskStats;
      });
    this.taskService.getEmployeeTaskCounts()
      .subscribe((employees: TaskEmployeeModel[]) => {
        this.employees = employees;
      });
    this.selected = {
      start: moment().add(-1, 'months'),
      end: moment()
    };
    this.maxDate = moment();
  }

  private getAllTasks() {
    this.taskService.getTasks(this.page - 1, this.pageSize).subscribe((tasks: TaskModel[]) => {
      this.tasks = tasks['content'];
      this.totalElements = tasks['totalElements'];
      this.cdr.detectChanges();
      this.tableService.addLabelTag(this.elRef);
    });
  }

  openDetailPopup(task: TaskModel, contentReviewDetail: TemplateRef<any>) {
    this.selectedTask = task;
    this.reminderFlow = false;
    this.modalService.open(contentReviewDetail, {
      size: 'xl',
      ariaLabelledBy: 'modal-basic-title', scrollable: true
    }).result.then((result) => {
    }, (reason) => {
    });
  }

  loadTasks(page: number) {
    this.page = page;
    this.getAllTasks();
    if (this.shouldFilterResult()) {
      this.getFilteredTasks();
    } else {
      this.getUnFilteredTasks();
    }
  }

  getFilteredTasks() {
    this.buildFilter();
    this.tasks$ = this.taskService.getTasksByFilter(this.page - 1, this.pageSize, this.taskFilter);
    this.processTasks();
    this.modalService.dismissAll();
  }

  getUnFilteredTasks() {
    this.tasks$ = this.taskService.getTasks(this.page - 1, this.pageSize);
    this.processTasks();
  }

  shouldFilterResult() {
    return (this.taskFilter.statusList != null && this.taskFilter.statusList.length > 0) ||
      (this.taskFilter.startDate != null && this.taskFilter.endDate != null) ||
      (this.taskFilter.employee !== null);
  }

  private buildFilter() {
    if (this.selected != null && this.selected.start != null) {
      const startDate = this.selected.start.format('DD-MM-YYYY');
      const endDate = this.selected.end.format('DD-MM-YYYY');
      this.taskFilter.startDate = startDate;
      this.taskFilter.endDate = endDate;
    }
  }

  clearFilter() {
    this.filteredStatus = [];
    this.statuses.forEach(status => status.checked = false);
    this.taskFilter = new TaskFilterModel();
    this.page = 1;
    if (this.selected != null) {
      this.selected = null;
    }
  }

  openTaskModal(content) {
    this.taskFilter = new TaskFilterModel();
    this.newTask = new TaskModel();
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

  changeFilteredStatus(i: number) {
    if (this.statuses) {
      this.statuses[i].checked = !this.statuses[i].checked;
      if (this.statuses[i].checked) {
        this.filteredStatus.push(this.statuses[i].name);
      }
    }
    this.taskFilter.statusList = this.filteredStatus;
  }

  processTasks() {
    this.tasks$.subscribe((tasks: TaskModel[]) => {
      this.tasks = tasks['content'];
      this.totalElements = tasks['totalElements'];
      this.selectedTask = this.tasks[0];
      this.cdr.detectChanges();
    });
  }

  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$).pipe(
      map(term => {
        if (term.length < 1) {
          return this.employeeList;
        }
        const searchResults = this.employeeList
          .filter(v => v.firstName.toLowerCase().indexOf(term.toLowerCase()) > -1)
          .slice(0, 10);
        if (searchResults.length > 0) {
          return searchResults;
        } else {
          return this.employeeList;
        }
      })
    );
  };

  remindTask() {
    if (this.reminderFlow) {
      if (this.remindEmail && this.selectedTask.employee.email != null) {
        this.taskService.remindTask(this.selectedTask)
          .subscribe((saved: TaskModel) => {
            this.toastr.success('Reminder sent successfully');
            this.cdr.detectChanges();
          });
      }
      if (this.remindWhatsapp && this.selectedTask.employee.phoneNumber != null) {
        let link = 'https://wa.me/' + this.selectedTask.employee.phoneNumber;
        const text = 'Hotel Uplift: ' + this.selectedTask.creator.firstName + ' ' + this.selectedTask.creator.lastName +
          ' sends you a reminder for your assignment! Click the link to see detail\n'
          + 'https://app.hoteluplift.com/task-management/' + this.selectedTask.uuid;
        link = link + '?text=' + encodeURIComponent(text);
        window.open(link, '_blank');
      }
      this.modalService.dismissAll();
    } else {
      this.reminderFlow = true;
      this.remindEmail = true;
      this.remindWhatsapp = true;
    }
  }

  filterByStatus(status: string) {
    this.taskFilter = new TaskFilterModel();
    this.taskFilter.statusList = [];
    const selectedStatus = this.statuses.filter(item => item.name === status);
    if (selectedStatus.length > 0) {
      this.taskFilter.statusList.push(selectedStatus[0].name);
      this.getFilteredTasks();
    } else {
      this.getAllTasks();
    }
  }

  filterByEmployee(id: number) {
    this.taskFilter = new TaskFilterModel();
    this.taskFilter.employee = new EmployeeModel();
    this.taskFilter.employee.id = id;
    this.tasks$ = this.taskService.getTasksByFilter(this.page - 1, this.pageSize, this.taskFilter);
    this.processTasks();
  }

  createTask() {
    if (this.newTask.employee === null) {
      this.toastr.error('Please add employee to create task');
      return;
    }
    if (this.newTask.description === null) {
      this.toastr.error('Please add note to create task');
      return;
    }
    this.taskService.saveTasks(this.newTask)
      .subscribe((createdTask: TaskModel) => {
        this.toastr.success('Task created successfully');
        this.page = 1;
        this.getUnFilteredTasks();
        this.cdr.detectChanges();
      });
  }
}
