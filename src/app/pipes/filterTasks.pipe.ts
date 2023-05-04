import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Task } from '../services/tasks.service';

@Pipe({
  name: 'filterTasks'
})
@Injectable()
export class FilterTasksPipe implements PipeTransform {
  transform(taskList: Task[], filter: string): Task[] {
    switch (filter) {
      case 'personal':
        return taskList.filter(task => !task.isGlobal);
      case 'leader':
        return taskList.filter(task => task.isLeader);
      case 'others':
        return taskList.filter(task => !task.isLeader && task.isGlobal);
      default:
        return taskList;
    }
  }
}