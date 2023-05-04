import { Component, OnInit, ViewChild } from '@angular/core';
import { Task, TasksService } from 'src/app/services/tasks.service';

import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  @ViewChild(MatSort) sort?: MatSort;

  taskList: Task[] = [];
  filter: string = 'all';

  displayedColumns: string[] = ['completed', 'text', 'creator', 'start', 'end'];

  constructor(private tasksService: TasksService) { }

  ngOnInit(): void {
    this.tasksService.getTaskList().subscribe((taskList) => {
      this.taskList = taskList;
    });
  }

  // ngAfterViewInit() {
  //   this.taskList.sort = this.sort;
  // }

  updateTaskChecked(index: number, checked: boolean) {
    this.tasksService.updateTaskChecked(index, checked);
  }
}



