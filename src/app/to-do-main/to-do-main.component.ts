import { Component, OnInit } from '@angular/core';
import { ToDoType } from '../app-types/to-do.type';
import { DeleteTodoDialogComponent } from '../to-do-main/delete-todo-dialog/delete-todo-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-to-do-main',
  templateUrl: './to-do-main.component.html',
  styleUrls: ['./to-do-main.component.scss']
})
export class ToDoMainComponent implements OnInit {


  public todosList: ToDoType[] = JSON.parse(localStorage.getItem('toDoList')) || [];
  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  refreshLocalStorage() {
    // Saving ToDos list in local storage for the future
    localStorage.setItem('toDoList', JSON.stringify(this.todosList));
  }

  onAddNewToDo(todo: ToDoType) {
    // Adding new todo on the list
    this.todosList = [...this.todosList, todo];

    // Updating the list in local Starage
    this.refreshLocalStorage();
  }

  confirmDelete(shouldDelete: boolean, todoToDelete: ToDoType) {
    if (shouldDelete) {
      // Filtering out todos to remove todoToDelete
      this.todosList = this.todosList.filter((todo: ToDoType) => todo.id !== todoToDelete.id);

      // Updating the list in local Starage
      this.refreshLocalStorage();
    }
  }

  onDeleteToDo(todoToDelete) {
    // Open confirm delete dialog
    const deleteDialog = this.dialog.open(DeleteTodoDialogComponent, {
      width: '300px',
      data: {todo: todoToDelete}
    });

    // Once dialog is closed, we check if confirm or reject was pressed
    deleteDialog.afterClosed().subscribe((userInput: boolean) => {
      this.confirmDelete(userInput, todoToDelete);
    });
  }

}


