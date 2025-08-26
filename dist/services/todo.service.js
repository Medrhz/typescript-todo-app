export class TodoService {
    constructor() {
        this.todos = [];
        this.localStorageKey = "todos"; // Fixed: previously was an empty array
        this.loadTodos();
    }
    loadTodos() {
        const storedTodos = localStorage.getItem(this.localStorageKey);
        if (storedTodos) {
            this.todos = JSON.parse(storedTodos);
        }
    }
    saveTodos() {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.todos));
    }
    getTodos() {
        return [...this.todos]; // Return a copy to prevent direct modification
    }
    addTodo(text) {
        if (!text.trim()) {
            throw new Error("Task text cannot be empty 😢");
        }
        const newTodo = {
            id: Date.now().toString(), // Simple unique ID
            text: text.trim(),
            completed: false,
        };
        this.todos.push(newTodo);
        this.saveTodos();
        return newTodo;
    }
    deleteTodo(id) {
        const initialLength = this.todos.length;
        this.todos = this.todos.filter((todo) => todo.id !== id);
        if (this.todos.length === initialLength) {
            throw new Error(`Task with ID ${id} not found for deletion 😢`);
        }
        this.saveTodos();
    }
    toggleTodoStatus(id) {
        const todoToUpdate = this.todos.find((todo) => todo.id === id);
        if (!todoToUpdate) {
            throw new Error(`Task with ID ${id} not found for status toggle 😢`);
        }
        todoToUpdate.completed = !todoToUpdate.completed;
        this.saveTodos();
        return todoToUpdate;
    }
    updateTodoText(id, newText) {
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
//# sourceMappingURL=todo.service.js.map