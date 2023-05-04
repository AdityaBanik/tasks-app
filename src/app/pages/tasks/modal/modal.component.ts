import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasksService,Task } from 'src/app/services/tasks.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tasksService: TasksService,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.taskForm = this.fb.group({
      text: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const task: Task = {
      text: this.taskForm.get('text')?.value,
      isGlobal: false,
      isLeader: false,
      creator: 'Me',
      isCompleted: false,
      start: this.taskForm.get('start')?.value,
      end: this.taskForm.get('end')?.value
    };
    this.tasksService.addTask(task);
    this.dialogRef.close();
  }
}