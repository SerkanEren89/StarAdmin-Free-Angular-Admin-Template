import {Injectable} from '@angular/core';
import {TaskMockModel} from '../_models/task-mock.model';
import {Observable, of} from 'rxjs';
import {EmployeeModel} from '../_models/employee.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {TaskModel} from '../_models/task.model';

const API_TASK_URL = 'tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {
  }

  saveTasks(task: TaskModel): Observable<TaskModel> {
    return this.http.post<TaskModel>(API_TASK_URL, task)
      .pipe(map(result => {
        return result;
      }));
  }

  getTaskByUUID(uuid: string): Observable<TaskModel> {
    return this.http.get<TaskModel>(API_TASK_URL + '/' + uuid);
  }

  getTasks(page: number, pageSize: number): Observable<TaskModel[]> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('size', String(pageSize));
    return this.http.get<TaskModel[]>(API_TASK_URL, {params: params});
  }

  getReportedTaskList(): Observable<TaskMockModel[]> {
    const tasks: TaskMockModel[] = new Array<TaskMockModel>();
    const task1: TaskMockModel = new TaskMockModel();
    task1.id = 1;
    task1.assignee = 'Fatih Buldum';
    task1.reporter = 'Serkan Eren';
    task1.reviewDate = new Date();
    task1.content = 'Restourantta sosyal mesafeye uyulmuyordu.';
    task1.reporterQuestion = 'Fatih Bey nedir son durumlar?';
    task1.source = 'Booking';
    task1.status = 'Waiting';
    tasks.push(task1);

    const task2: TaskMockModel = new TaskMockModel();
    task2.id = 1;
    task2.assignee = 'Melih Safa Turan';
    task2.reporter = 'Serkan Eren';
    task2.reviewDate = new Date();
    task2.content = 'Havuz hijyeni konusunda problemler vardı.';
    task2.reporterQuestion = 'Melih bey bu konuya özen gösterelim ?';
    task2.source = 'Booking';
    task2.status = 'Waiting';

    tasks.push(task2);
    return of(tasks);
  }

  getAssignedTaskList(): Observable<TaskMockModel[]> {
    const tasks: TaskMockModel[] = new Array<TaskMockModel>();
    const task1: TaskMockModel = new TaskMockModel();
    task1.id = 1;
    task1.assignee = 'Serkan Eren';
    task1.reporter = 'Fatih Buldum';
    task1.reviewDate = new Date();
    task1.content = 'Restourantta sosyal mesafeye uyulmuyordu.';
    task1.reporterQuestion = 'Fatih Bey nedir son durumlar?';
    task1.source = 'Booking';
    task1.status = 'Compconsted';
    tasks.push(task1);

    const task2: TaskMockModel = new TaskMockModel();
    task2.id = 1;
    task2.assignee = 'Serkan Eren';
    task2.reporter = 'Melih Safa Turan';
    task2.reviewDate = new Date();
    task2.content = 'Havuz hijyeni konusunda problemler vardı.';
    task2.reporterQuestion = 'Melih bey bu konuya özen gösterelim ?';
    task2.source = 'Booking';
    task2.status = 'Compconsted';

    tasks.push(task2);
    return of(tasks);
  }

  getEmployeeList(): Observable<EmployeeModel[]> {
    const employeeModels: EmployeeModel[] = new Array<EmployeeModel>();
    const employee1: EmployeeModel = new EmployeeModel();
    employee1.id = 1;
    employee1.name = 'Serkan';
    employee1.surname = 'Eren';
    employeeModels.push(employee1);

    const employee2: EmployeeModel = new EmployeeModel();
    employee2.id = 2;
    employee2.name = 'George';
    employee2.surname = 'Hagi';
    employeeModels.push(employee2);

    const employee3: EmployeeModel = new EmployeeModel();
    employee3.id = 3;
    employee3.name = 'Claudio';
    employee3.surname = 'Taffarel';
    employeeModels.push(employee3);

    const employee4: EmployeeModel = new EmployeeModel();
    employee4.id = 4;
    employee4.name = 'Okan';
    employee4.surname = 'Buruk';
    employeeModels.push(employee4);

    const employee5: EmployeeModel = new EmployeeModel();
    employee5.id = 5;
    employee5.name = 'Emre';
    employee5.surname = 'Belezoğlu';
    employeeModels.push(employee5);

    const employee6: EmployeeModel = new EmployeeModel();
    employee6.id = 6;
    employee6.name = 'Hakan';
    employee6.surname = 'Ünsal';
    employeeModels.push(employee6);
    return of(employeeModels);
  }
}
