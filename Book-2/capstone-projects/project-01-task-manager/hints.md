# Task Manager - Implementation Hints

Common challenges and implementation patterns.

---

## 🎯 Challenge 1: Code Organization

### The Problem
How to structure a multi-file JavaScript application.

### The Solution
Use ES6 modules:

**Task.js** (Model):
```javascript
export class Task {
  constructor({ title, description, dueDate, priority, category }) {
    this.id = `${Date.now()}-${Math.random()}`;
    this.title = title;
    this.description = description || '';
    this.dueDate = dueDate || null;
    this.priority = priority || 'medium';
    this.category = category || '';
    this.completed = false;
    this.createdAt = new Date().toISOString();
  }

  toggle() {
    this.completed = !this.completed;
  }

  isOverdue() {
    if (!this.dueDate || this.completed) return false;
    return new Date(this.dueDate) < new Date();
  }
}
```

**TaskManager.js** (Business Logic):
```javascript
import { Task } from './Task.js';
import { Storage } from './storage.js';

export class TaskManager {
  constructor() {
    this.tasks = Storage.load();
  }

  addTask(taskData) {
    const task = new Task(taskData);
    this.tasks.push(task);
    this.save();
    return task;
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.save();
  }

  updateTask(id, updates) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      Object.assign(task, updates);
      this.save();
    }
  }

  toggleTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.toggle();
      this.save();
    }
  }

  filterTasks(filter) {
    switch(filter) {
      case 'active':
        return this.tasks.filter(t => !t.completed);
      case 'completed':
        return this.tasks.filter(t => t.completed);
      default:
        return this.tasks;
    }
  }

  searchTasks(query) {
    const lowerQuery = query.toLowerCase();
    return this.tasks.filter(t =>
      t.title.toLowerCase().includes(lowerQuery) ||
      t.description.toLowerCase().includes(lowerQuery)
    );
  }

  sortTasks(tasks, sortBy) {
    return [...tasks].sort((a, b) => {
      switch(sortBy) {
        case 'priority':
          const priorities = { high: 3, medium: 2, low: 1 };
          return priorities[b.priority] - priorities[a.priority];
        case 'dueDate':
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        default: // date created
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
  }

  getStats() {
    return {
      total: this.tasks.length,
      active: this.tasks.filter(t => !t.completed).length,
      completed: this.tasks.filter(t => t.completed).length,
      overdue: this.tasks.filter(t => t.isOverdue()).length
    };
  }

  save() {
    Storage.save(this.tasks);
  }
}
```

**storage.js**:
```javascript
export const Storage = {
  KEY: 'taskManagerTasks',

  save(tasks) {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error('Failed to save tasks:', e);
      alert('Storage full! Please delete some tasks.');
    }
  },

  load() {
    try {
      const data = localStorage.getItem(this.KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to load tasks:', e);
      return [];
    }
  },

  clear() {
    localStorage.removeItem(this.KEY);
  }
};
```

---

## 🎯 Challenge 2: Rendering Tasks

### The Problem
Efficiently updating the DOM when tasks change.

### The Solution

**UI.js**:
```javascript
export class UI {
  constructor(taskManager) {
    this.taskManager = taskManager;
    this.taskList = document.getElementById('task-list');
    this.statsContainer = document.getElementById('stats');
  }

  renderTasks(tasks) {
    this.taskList.innerHTML = '';

    if (tasks.length === 0) {
      this.taskList.innerHTML = '<div class="empty-state">No tasks found</div>';
      return;
    }

    tasks.forEach(task => {
      const taskElement = this.createTaskElement(task);
      this.taskList.appendChild(taskElement);
    });
  }

  createTaskElement(task) {
    const div = document.createElement('div');
    div.className = `task-card ${task.completed ? 'completed' : ''} priority-${task.priority}`;
    div.dataset.id = task.id;

    const dueDateHTML = task.dueDate
      ? `<span class="due-date ${task.isOverdue() ? 'overdue' : ''}">
           ${this.formatDate(task.dueDate)}
         </span>`
      : '';

    div.innerHTML = `
      <input type="checkbox"
             class="task-checkbox"
             ${task.completed ? 'checked' : ''}
             aria-label="Mark task as ${task.completed ? 'incomplete' : 'complete'}">
      <div class="task-content">
        <h3 class="task-title">${this.escapeHTML(task.title)}</h3>
        <p class="task-description">${this.escapeHTML(task.description)}</p>
        <div class="task-meta">
          <span class="priority-badge">${task.priority}</span>
          ${task.category ? `<span class="category-badge">${task.category}</span>` : ''}
          ${dueDateHTML}
        </div>
      </div>
      <div class="task-actions">
        <button class="btn-edit" aria-label="Edit task">✏️</button>
        <button class="btn-delete" aria-label="Delete task">🗑️</button>
      </div>
    `;

    return div;
  }

  renderStats() {
    const stats = this.taskManager.getStats();
    const percentage = stats.total > 0
      ? Math.round((stats.completed / stats.total) * 100)
      : 0;

    this.statsContainer.innerHTML = `
      <div class="stat"><span class="stat-number">${stats.total}</span> Total</div>
      <div class="stat"><span class="stat-number">${stats.active}</span> Active</div>
      <div class="stat"><span class="stat-number">${stats.completed}</span> Completed</div>
      <div class="stat"><span class="stat-number">${percentage}%</span> Done</div>
    `;
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}
```

