// ================================
// TaskManager Class
// Manages the collection of tasks and business logic
// ================================

class TaskManager {
  constructor() {
    // TODO: Initialize tasks array
    this.tasks = [];
  }

  /**
   * Add a new task
   * @param {Task} task - Task to add
   */
  addTask(task) {
    // TODO: Add task to array
    this.tasks.push(task);
  }

  /**
   * Get all tasks
   * @returns {Array} All tasks
   */
  getAllTasks() {
    // TODO: Return all tasks
    return this.tasks;
  }

  /**
   * Get tasks filtered by status
   * @param {string} filter - Filter type (all, active, completed)
   * @returns {Array} Filtered tasks
   */
  getTasks(filter = 'all') {
    // TODO: Filter tasks based on filter parameter
    switch (filter) {
      case 'active':
        return this.tasks.filter(task => !task.completed);
      case 'completed':
        return this.tasks.filter(task => task.completed);
      default:
        return this.tasks;
    }
  }

  /**
   * Get a single task by ID
   * @param {string} id - Task ID
   * @returns {Task|undefined} Task or undefined if not found
   */
  getTask(id) {
    // TODO: Find task by ID
    return this.tasks.find(task => task.id === id);
  }

  /**
   * Update a task
   * @param {string} id - Task ID
   * @param {Object} updates - Properties to update
   */
  updateTask(id, updates) {
    // TODO: Find task and update it
    const task = this.getTask(id);
    if (task) {
      task.update(updates);
    }
  }

  /**
   * Delete a task
   * @param {string} id - Task ID
   */
  deleteTask(id) {
    // TODO: Remove task from array
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  /**
   * Toggle task completion
   * @param {string} id - Task ID
   */
  toggleTaskComplete(id) {
    // TODO: Find task and toggle completion
    const task = this.getTask(id);
    if (task) {
      task.toggleComplete();
    }
  }

  /**
   * Search tasks by keyword
   * @param {string} keyword - Search keyword
   * @returns {Array} Matching tasks
   */
  searchTasks(keyword) {
    // TODO: Search in title, description, and category
    const lowerKeyword = keyword.toLowerCase();
    return this.tasks.filter(task => {
      return (
        task.title.toLowerCase().includes(lowerKeyword) ||
        task.description.toLowerCase().includes(lowerKeyword) ||
        task.category.toLowerCase().includes(lowerKeyword)
      );
    });
  }

  /**
   * Sort tasks
   * @param {string} sortBy - Sort criterion
   * @returns {Array} Sorted tasks
   */
  sortTasks(sortBy) {
    // TODO: Sort tasks array based on criterion
    switch (sortBy) {
      case 'due-date':
        return this.tasks.sort((a, b) => {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        });

      case 'priority':
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return this.tasks.sort((a, b) => {
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        });

      case 'title':
        return this.tasks.sort((a, b) => {
          return a.title.localeCompare(b.title);
        });

      case 'date-created':
      default:
        return this.tasks.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
    }
  }

  /**
   * Get tasks by category
   * @param {string} category - Category name
   * @returns {Array} Tasks in category
   */
  getTasksByCategory(category) {
    // TODO: Filter by category
    return this.tasks.filter(task => task.category === category);
  }

  /**
   * Get all unique categories
   * @returns {Array} Array of category names
   */
  getCategories() {
    // TODO: Get unique categories from all tasks
    const categories = this.tasks.map(task => task.category);
    return [...new Set(categories)];
  }

  /**
   * Get statistics
   * @returns {Object} Statistics object
   */
  getStats() {
    // TODO: Calculate statistics
    const total = this.tasks.length;
    const completed = this.tasks.filter(task => task.completed).length;
    const active = total - completed;
    const overdue = this.tasks.filter(task => task.isOverdue()).length;

    return {
      total,
      active,
      completed,
      overdue
    };
  }

  /**
   * Clear all tasks
   */
  clearAllTasks() {
    // TODO: Clear tasks array
    this.tasks = [];
  }

  /**
   * Clear completed tasks
   */
  clearCompletedTasks() {
    // TODO: Remove all completed tasks
    this.tasks = this.tasks.filter(task => !task.completed);
  }
}

// Export if using modules
// export default TaskManager;

