import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  taskListArray: { value: string, isCompleted: boolean }[] = [];
  task: { value: string, isCompleted: boolean };
  numberOfCompletedTask: number;
  appTitle: string = "To-Do App!";
  appSubTitle: string = "Add new To-Do";
  taskListHeader: string = "To Do List";

  constructor(private fb: FormBuilder) {
    this.taskListArray = this.getLocalStorageToDoList();

  }

  ngOnInit(): void {
  }

  getCompletedTask() {
    return this.taskListArray.filter(element => {
      return element.isCompleted === true;
    }).length;
  }

  getLocalStorageToDoList() {
    return localStorage.getItem('toDo') && JSON.parse(localStorage.getItem('toDo')) || [];
  }

  updateLocalStorageToDoList(list) {
    localStorage.setItem('toDo', JSON.stringify(list));
  }

  receiveNewTask($event) {
    this.task = $event;
    this.taskListArray.push(this.task);
    this.updateLocalStorageToDoList(this.taskListArray);
  }
}