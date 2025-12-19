// ================================
// UI Module
// Handles all DOM manipulation and UI updates
// ================================

const UI = {
  /**
   * Create HTML for a task card
   * @param {Task} task - Task object
   * @returns {string} HTML string
   */
  createTaskCard(task) {
    // TODO: Create task card HTML
    const priorityClass = `priority-${task.priority}`;
    const completedClass = task.completed ? 'task-card--completed' : '';
    const overdueMark = task.isOverdue() ? '<span class="overdue-badge">Overdue</span>' : '';

    return `
      <article class="task-card ${completedClass} ${priorityClass}" data-task-id="${task.id}">
        <div class="task-card__header">
          <input
            type="checkbox"
            class="task-checkbox"
            ${task.completed ? 'checked' : ''}
            aria-label="Mark task as complete"
          >
          <h3 class="task-title">${this.escapeHTML(task.title)}</h3>
          <span class="task-priority">${task.priority}</span>
        </div>
        ${task.description ? `<p class="task-description">${this.escapeHTML(task.description)}</p>` : ''}
        <div class="task-card__meta">
          <span class="task-category">📁 ${this.escapeHTML(task.category)}</span>
          <span class="task-due-date">📅 ${task.getFormattedDueDate()}</span>
          ${overdueMark}
        </div>
        <div class="task-card__actions">
          <button class="btn-icon btn-edit" aria-label="Edit task">
            ✏️ Edit
          </button>
          <button class="btn-icon btn-delete" aria-label="Delete task">
            🗑️ Delete
          </button>
        </div>
      </article>
    `;
  },

  /**
   * Escape HTML to prevent XSS
   * @param {string} text - Text to escape
   * @returns {string} Escaped text
   */
  escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  },

  /**
   * Show empty state message
   * @param {string} message - Message to display
   */
  showEmptyState(message = 'No tasks yet') {
    const emptyState = document.getElementById('empty-state');
    emptyState.querySelector('.empty-state__message').textContent = message;
    emptyState.style.display = 'block';
  },

  /**
   * Hide empty state
   */
  hideEmptyState() {
    const emptyState = document.getElementById('empty-state');
    emptyState.style.display = 'none';
  },

  /**
   * Show success message
   * @param {string} message - Success message
   */
  showSuccess(message) {
    // TODO: Create and show success toast
    this.showToast(message, 'success');
  },

  /**
   * Show error message
   * @param {string} message - Error message
   */
  showError(message) {
    // TODO: Create and show error toast
    this.showToast(message, 'error');
  },

  /**
   * Show toast notification
   * @param {string} message - Toast message
   * @param {string} type - Toast type (success, error, info)
   */
  showToast(message, type = 'info') {
    // TODO: Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.textContent = message;

    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => toast.classList.add('toast--show'), 10);

    // Remove after 3 seconds
    setTimeout(() => {
      toast.classList.remove('toast--show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  },

  /**
   * Open edit modal
   * @param {Task} task - Task to edit
   */
  openEditModal(task) {
    // TODO: Create and show edit modal
    console.log('Opening edit modal for task:', task);

    // You'll need to implement modal HTML and logic
    // This is a placeholder
  },

  /**
   * Close modal
   */
  closeModal() {
    // TODO: Close any open modal
    const modal = document.querySelector('.modal');
    if (modal) {
      modal.remove();
    }
  },

  /**
   * Update statistics in header
   * @param {Object} stats - Statistics object
   */
  updateStats(stats) {
    document.getElementById('total-tasks').textContent = stats.total;
    document.getElementById('active-tasks').textContent = stats.active;
    document.getElementById('completed-tasks').textContent = stats.completed;
  },

  /**
   * Animate element removal
   * @param {HTMLElement} element - Element to remove
   */
  animateRemove(element) {
    element.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => element.remove(), 300);
  }
};

// Export if using modules
// export default UI;

