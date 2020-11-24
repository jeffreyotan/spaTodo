import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";

import { Todo } from '../models';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todoForm: FormGroup;
  tasksArray: FormArray;
  
  // getter-setter methods: when used TOGETHER, they are treated as an attribute and can be referenced directly
  @Input()
  get todo(): Todo {
    const t: Todo = this.todoForm.value as Todo;
    // t.tasks = t.tasks.map(v => {
    //   v.priority = parseInt(v.priority);
    //   return v;
    // });
    return t;
  }

  set todo(t: Todo) {
    // console.info('=> Setter todo: ', t);
    this.todoForm = this.createFormWithTodo(t);
    this.tasksArray = this.todoForm.get('tasks') as FormArray;
    // console.info('=> Setter tasksArray: ', this.tasksArray);
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.createForm();
    this.tasksArray = this.todoForm.get('tasks') as FormArray; // the 'as' keyword is used for casting
    this.addTask(); // we'll assume that we start out with at least one task FormGroup
  }

  private createForm(): FormGroup {
    return this.fb.group({
      id: this.fb.control('', [ Validators.required ]),
      title: this.fb.control('', [ Validators.required ]),
      tasks: this.fb.array([])
    });

    // an alternative implementation
    // this.tasksArray = this.fb.array([]);
    // this.fb.group({
    //   id: this.fb.control('', [ Validators.required ]),
    //   title: this.fb.control('', [ Validators.required ]),
    //   tasks: this.tasksArray
    // });
  }

  private createFormWithTodo(todo: Todo): FormGroup {
    const newArray = [];
    todo.tasks.forEach(element => {
      newArray.push({
        description: this.fb.control(`${element.description}`, [ Validators.required ]),
        priority: this.fb.control(`${element.priority}`, [ Validators.required ])
      });
    });
    console.info('=> newArray: ', newArray);

    return this.fb.group({
      id: this.fb.control(`${todo.id}`, [ Validators.required ]),
      title: this.fb.control(`${todo.title}`, [ Validators.required ]),
      tasks: this.fb.array(newArray)
    });
  }

  private createTask(): FormGroup {
    return this.fb.group({
      description: this.fb.control('', [ Validators.required ]),
      priority: this.fb.control('0', [ Validators.required ])
    });
  }

  addTask() {
    const task = this.createTask();
    this.tasksArray.push(task);
  }

  deleteTask(index: number) {
    this.tasksArray.removeAt(index);
  }

  showTasks() {
    console.info("=> tasksArray contains", this.tasksArray.value);
  }

}
