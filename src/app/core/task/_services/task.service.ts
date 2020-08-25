import {Injectable} from "@angular/core";
import {TaskModel} from "../_models/task.model";
import {Observable, of} from "rxjs";
import {CommentModel} from "../../inbox/_models/comment.model";

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
}
