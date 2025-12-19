// ================================
// Task Class
// Represents a single task with all its properties
// ================================

class Task {
  /**
   * Create a new task
   * @param {Object} data - Task data
   * @param {string} data.title - Task title (required)
   * @param {string} data.description - Task description
   * @param {string} data.dueDate - Due date (ISO string)
   * @param {string} data.priority - Priority level (low, medium, high)
   * @param {string} data.category - Task category
   * @param {string} data.id - Task ID (auto-generated if not provided)
   * @param {boolean} data.completed - Completion status
   * @param {string} data.createdAt - Creation timestamp
   */
  constructor(data) {
    // TODO: Initialize task properties
    this.id = data.id || this.generateId();
    this.title = data.title;
    this.description = data.description || '';
    this.dueDate = data.dueDate || null;
    this.priority = data.priority || 'medium';
    this.category = data.category || 'General';
    this.completed = data.completed || false;
    this.createdAt = data.createdAt || new Date().toISOString();

    // Validate required fields
    if (!this.title) {
      throw new Error('Task title is required');
    }
  }

  /**
   * Generate a unique ID for the task
   * @returns {string} Unique ID
   */
  generateId() {
    // TODO: Implement ID generation
    // Simple approach: timestamp + random number
    return `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Toggle task completion status
   */
  toggleComplete() {
    // TODO: Toggle completed status
    this.completed = !this.completed;
  }

  /**
   * Update task properties
   * @param {Object} updates - Properties to update
   */
  update(updates) {
    // TODO: Update task properties
    // Only update provided properties
    Object.keys(updates).forEach(key => {
      if (key !== 'id' && key !== 'createdAt') {
        this[key] = updates[key];
      }
    });
  }

  /**
   * Check if task is overdue
   * @returns {boolean} True if task is overdue
   */
  isOverdue() {
    // TODO: Check if task is overdue
    if (!this.dueDate || this.completed) {
      return false;
    }

    const now = new Date();
    const dueDate = new Date(this.dueDate);
    return now > dueDate;
  }

  /**
   * Get formatted due date
   * @returns {string} Formatted date string
   */
  getFormattedDueDate() {
    // TODO: Format due date for display
    if (!this.dueDate) {
      return 'No due date';
    }

    const date = new Date(this.dueDate);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  /**
   * Convert task to plain object (for storage)
   * @returns {Object} Plain object representation
   */
  toJSON() {
    // TODO: Return object for JSON serialization
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
   * Create Task instance from plain object
   * @param {Object} obj - Plain object
   * @returns {Task} Task instance
   */
  static fromJSON(obj) {
    // TODO: Create Task from JSON object
    return new Task(obj);
  }
}

// Export if using modules
// export default Task;

