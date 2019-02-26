import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'to-do-form',
  templateUrl: './to-do-form.component.html',
  styleUrls: ['./to-do-form.component.scss']
})
export class ToDoFormComponent implements OnInit {

  public form: FormGroup;
  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.constructForm();
  }

  constructForm() {
    this.form = this.fb.group({
      todo: this.fb.control(null, Validators.required)
    });
  }

  task: object = {};
  @Output() taskEvent = new EventEmitter<object>();


  onSubmit() {
    if (this.form.invalid) { return; }
    this.task = { value: this.form.get('todo').value, isCompleted: false };
    this.taskEvent.emit(this.task);
    this.form.reset();
  }

}
