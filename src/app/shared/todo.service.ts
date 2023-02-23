import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  baseUrl: string = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getTasks(): Observable<Todo[]>{
    return this.httpClient.get<Todo[]>(this.baseUrl);
  }

  createTask(task: Todo): Observable<Todo>{
    return this.httpClient.post<Todo>(this.baseUrl, task);
  }

  updateTask(task: Todo): Observable<Todo> {
    return this.httpClient.put<Todo>(`${this.baseUrl}/${task.id}`, task);
  }

  removeTask(id: number) {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }
}
