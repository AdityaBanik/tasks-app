import { Pipe, PipeTransform } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from '../services/tasks.service';

@Pipe({
  name: 'filterTasks'
})
export class FilterTasksPipe implements PipeTransform {
  transform(dataSource: MatTableDataSource<Task>, filter: string): MatTableDataSource<Task> {
    const taskList = dataSource.data;
    switch (filter) {
      case 'personal':
        return new MatTableDataSource(taskList.filter(task => !task.isGlobal));
      case 'leader':
        return new MatTableDataSource(taskList.filter(task => task.isLeader));
      case 'others':
        return new MatTableDataSource(taskList.filter(task => !task.isLeader && task.isGlobal));
      default:
        return dataSource;
    }
  }
}