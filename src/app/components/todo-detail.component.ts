import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoComponent } from './todo.component';
import { TodoDatabase } from '../todo.database';
import { Todo } from "../models";

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {

  @ViewChild('myTodo')
  todoRef: TodoComponent;

  todoId: string = '';

  constructor(private activatedRoute: ActivatedRoute, private todoDB: TodoDatabase, private router: Router) { }

  async ngOnInit() {
    this.todoId = this.activatedRoute.snapshot.params['todoId'];

    const todo = await this.todoDB.getTodoDetail(this.todoId);
    this.todoRef.todo = todo;
  }

  async onUpdate() {
    const todo: Todo = this.todoRef.todo as Todo;

    await this.todoDB.addTodo(todo);

    this.router.navigate(['/']);
  }

  async onDelete() {
    const todo = this.todoRef.todo as Todo;
    const id = todo.id;

    await this.todoDB.deleteTodo(id);

    this.router.navigate(['/']);
  }

}
