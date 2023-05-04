import { Component, OnInit } from '@angular/core';
import { TasksService,Task } from 'src/app/services/tasks.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  globalTasks: Task[] = [];
  personalTasks: Task[] = [];
  leaderTasks: Task[] = [];

  constructor(private tasksService: TasksService) { }

  ngOnInit(): void {
    this.tasksService.getTaskList().subscribe((taskList) => {
      // Filter tasks by type
      this.globalTasks = taskList.filter(task => task.isGlobal);
      this.personalTasks = taskList.filter(task => !task.isGlobal);
      this.leaderTasks = taskList.filter(task => task.isLeader);
    });
  }

}