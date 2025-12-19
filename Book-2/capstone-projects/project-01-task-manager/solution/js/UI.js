/**
 * UI.js - User Interface / DOM Manipulation
 * Handles all rendering and DOM updates
 */

class UI {
  constructor() {
    this.tasksList = document.getElementById('tasks-list');
    this.emptyState = document.getElementById('empty-state');
    this.totalTasksEl = document.getElementById('total-tasks');
    this.activeTasksEl = document.getElementById('active-tasks');
    this.completedTasksEl = document.getElementById('completed-tasks');
  }

  /**
   * Render all tasks
   */
  renderTasks(tasks) {
    // Clear current tasks
    this.tasksList.innerHTML = '';

    // Show/hide empty state
    if (tasks.length === 0) {
      this.emptyState.style.display = 'block';
      this.tasksList.style.display = 'none';
      return;
    }

    this.emptyState.style.display = 'none';
    this.tasksList.style.display = 'grid';

    // Render each task
    tasks.forEach(task => {
      const taskElement = this.createTaskElement(task);
      this.tasksList.appendChild(taskElement);
    });
  }

  /**
   * Create task card element
   */
  createTaskElement(task) {
    const article = document.createElement('article');
    article.className = `task-card priority-${task.priority}${task.completed ? ' completed' : ''}${task.isOverdue() ? ' overdue' : ''}`;
    article.dataset.taskId = task.id;

    // Build due date HTML
    let dueDateHTML = '';
    if (task.dueDate) {
      const formattedDate = task.getFormattedDueDate();
      const overdueClass = task.isOverdue() ? ' overdue' : '';
      dueDateHTML = `<span class="task-due-date${overdueClass}">📅 ${formattedDate}</span>`;
    }

    // Build category HTML
    const categoryHTML = task.category
      ? `<span class="task-category">🏷️ ${this.escapeHTML(task.category)}</span>`
      : '';

    article.innerHTML = `
      <div class="task-card__header">
        <input
          type="checkbox"
          class="task-checkbox"
          ${task.completed ? 'checked' : ''}
          aria-label="Mark task as ${task.completed ? 'incomplete' : 'complete'}"
        >
        <h3 class="task-title">${this.escapeHTML(task.title)}</h3>
        <span class="task-priority-badge priority-${task.priority}">
          ${task.priority.toUpperCase()}
        </span>
      </div>
      ${task.description ? `<p class="task-description">${this.escapeHTML(task.description)}</p>` : ''}
      <div class="task-card__meta">
        ${categoryHTML}
        ${dueDateHTML}
      </div>
      <div class="task-card__actions">
        <button class="btn-icon btn-edit" aria-label="Edit task">
          ✏️ Edit
        </button>
        <button class="btn-icon btn-delete" aria-label="Delete task">
          🗑️ Delete
        </button>
      </div>
    `;

    return article;
  }

  /**
   * Update statistics display
   */
  updateStats(stats) {
    this.totalTasksEl.textContent = stats.total;
    this.activeTasksEl.textContent = stats.active;
    this.completedTasksEl.textContent = stats.completed;
  }

  /**
   * Show edit modal for task
   */
  showEditModal(task) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal__overlay"></div>
      <div class="modal__content">
        <div class="modal__header">
          <h2>Edit Task</h2>
          <button class="modal__close" aria-label="Close modal">&times;</button>
        </div>
        <div class="modal__body">
          <form id="edit-task-form" class="task-form">
            <div class="form-group">
              <label for="edit-task-title">Title *</label>
              <input
                type="text"
                id="edit-task-title"
                name="title"
                required
                value="${this.escapeHTML(task.title)}"
                class="form-input"
              >
            </div>

            <div class="form-group">
              <label for="edit-task-description">Description</label>
              <textarea
                id="edit-task-description"
                name="description"
                rows="3"
                class="form-input"
              >${this.escapeHTML(task.description)}</textarea>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="edit-task-due-date">Due Date</label>
                <input
                  type="date"
                  id="edit-task-due-date"
                  name="dueDate"
                  value="${task.dueDate || ''}"
                  class="form-input"
                >
              </div>

              <div class="form-group">
                <label for="edit-task-priority">Priority</label>
                <select id="edit-task-priority" name="priority" class="form-input">
                  <option value="low" ${task.priority === 'low' ? 'selected' : ''}>Low</option>
                  <option value="medium" ${task.priority === 'medium' ? 'selected' : ''}>Medium</option>
                  <option value="high" ${task.priority === 'high' ? 'selected' : ''}>High</option>
                </select>
              </div>

              <div class="form-group">
                <label for="edit-task-category">Category</label>
                <input
                  type="text"
                  id="edit-task-category"
                  name="category"
                  value="${this.escapeHTML(task.category)}"
                  class="form-input"
                >
              </div>
            </div>

            <div class="modal__actions">
              <button type="submit" class="btn btn--primary">
                Save Changes
              </button>
              <button type="button" class="btn btn--secondary modal__cancel">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Focus first input
    setTimeout(() => {
      modal.querySelector('#edit-task-title').focus();
    }, 100);

    // Return the modal element
    return modal;
  }

  /**
   * Close and remove modal
   */
  closeModal(modal) {
    if (modal && modal.parentNode) {
      modal.remove();
    }
  }

  /**
   * Show notification/toast message
   */
  showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => {
      notification.classList.add('notification--show');
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.classList.remove('notification--show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }

  /**
   * Update filter button active state
   */
  updateFilterButtons(activeFilter) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
      if (btn.dataset.filter === activeFilter) {
        btn.classList.add('filter-btn--active');
      } else {
        btn.classList.remove('filter-btn--active');
      }
    });
  }

  /**
   * Escape HTML to prevent XSS
   */
  escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Show confirmation dialog
   */
  confirm(message) {
    return window.confirm(message);
  }

  /**
   * Clear form inputs
   */
  clearForm(form) {
    form.reset();
  }

  /**
   * Get form data as object
   */
  getFormData(form) {
    const formData = new FormData(form);
    const data = {};

    for (let [key, value] of formData.entries()) {
      data[key] = value.trim();
    }

    return data;
  }

  /**
   * Show form validation error
   */
  showFormError(input, message) {
    input.classList.add('form-input--error');

    // Remove existing error
    const existingError = input.parentElement.querySelector('.form-error');
    if (existingError) {
      existingError.remove();
    }

    // Add error message
    const errorEl = document.createElement('span');
    errorEl.className = 'form-error';
    errorEl.textContent = message;
    input.parentElement.appendChild(errorEl);
  }

  /**
   * Clear form validation errors
   */
  clearFormErrors(form) {
    const errorInputs = form.querySelectorAll('.form-input--error');
    errorInputs.forEach(input => {
      input.classList.remove('form-input--error');
    });

    const errorMessages = form.querySelectorAll('.form-error');
    errorMessages.forEach(error => {
      error.remove();
    });
  }
}

