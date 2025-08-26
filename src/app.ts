import { TodoService } from "./services/todo.service";
import { TodoUI } from "./ui/todo.ui";

export class TodoApp {
  private todoService: TodoService;
  private todoUI: TodoUI;

  constructor() {
    this.todoService = new TodoService();
    this.todoUI = new TodoUI();
    this.setupEventHandlers();
    this.renderAllTodos();
  }

  private setupEventHandlers(): void {
    this.todoUI.setAddTodoButtonClickHandler(this.handleAddTodo.bind(this));
    this.todoUI.setTodoInputKeypressHandler(this.handleInputKeypress.bind(this));
  }

  private renderAllTodos(): void {
    const todos = this.todoService.getTodos();
    this.todoUI.renderTodos(
      todos,
      this.handleToggleTodoStatus.bind(this),
      this.handleDeleteTodo.bind(this),
      this.handleEditTodoText.bind(this)
    );
  }

  private handleAddTodo(): void {
    const todoText = this.todoUI.getTodoInputText();
    try {
      this.todoService.addTodo(todoText);
      this.todoUI.clearTodoInput();
      this.renderAllTodos();
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error adding task: ${error.message}`);
      } else {
        alert("An unexpected error occurred while adding the task 😢");
      }
    }
  }

  private handleInputKeypress(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      this.handleAddTodo();
    }
  }

  private handleToggleTodoStatus(id: string): void {
    try {
      this.todoService.toggleTodoStatus(id);
      this.renderAllTodos();
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error toggling task status: ${error.message}`);
      } else {
        alert("An unexpected error occurred while toggling the task status 😢");
      }
    }
  }

  private handleDeleteTodo(id: string): void {
    if (confirm("Are you sure you want to delete this task?")) {
      try {
        this.todoService.deleteTodo(id);
        this.renderAllTodos();
      } catch (error) {
        if (error instanceof Error) {
          alert(`Error deleting task: ${error.message}`);
        } else {
          alert("An unexpected error occurred while deleting the task 😢");
        }
      }
    }
  }

  private handleEditTodoText(id: string, newText: string): void {
    try {
      this.todoService.updateTodoText(id, newText);
      this.renderAllTodos();
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error editing task: ${error.message}`);
      } else {
        alert("An unexpected error occurred while editing the task 😢");
      }
    }
  }
}
