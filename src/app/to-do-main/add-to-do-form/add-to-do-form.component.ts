import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToDoType } from '../../app-types/to-do.type';

@Component({
  selector: 'app-add-to-do-form',
  templateUrl: './add-to-do-form.component.html',
  styleUrls: ['./add-to-do-form.component.scss']
})
export class AddToDoFormComponent implements OnInit {

  public addToDoForm: FormGroup;
  public todosList: ToDoType[] = JSON.parse(localStorage.getItem('toDoList')) || [];
  public toDoId = 0;
  @Output() addNewToDo = new EventEmitter<ToDoType>();
  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    // Setting id for next ToDo
    if (this.todosList && this.todosList.length) {
      this.todosList.sort((item1: ToDoType, item2: ToDoType) => (item1.id >= item2.id) ? 1 : -1);
      this.toDoId = +this.todosList[this.todosList.length - 1].id + 1;
    }

    this.initForm();
  }

  initForm() {
    this.addToDoForm = this.formBuilder.group({
      title: ['', Validators.required],
      text: '',
    });
  }

  onSubmit() {
    // Creating New Todo from data user filled in the form
    const newToDo = new ToDoType();
    newToDo.id = this.toDoId;
    newToDo.title = this.addToDoForm.controls.title.value;
    newToDo.text = this.addToDoForm.controls.text.value;

    // Sending this todo into main component to add it onto the list of todos
    this.addNewToDo.emit(newToDo);

    this.initForm();
    this.addToDoForm.controls.title.setValue('');
    this.toDoId += 1;
  }

}
