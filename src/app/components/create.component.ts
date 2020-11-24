import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TodoDatabase } from '../todo.database';
import { TodoComponent } from './todo.component';
import { v4 as uuidv4 } from "uuid";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  @ViewChild('myTodo')
  todoRef: TodoComponent;

  constructor(private todoDB: TodoDatabase, private router: Router) { }

  ngOnInit(): void {
  }

  async addTodo() {
    console.info('=> addTodo: ', this.todoRef.todo);

    // generate a new id for todo
    const id = uuidv4().toString().substring(0, 8);
    // get the new todo from the form
    const todo = this.todoRef.todo;
    // assign the new id to the new todo
    todo.id = id;

    // save this document to the db
    await this.todoDB.addTodo(todo);

    this.router.navigate(['/']);
  }

}
