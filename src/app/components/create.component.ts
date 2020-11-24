import { Component, OnInit, ViewChild } from '@angular/core';
import { TodoComponent } from './todo.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  @ViewChild('myTodo')
  todoRef: TodoComponent;

  constructor() { }

  ngOnInit(): void {
  }

  addTodo(): void {
    console.info('=> addTodo: ', this.todoRef.todo);
    this.todoRef.addTask();
  }

}
