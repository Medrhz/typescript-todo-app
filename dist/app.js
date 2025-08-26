import { TodoService } from "./services/todo.service.js";
import { TodoUI } from "./ui/todo.ui.js";
export class TodoApp {
  constructor() {
    this.todoService = new TodoService();
    this.todoUI = new TodoUI();
    this.setupEventHandlers();
    this.renderAllTodos();
  }
  setupEventHandlers() {
    this.todoUI.setAddTodoButtonClickHandler(this.handleAddTodo.bind(this));
    this.todoUI.setTodoInputKeypressHandler(this.handleInputKeypress.bind(this));
  }
  renderAllTodos() {
    const todos = this.todoService.getTodos();
    this.todoUI.renderTodos(
      todos,
      this.handleToggleTodoStatus.bind(this),
      this.handleDeleteTodo.bind(this),
      this.handleEditTodoText.bind(this)
    );
  }
  handleAddTodo() {
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
  handleInputKeypress(event) {
    if (event.key === "Enter") {
      this.handleAddTodo();
    }
  }
  handleToggleTodoStatus(id) {
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
  handleDeleteTodo(id) {
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
  handleEditTodoText(id, newText) {
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
//# sourceMappingURL=app.js.map
