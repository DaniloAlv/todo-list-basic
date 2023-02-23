import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  tasks: Todo[];

  constructor(private todoService: TodoService) {
    this.tasks = []
  }

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks() {
    this.todoService.getTasks()
      .subscribe((tasks: Todo[]) => {
        this.tasks = tasks
      })
  }

  newTask(nameTask: HTMLInputElement) {
    if (nameTask.value) {
      this.todoService.createTask({
        id: 0,
        isDone: false,
        description: nameTask.value
      }).subscribe((t: any) => {
        console.log(t)
        this.getAllTasks()
      })

      nameTask.value = "";
    }
  }

  updateTask(task: Todo) {
    task.isDone = !task.isDone;
    this.todoService.updateTask(task)
      .subscribe(todo => {
        console.log(todo)
        this.getAllTasks()
      })
  }

  deleteTask(id: number) {
    this.todoService.removeTask(id)
      .subscribe(() => this.getAllTasks())
  }

}
