import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToDoType } from '../../app-types/to-do.type';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit {

  @Input() todosList: ToDoType;
  @Output() deleteTodo = new EventEmitter<ToDoType>();
  constructor() { }

  ngOnInit(): void {
  }

}
