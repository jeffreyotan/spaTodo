import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Todo, TodoSummary } from './models';

@Injectable()
export class TodoDatabase extends Dexie {

    private todo: Dexie.Table<Todo, string>;

    constructor() {
        // database name
        super('tododb');

        // setup the schema for version 1
        this.version(1).stores({
            todo: "id"
        });

        // get a reference to the todo collection
        this.todo = this.table('todo');
    }

    async addTodo(t: Todo): Promise<any> {
        // this is an upsert method (it will update if the primary key is already there, but insert if the primary key is not there)
        return await this.todo.put(t);

        // Alternatively.. using an insert method
        // this.todo.add(t);
    }

    async getTodoSummary(): Promise<TodoSummary[]> {
        return (await this.todo.toArray()).map(d => {
            return {
                id: d.id,
                title: d.title
            } as TodoSummary;
        });
    }

    async getTodoDetail(id: string): Promise<Todo> {
        return (await this.todo.get(id)) as Todo;
    }

    async deleteTodo(id: string): Promise<any> {
        return await this.todo.where('id').equals(id).delete();
    }

}