import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Task, TasksService } from 'src/app/services/tasks.service';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;

  dataSource!: MatTableDataSource<Task>;
  displayedColumns: string[] = ['completed', 'text', 'creator', 'start', 'end'];

  filter: string = 'all'

  constructor(private tasksService: TasksService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.tasksService.getTaskList().subscribe((taskList) => {
      this.dataSource = new MatTableDataSource(taskList);
      this.dataSource.sort = this.sort;
    });
  }

 
  updateTaskChecked(index: number, checked: boolean) {
    this.tasksService.updateTaskChecked(index, checked);
  }


  openModal() {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Modal result: ${result}`);
    });
  }
}