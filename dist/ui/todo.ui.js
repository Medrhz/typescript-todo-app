export class TodoUI {
    constructor() {
        // ✅ Type assertions for DOM elements
        this.todoListElement = document.getElementById("todoList");
        this.todoInput = document.getElementById("todoInput");
        this.addTodoBtn = document.getElementById("addTodoBtn");
        if (!this.todoListElement || !this.todoInput || !this.addTodoBtn) {
            throw new Error("Required DOM elements not found 😢");
        }
    }
    getTodoInputText() {
        return this.todoInput.value;
    }
    clearTodoInput() {
        this.todoInput.value = "";
    }
    renderTodos(todos, onToggle, onDelete, onEdit) {
        this.todoListElement.innerHTML = ""; // Clear current list
        todos.forEach((todo) => {
            const listItem = this.createTodoListItem(todo, onToggle, onDelete, onEdit);
            this.todoListElement.appendChild(listItem);
        });
    }
    createTodoListItem(todo, onToggle, onDelete, onEdit) {
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
            }
            else {
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
    setAddTodoButtonClickHandler(handler) {
        this.addTodoBtn.addEventListener("click", handler);
    }
    setTodoInputKeypressHandler(handler) {
        this.todoInput.addEventListener("keypress", handler);
    }
}
//# sourceMappingURL=todo.ui.js.map