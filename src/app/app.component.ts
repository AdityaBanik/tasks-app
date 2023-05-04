import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TasksService } from './services/tasks.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  activeLink: string = '';
  personalTasks? : number;
  globalTasks? : number;
  constructor(private router: Router,private tasksService: TasksService) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activeLink = event.url;
      }
    });
    // Manually set active link on initial page load
    this.activeLink = this.router.url;

    this.tasksService.getTaskList().subscribe(tasks => {
      this.personalTasks = tasks.filter(task => !task.isGlobal && !task.isCompleted).length;
      this.globalTasks = tasks.filter(task => task.isGlobal && !task.isCompleted).length;
    });
  }

  
}