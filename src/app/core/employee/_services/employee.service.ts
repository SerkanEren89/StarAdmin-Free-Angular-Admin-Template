import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EmployeeModel} from '../_models/employee.model';

const API_EMPLOYEES_URL = 'employees';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient) {
  }

  getAllEmployees(): Observable<EmployeeModel[]> {
    return this.http.get<EmployeeModel[]>(API_EMPLOYEES_URL);
  }

  getEmployees(page: number, pageSize: number): Observable<EmployeeModel[]> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('size', String(pageSize));
    return this.http.get<EmployeeModel[]>(API_EMPLOYEES_URL + '/paged', {params: params});
  }

  saveEmployee(employeeModel: EmployeeModel): Observable<EmployeeModel> {
    return this.http.post<EmployeeModel>(API_EMPLOYEES_URL, employeeModel);
  }

  deleteEmployee(employeeModel: EmployeeModel): Observable<boolean> {
    return this.http.delete<boolean>(API_EMPLOYEES_URL + '/' + employeeModel.id);
  }
}
