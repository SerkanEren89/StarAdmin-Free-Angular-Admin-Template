import {EmployeeModel} from '../../employee/_models/employee.model';
import {CommentModel} from '../../inbox/_models/comment.model';
import {UserModel} from '../../auth/_models/user.model';

export class TaskModel {
  id: number;
  employee: EmployeeModel;
  comment: CommentModel;
  creator: UserModel;
  description: string;
  endDate: Date;
  creationDate: Date;
  taskStatus: string;
  uuid: string;
}
