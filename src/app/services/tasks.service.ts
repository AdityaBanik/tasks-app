import { Injectable} from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Task {
  text: string;
  isGlobal: boolean;
  isLeader: boolean;
  creator: string;
  isCompleted: boolean;
  start: string;
  end: string;
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private taskList: Task[] = [];

  private taskListSubject = new BehaviorSubject<Task[]>(this.taskList);

  constructor(private http: HttpClient) {
    this.http.get<any>('assets/tasks.json')
    .subscribe((data) => {
      this.taskList = data.tasks;
      this.taskListSubject.next(this.taskList);
    });
  }


  getTaskList(): Observable<Task[]> {
    // return the taskList as an observable
    return this.taskListSubject.asObservable();
  }

  addTask(task: Task) {
    this.taskList.push(task);
    this.taskListSubject.next(this.taskList);
  }

  updateTaskChecked(index: number, checked: boolean) {
    this.taskList[index].isCompleted = checked;
    this.taskListSubject.next(this.taskList);
  }
}