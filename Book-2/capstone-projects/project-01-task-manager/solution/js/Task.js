/**
 * Task.js - Task Model/Class
 * Represents a single task with all its properties
 */

class Task {
  constructor({ title, description = '', dueDate = null, priority = 'medium', category = '', id = null }) {
    this.id = id || `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority; // 'low', 'medium', 'high'
    this.category = category;
    this.completed = false;
    this.createdAt = new Date().toISOString();
  }

  /**
   * Toggle task completion status
   */
  toggle() {
    this.completed = !this.completed;
  }

  /**
   * Update task properties
   */
  update(updates) {
    Object.assign(this, updates);
  }

  /**
   * Check if task is overdue
   */
  isOverdue() {
    if (!this.dueDate || this.completed) {
      return false;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(this.dueDate);
    return due < today;
  }

  /**
   * Get formatted due date
   */
  getFormattedDueDate() {
    if (!this.dueDate) return null;

    const date = new Date(this.dueDate);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  /**
   * Convert to plain object for storage
   */
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      dueDate: this.dueDate,
      priority: this.priority,
      category: this.category,
      completed: this.completed,
      createdAt: this.createdAt
    };
  }

  /**
   * Create Task from stored data
   */
  static fromJSON(data) {
    const task = new Task(data);
    task.completed = data.completed;
    task.createdAt = data.createdAt;
    return task;
  }
}

