import {EmployeeModel} from '../../employee/_models/employee.model';
import {CommentModel} from '../../inbox/_models/comment.model';

export class TaskModel {
  id: number;
  employee: EmployeeModel;
  comment: CommentModel;
  description: string;
}
