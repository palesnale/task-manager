import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  standalone: true,
  selector: 'app-task-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss'
})
export class TaskForm {
  taskForm!: FormGroup;
  isEdit = false;
  taskId!: string;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      category: [''],
      status: ['Pending', Validators.required]
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if(id) {
        this.isEdit = true;
        this.taskId = id;
        this.taskService.getTaskById(id).subscribe(task => {
          this.taskForm.patchValue(task);
        });
      }
    });
  }

  onSubmit() {
    console.log("submitting...");
    if(this.taskForm.invalid)
      return;
    
    const formValue = this.taskForm.value;

    if(this.isEdit) {
      this.taskService.updateTask(this.taskId, formValue).subscribe(() =>{
        this.router.navigate(['/']);
      });
    }
    else {
      console.log("adding task...");
      this.taskService.addTask(formValue).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
