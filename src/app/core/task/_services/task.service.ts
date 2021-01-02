import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {TaskModel} from '../_models/task.model';
import {TaskFilterModel} from '../_models/task-filter.model';
import {TaskStatsModel} from '../_models/task-stats.model';
import {TaskEmployeeModel} from '../_models/task-employee.model';

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

  remindTask(task: TaskModel): Observable<TaskModel> {
    return this.http.post<TaskModel>(API_TASK_URL + '/reminder', task)
      .pipe(map(result => {
        return result;
      }));
  }

  getTasks(page: number, pageSize: number): Observable<TaskModel[]> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('size', String(pageSize));
    return this.http.get<TaskModel[]>(API_TASK_URL, {params: params});
  }

  getTaskStats(): Observable<TaskStatsModel> {
    return this.http.get<TaskStatsModel>(API_TASK_URL + '/stats');
  }

  getEmployeeTaskCounts(): Observable<TaskEmployeeModel[]> {
    return this.http.get<TaskEmployeeModel[]>(API_TASK_URL + '/employees');
  }

  getTasksByFilter(page: number, pageSize: number, filter: TaskFilterModel): Observable<TaskModel[]> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('size', String(pageSize));
    return this.http.post<TaskModel[]>(API_TASK_URL + '/filter', filter, {params: params});
  }
}