---

## 🎯 Challenge 3: Event Delegation

### The Problem
Handling clicks on dynamically created elements.

### The Solution
Use event delegation on parent:

```javascript
// app.js
taskList.addEventListener('click', (e) => {
  const taskCard = e.target.closest('.task-card');
  if (!taskCard) return;

  const taskId = taskCard.dataset.id;

  // Handle checkbox
  if (e.target.classList.contains('task-checkbox')) {
    taskManager.toggleTask(taskId);
    refreshUI();
  }

  // Handle edit button
  if (e.target.closest('.btn-edit')) {
    openEditModal(taskId);
  }

  // Handle delete button
  if (e.target.closest('.btn-delete')) {
    if (confirm('Delete this task?')) {
      taskManager.deleteTask(taskId);
      refreshUI();
    }
  }
});
```

---

## 🎯 Challenge 4: Form Validation

### The Problem
Validating user input before creating tasks.

### The Solution

```javascript
function validateTaskForm(formData) {
  const errors = [];

  // Title required
  if (!formData.title.trim()) {
    errors.push('Title is required');
  }

  // Title max length
  if (formData.title.length > 100) {
    errors.push('Title must be less than 100 characters');
  }

  // Due date must be future
  if (formData.dueDate) {
    const dueDate = new Date(formData.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (dueDate < today) {
      errors.push('Due date must be in the future');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Usage
addTaskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = {
    title: document.getElementById('title').value,
    description: document.getElementById('description').value,
    dueDate: document.getElementById('dueDate').value,
    priority: document.getElementById('priority').value,
    category: document.getElementById('category').value
  };

  const validation = validateTaskForm(formData);

  if (!validation.isValid) {
    showErrors(validation.errors);
    return;
  }

  taskManager.addTask(formData);
  addTaskForm.reset();
  refreshUI();
});
```

---

## 🎯 Challenge 5: Filtering & Search

### The Problem
Combining multiple filters with search.

### The Solution

```javascript
function refreshUI() {
  let tasks = taskManager.tasks;

  // Apply status filter
  if (currentFilter !== 'all') {
    tasks = taskManager.filterTasks(currentFilter);
  }

  // Apply priority filter
  if (currentPriorityFilter !== 'all') {
    tasks = tasks.filter(t => t.priority === currentPriorityFilter);
  }

  // Apply search
  if (searchTerm) {
    tasks = tasks.filter(t =>
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Apply sort
  tasks = taskManager.sortTasks(tasks, currentSort);

  // Render
  ui.renderTasks(tasks);
  ui.renderStats();
}

// Event listeners
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter;
    refreshUI();
  });
});

searchInput.addEventListener('input', (e) => {
  searchTerm = e.target.value;
  refreshUI();
});

sortSelect.addEventListener('change', (e) => {
  currentSort = e.target.value;
  refreshUI();
});
```

---

## 💡 General Tips

### localStorage Best Practices:
```javascript
// Always handle errors
try {
  localStorage.setItem(key, value);
} catch (e) {
  if (e.name === 'QuotaExceededError') {
    // Handle storage full
  }
}

// Validate data on load
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
// Validate each task has required properties
```

### Performance Tips:
- Use `DocumentFragment` for adding multiple elements
- Debounce search input (wait 300ms after typing stops)
- Limit rendered tasks if > 100 (add pagination)

### Debugging Tips:
- `console.log(taskManager.tasks)` - Check state
- Use browser DevTools > Application > LocalStorage
- Add `debugger;` statement to pause execution

---

**You've got the patterns! Now build it step by step!** 🚀

