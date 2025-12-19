/**
 * TaskManager.js - Business Logic
 * Manages all task operations (CRUD, filtering, sorting)
 */

class TaskManager {
  constructor() {
    this.tasks = Storage.load();
  }

  /**
   * Get all tasks
   */
  getAllTasks() {
    return this.tasks;
  }

  /**
   * Add a new task
   */
  addTask(taskData) {
    const task = new Task(taskData);
    this.tasks.push(task);
    this.save();
    return task;
  }

  /**
   * Get task by ID
   */
  getTaskById(id) {
    return this.tasks.find(task => task.id === id);
  }

  /**
   * Update a task
   */
  updateTask(id, updates) {
    const task = this.getTaskById(id);
    if (task) {
      task.update(updates);
      this.save();
      return task;
    }
    return null;
  }

  /**
   * Delete a task
   */
  deleteTask(id) {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      this.save();
      return true;
    }
    return false;
  }

  /**
   * Toggle task completion
   */
  toggleTask(id) {
    const task = this.getTaskById(id);
    if (task) {
      task.toggle();
      this.save();
      return task;
    }
    return null;
  }

  /**
   * Filter tasks by status
   */
  filterByStatus(status) {
    switch (status) {
      case 'active':
        return this.tasks.filter(task => !task.completed);
      case 'completed':
        return this.tasks.filter(task => task.completed);
      case 'all':
      default:
        return this.tasks;
    }
  }

  /**
   * Filter tasks by priority
   */
  filterByPriority(priority) {
    if (priority === 'all') {
      return this.tasks;
    }
    return this.tasks.filter(task => task.priority === priority);
  }

  /**
   * Filter tasks by category
   */
  filterByCategory(category) {
    if (!category || category === 'all') {
      return this.tasks;
    }
    return this.tasks.filter(task =>
      task.category.toLowerCase() === category.toLowerCase()
    );
  }

  /**
   * Search tasks by keyword
   */
  searchTasks(query) {
    if (!query) {
      return this.tasks;
    }

    const lowerQuery = query.toLowerCase();
    return this.tasks.filter(task =>
      task.title.toLowerCase().includes(lowerQuery) ||
      task.description.toLowerCase().includes(lowerQuery) ||
      task.category.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * Sort tasks
   */
  sortTasks(tasks, sortBy) {
    const tasksCopy = [...tasks];

    switch (sortBy) {
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return tasksCopy.sort((a, b) =>
          priorityOrder[b.priority] - priorityOrder[a.priority]
        );

      case 'due-date':
        return tasksCopy.sort((a, b) => {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        });

      case 'title':
        return tasksCopy.sort((a, b) =>
          a.title.localeCompare(b.title)
        );

      case 'date-created':
      default:
        return tasksCopy.sort((a, b) =>
          new Date(b.createdAt) - new Date(a.createdAt)
        );
    }
  }

  /**
   * Get statistics
   */
  getStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter(t => t.completed).length;
    const active = total - completed;
    const overdue = this.tasks.filter(t => t.isOverdue()).length;

    return {
      total,
      active,
      completed,
      overdue,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  }

  /**
   * Get unique categories
   */
  getCategories() {
    const categories = new Set();
    this.tasks.forEach(task => {
      if (task.category) {
        categories.add(task.category);
      }
    });
    return Array.from(categories).sort();
  }

  /**
   * Clear all completed tasks
   */
  clearCompleted() {
    const beforeCount = this.tasks.length;
    this.tasks = this.tasks.filter(task => !task.completed);
    const removed = beforeCount - this.tasks.length;

    if (removed > 0) {
      this.save();
    }

    return removed;
  }

  /**
   * Clear all tasks
   */
  clearAll() {
    this.tasks = [];
    this.save();
  }

  /**
   * Save tasks to storage
   */
  save() {
    Storage.save(this.tasks);
  }

  /**
   * Export tasks
   */
  exportTasks() {
    return Storage.exportToFile(this.tasks);
  }

  /**
   * Import tasks
   */
  async importTasks(file) {
    try {
      const importedTasks = await Storage.importFromFile(file);
      this.tasks = importedTasks;
      this.save();
      return true;
    } catch (error) {
      console.error('Import failed:', error);
      return false;
    }
  }
}

