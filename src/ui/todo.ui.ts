import { Todo } from "../modules/todo";

export class TodoUI {
  private todoListElement: HTMLUListElement;
  private todoInput: HTMLInputElement;
  private addTodoBtn: HTMLButtonElement;

  constructor() {
    // ✅ Type assertions for DOM elements
    this.todoListElement = document.getElementById("todoList") as HTMLUListElement;
    this.todoInput = document.getElementById("todoInput") as HTMLInputElement;
    this.addTodoBtn = document.getElementById("addTodoBtn") as HTMLButtonElement;

    if (!this.todoListElement || !this.todoInput || !this.addTodoBtn) {
      throw new Error("Required DOM elements not found 😢");
    }
  }

  public getTodoInputText(): string {
    return this.todoInput.value;
  }

  public clearTodoInput(): void {
    this.todoInput.value = "";
  }

  public renderTodos(
    todos: Todo[],
    onToggle: (id: string) => void,
    onDelete: (id: string) => void,
    onEdit: (id: string, newText: string) => void
  ): void {
    this.todoListElement.innerHTML = ""; // Clear current list

    todos.forEach((todo) => {
      const listItem = this.createTodoListItem(todo, onToggle, onDelete, onEdit);
      this.todoListElement.appendChild(listItem);
    });
  }

  private createTodoListItem(
    todo: Todo,
    onToggle: (id: string) => void,
    onDelete: (id: string) => void,
    onEdit: (id: string, newText: string) => void
  ): HTMLLIElement {
    const listItem = document.createElement("li");
    listItem.dataset.id = todo.id; // Store ID in dataset

    if (todo.completed) {
      listItem.classList.add("completed");
    }

    const todoTextSpan = document.createElement("span");
    todoTextSpan.classList.add("todo-text");
    todoTextSpan.textContent = todo.text;
    todoTextSpan.contentEditable = "false"; // Initially not editable

    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("todo-actions");

    const completeBtn = document.createElement("button");
    completeBtn.classList.add("complete-btn");
    completeBtn.innerHTML = todo.completed ? "&#10003;" : "&#x2713;"; // ✓ or box
    completeBtn.title = todo.completed ? "Unmark as complete" : "Mark as complete";
    completeBtn.onclick = () => onToggle(todo.id);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.innerHTML = "&#9998;"; // ✎
    editBtn.title = "Edit task";

    editBtn.onclick = () => {
      const isEditing = todoTextSpan.contentEditable === "true";

      if (isEditing) {
        // Save edits
        todoTextSpan.contentEditable = "false";
        todoTextSpan.classList.remove("editing");
        onEdit(todo.id, todoTextSpan.textContent || "");
        editBtn.innerHTML = "&#9998;"; // ✎
        editBtn.title = "Edit task";
      } else {
        // Start editing
        todoTextSpan.contentEditable = "true";
        todoTextSpan.classList.add("editing");
        todoTextSpan.focus();
        editBtn.innerHTML = "&#10003;"; // ✓ for save
        editBtn.title = "Save changes";
      }
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = "&#10006;"; // ✖
    deleteBtn.title = "Delete task";
    deleteBtn.onclick = () => onDelete(todo.id);

    actionsDiv.appendChild(completeBtn);
    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);

    listItem.appendChild(todoTextSpan);
    listItem.appendChild(actionsDiv);

    return listItem;
  }

  public setAddTodoButtonClickHandler(handler: (event: MouseEvent) => void): void {
    this.addTodoBtn.addEventListener("click", handler);
  }

  public setTodoInputKeypressHandler(handler: (event: KeyboardEvent) => void): void {
    this.todoInput.addEventListener("keypress", handler);
  }
}
