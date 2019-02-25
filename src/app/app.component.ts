import { Component, OnInit } from '@angular/core';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('moveInLeft', [
      transition('void=> *', [style({transform: 'translateX(300px)'}),
        animate('200ms ease-out', keyframes([
          style({transform: 'translateX(300px)'}),
          style({transform: 'translateX(0)'})

        ]))]),
      transition('*=>void', [style({transform: 'translateX(0px)'}),
        animate('250ms ease-in',   keyframes([
          style({transform: 'translateY(-20px)', opacity: 1, offset: 0.2}),
          style({transform: 'translateY(250px)', opacity: 0 , offset: 1})

        ]))])

    ])
  ]
})

export class AppComponent implements OnInit{
  todoArray: { value: string, isCompleted: boolean } [] = [];

  public form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.todoArray = this.getLocalStorageToDoList();
  }

  ngOnInit(): void {
    this.constructForm();
  }

  constructForm() {
    this.form = this.fb.group({
      todo: this.fb.control(null, Validators.required)
    });
  }

  getLocalStorageToDoList() {
    return localStorage.getItem('toDo') && JSON.parse(localStorage.getItem('toDo')) || [];
  }
  updateLocalStorageToDoList(list) {
    localStorage.setItem('toDo', JSON.stringify(list));
  }

  onSubmit() {
    if (this.form.invalid) { return; }
    const item = { value: this.form.get('todo').value, isCompleted: false };
    this.todoArray.push(item);
    this.updateLocalStorageToDoList(this.todoArray);
    this.form.reset();
  }

  onDeleteItem(index) {
    this.todoArray.splice(index, 1);
    this.updateLocalStorageToDoList(this.todoArray);
  }

  onCompleteItem(index) {
    this.todoArray[index].isCompleted = true
    this.updateLocalStorageToDoList(this.todoArray);
  }
}
