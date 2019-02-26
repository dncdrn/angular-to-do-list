import { Component, OnInit, Input } from '@angular/core';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
  animations: [
    trigger('moveInLeft', [
      transition('void=> *', [style({ transform: 'translateX(300px)' }),
      animate('200ms ease-out', keyframes([
        style({ transform: 'translateX(300px)' }),
        style({ transform: 'translateX(0)' })
      ]))]),
      transition('*=>void', [style({ transform: 'translateX(0px)' }),
      animate('250ms ease-in', keyframes([
        style({ transform: 'translateY(-20px)', opacity: 1, offset: 0.2 }),
        style({ transform: 'translateY(250px)', opacity: 0, offset: 1 })
      ]))])
    ])
  ]
})
export class ToDoListComponent implements OnInit {
  @Input('taskListArray') taskListArray: { value: string, isCompleted: boolean }[] = [];;

  constructor() {
  }

  ngOnInit() {
  }

  updateLocalStorageToDoList(list) {
    localStorage.setItem('toDo', JSON.stringify(list));
  }

  deleteTask(index) {
    this.taskListArray.splice(index, 1);
    this.updateLocalStorageToDoList(this.taskListArray);
  }

  markTaskCompleted(index) {
    this.taskListArray[index].isCompleted = !this.taskListArray[index].isCompleted
    this.updateLocalStorageToDoList(this.taskListArray);
  }

}
