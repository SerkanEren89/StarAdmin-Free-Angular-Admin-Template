import {EmployeeModel} from "../../task/_models/employee.model";

export class TaskModel {
  id: number;
  assignee: EmployeeModel;
  description: string
}
