import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiURL = 'http://localhost:3000/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiURL);
  }
  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiURL}/${id}`);
  }
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiURL, task);
  }
  updateTask(id: string, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiURL}/${id}`, task);
  }
  toggleTask(id: string): Observable<any> {
    return this.http.put<any>(`${this.apiURL}/${id}/toggle`, {});
  }
  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
