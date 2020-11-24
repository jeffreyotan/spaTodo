import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoComponent } from './todo.component';
import { TodoDatabase } from '../todo.database';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {

  @ViewChild('myTodo')
  todoRef: TodoComponent;

  todoId: string = '';

  constructor(private activatedRoute: ActivatedRoute, private todoDB: TodoDatabase) { }

  async ngOnInit() {
    this.todoId = this.activatedRoute.snapshot.params['todoId'];

    const todo = await this.todoDB.getTodoDetail(this.todoId);
    this.todoRef.todo = todo;
  }

}
