import { Todo } from "../modules/todo";

export class TodoService {
  private todos: Todo[] = [];
  private localStorageKey = "todos"; // Fixed: previously was an empty array

  constructor() {
    this.loadTodos();
  }

  private loadTodos(): void {
    const storedTodos = localStorage.getItem(this.localStorageKey);
    if (storedTodos) {
      this.todos = JSON.parse(storedTodos);
    }
  }

  private saveTodos(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.todos));
  }

  public getTodos(): Todo[] {
    return [...this.todos]; // Return a copy to prevent direct modification
  }

  public addTodo(text: string): Todo {
    if (!text.trim()) {
      throw new Error("Task text cannot be empty 😢");
    }

    const newTodo: Todo = {
      id: Date.now().toString(), // Simple unique ID
      text: text.trim(),
      completed: false,
    };

    this.todos.push(newTodo);
    this.saveTodos();
    return newTodo;
  }

  public deleteTodo(id: string): void {
    const initialLength = this.todos.length;
    this.todos = this.todos.filter((todo) => todo.id !== id);

    if (this.todos.length === initialLength) {
      throw new Error(`Task with ID ${id} not found for deletion 😢`);
    }

    this.saveTodos();
  }

  public toggleTodoStatus(id: string): Todo {
    const todoToUpdate = this.todos.find((todo) => todo.id === id);

    if (!todoToUpdate) {
      throw new Error(`Task with ID ${id} not found for status toggle 😢`);
    }

    todoToUpdate.completed = !todoToUpdate.completed;
    this.saveTodos();
    return todoToUpdate;
  }

  public updateTodoText(id: string, newText: string): Todo {
    if (!newText.trim()) {
      throw new Error("Task text cannot be empty 😢");
    }

    const todoToUpdate = this.todos.find((todo) => todo.id === id);

    if (!todoToUpdate) {
      throw new Error(`Task with ID ${id} not found for update 😢`);
    }

    todoToUpdate.text = newText.trim();
    this.saveTodos();
    return todoToUpdate;
  }
}
