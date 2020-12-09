import {EmployeeModel} from '../../employee/_models/employee.model';

export class TaskFilterModel {
  employee: EmployeeModel;
  statusList: string[];
  startDate: string;
  endDate: string;
}
