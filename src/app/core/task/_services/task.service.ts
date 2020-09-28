import {Injectable} from '@angular/core';
import {TaskModel} from '../_models/task.model';
import {Observable, of} from 'rxjs';
import {EmployeeModel} from '../_models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  getReportedTaskList(): Observable<TaskModel[]> {
    let tasks: TaskModel[] = new Array<TaskModel>();
    let task1: TaskModel  = new TaskModel();
    task1.id = 1;
    task1.assignee = 'Fatih Buldum';
    task1.reporter = 'Serkan Eren';
    task1.reviewDate = new Date();
    task1.content = 'Restourantta sosyal mesafeye uyulmuyordu.';
    task1.reporterQuestion = 'Fatih Bey nedir son durumlar?';
    task1.source = 'Booking';
    task1.status = 'Waiting';
    tasks.push(task1);

    let task2: TaskModel  = new TaskModel();
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

  getAssignedTaskList(): Observable<TaskModel[]> {
    let tasks: TaskModel[] = new Array<TaskModel>();
    let task1: TaskModel  = new TaskModel();
    task1.id = 1;
    task1.assignee = 'Serkan Eren';
    task1.reporter = 'Fatih Buldum';
    task1.reviewDate = new Date();
    task1.content = 'Restourantta sosyal mesafeye uyulmuyordu.';
    task1.reporterQuestion = 'Fatih Bey nedir son durumlar?';
    task1.source = 'Booking';
    task1.status = 'Completed';
    tasks.push(task1);

    let task2: TaskModel  = new TaskModel();
    task2.id = 1;
    task2.assignee = 'Serkan Eren';
    task2.reporter = 'Melih Safa Turan';
    task2.reviewDate = new Date();
    task2.content = 'Havuz hijyeni konusunda problemler vardı.';
    task2.reporterQuestion = 'Melih bey bu konuya özen gösterelim ?';
    task2.source = 'Booking';
    task2.status = 'Completed';

    tasks.push(task2);
    return of(tasks);
  }

  getEmployeeList(): Observable<EmployeeModel[]> {
    let employeeModels: EmployeeModel[] = new Array<EmployeeModel>();
    let employee1: EmployeeModel  = new EmployeeModel();
    employee1.id = 1;
    employee1.name = 'Serkan';
    employee1.surname = 'Eren';
    employeeModels.push(employee1);

    let employee2: EmployeeModel  = new EmployeeModel();
    employee2.id = 2;
    employee2.name = 'George';
    employee2.surname = 'Hagi';
    employeeModels.push(employee2);

    let employee3: EmployeeModel  = new EmployeeModel();
    employee3.id = 3;
    employee3.name = 'Claudio';
    employee3.surname = 'Taffarel';
    employeeModels.push(employee3);

    let employee4: EmployeeModel  = new EmployeeModel();
    employee4.id = 4;
    employee4.name = 'Okan';
    employee4.surname = 'Buruk';
    employeeModels.push(employee4);

    let employee5: EmployeeModel  = new EmployeeModel();
    employee5.id = 5;
    employee5.name = 'Emre';
    employee5.surname = 'Belezoğlu';
    employeeModels.push(employee5);

    let employee6: EmployeeModel  = new EmployeeModel();
    employee6.id = 6;
    employee6.name = 'Hakan';
    employee6.surname = 'Ünsal';
    employeeModels.push(employee6);
    return of(employeeModels);
  }
}
