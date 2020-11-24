import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { MainComponent } from './components/main.component';
import { CreateComponent } from './components/create.component';
import { TodoComponent } from './components/todo.component';

const ROUTES: Routes = [
  { path: '', component: MainComponent },
  { path: 'home', component: MainComponent },
  { path: 'create', component: CreateComponent },
  { path: '**', redirectTo: '/', pathMatch: "full" }
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CreateComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
