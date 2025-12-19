/**
 * app.js - Main Application Entry Point
 * Initializes app and sets up event listeners
 */

// Initialize application
const taskManager = new TaskManager();
const ui = new UI();

// Current state
let currentFilter = 'all';
let currentSort = 'date-created';
let searchTerm = '';

/**
 * Initialize app on page load
 */
function init() {
  // Render initial tasks
  refreshUI();

  // Set up event listeners
  setupEventListeners();

  console.log('Task Manager initialized');
}

/**
 * Set up all event listeners
 */
function setupEventListeners() {
  // Add task form
  const taskForm = document.getElementById('task-form');
  taskForm.addEventListener('submit', handleAddTask);

  // Filter buttons
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', handleFilterChange);
  });

  // Sort select
  const sortSelect = document.getElementById('sort-select');
  sortSelect.addEventListener('change', handleSortChange);

  // Search input
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', handleSearch);

  // Task list (event delegation)
  const tasksList = document.getElementById('tasks-list');
  tasksList.addEventListener('click', handleTaskAction);
  tasksList.addEventListener('change', handleTaskToggle);

  // Keyboard shortcuts (optional bonus)
  document.addEventListener('keydown', handleKeyboardShortcuts);
}

/**
 * Handle add task form submission
 */
function handleAddTask(e) {
  e.preventDefault();

  // Clear any previous errors
  ui.clearFormErrors(e.target);

  // Get form data
  const formData = ui.getFormData(e.target);

  // Validate form
  const validation = validateTaskForm(formData);
  if (!validation.isValid) {
    validation.errors.forEach(error => {
      ui.showNotification(error, 'error');
    });
    return;
  }

  // Add task
  taskManager.addTask(formData);

  // Clear form
  ui.clearForm(e.target);

  // Refresh UI
  refreshUI();

  // Show success message
  ui.showNotification('Task added successfully!', 'success');
}

/**
 * Handle filter button clicks
 */
function handleFilterChange(e) {
  currentFilter = e.target.dataset.filter;
  ui.updateFilterButtons(currentFilter);
  refreshUI();
}

/**
 * Handle sort dropdown change
 */
function handleSortChange(e) {
  currentSort = e.target.value;
  refreshUI();
}

/**
 * Handle search input
 */
function handleSearch(e) {
  searchTerm = e.target.value;
  refreshUI();
}

/**
 * Handle task actions (edit, delete)
 */
function handleTaskAction(e) {
  const taskCard = e.target.closest('.task-card');
  if (!taskCard) return;

  const taskId = taskCard.dataset.taskId;

  // Edit button
  if (e.target.closest('.btn-edit')) {
    handleEditTask(taskId);
  }

  // Delete button
  if (e.target.closest('.btn-delete')) {
    handleDeleteTask(taskId);
  }
}

/**
 * Handle task checkbox toggle
 */
function handleTaskToggle(e) {
  if (!e.target.classList.contains('task-checkbox')) return;

  const taskCard = e.target.closest('.task-card');
  const taskId = taskCard.dataset.taskId;

  taskManager.toggleTask(taskId);
  refreshUI();

  const task = taskManager.getTaskById(taskId);
  const message = task.completed
    ? 'Task completed! 🎉'
    : 'Task marked as active';
  ui.showNotification(message, 'success');
}

/**
 * Handle edit task
 */
function handleEditTask(taskId) {
  const task = taskManager.getTaskById(taskId);
  if (!task) return;

  // Show edit modal
  const modal = ui.showEditModal(task);

  // Handle form submission
  const editForm = modal.querySelector('#edit-task-form');
  editForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get updated data
    const formData = ui.getFormData(editForm);

    // Validate
    const validation = validateTaskForm(formData);
    if (!validation.isValid) {
      validation.errors.forEach(error => {
        ui.showNotification(error, 'error');
      });
      return;
    }

    // Update task
    taskManager.updateTask(taskId, formData);

    // Close modal
    ui.closeModal(modal);

    // Refresh UI
    refreshUI();

    // Show success
    ui.showNotification('Task updated successfully!', 'success');
  });

  // Handle cancel button
  const cancelBtn = modal.querySelector('.modal__cancel');
  cancelBtn.addEventListener('click', () => {
    ui.closeModal(modal);
  });

  // Handle close button
  const closeBtn = modal.querySelector('.modal__close');
  closeBtn.addEventListener('click', () => {
    ui.closeModal(modal);
  });

  // Handle overlay click
  const overlay = modal.querySelector('.modal__overlay');
  overlay.addEventListener('click', () => {
    ui.closeModal(modal);
  });

  // Handle escape key
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      ui.closeModal(modal);
      document.removeEventListener('keydown', handleEscape);
    }
  };
  document.addEventListener('keydown', handleEscape);
}

/**
 * Handle delete task
 */
function handleDeleteTask(taskId) {
  const task = taskManager.getTaskById(taskId);
  if (!task) return;

  // Confirm deletion
  const confirmed = ui.confirm(`Delete task "${task.title}"?`);
  if (!confirmed) return;

  // Delete task
  taskManager.deleteTask(taskId);

  // Refresh UI
  refreshUI();

  // Show success
  ui.showNotification('Task deleted', 'success');
}

/**
 * Validate task form data
 */
function validateTaskForm(formData) {
  const errors = [];

  // Title required
  if (!formData.title || formData.title.trim() === '') {
    errors.push('Title is required');
  }

  // Title max length
  if (formData.title.length > 100) {
    errors.push('Title must be less than 100 characters');
  }

  // Due date validation
  if (formData.dueDate) {
    const dueDate = new Date(formData.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (dueDate < today) {
      errors.push('Due date cannot be in the past');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Refresh entire UI
 */
function refreshUI() {
  // Get tasks
  let tasks = taskManager.getAllTasks();

  // Apply status filter
  tasks = taskManager.filterByStatus(currentFilter);

  // Apply search
  if (searchTerm) {
    tasks = taskManager.searchTasks(searchTerm);
  }

  // Apply sort
  tasks = taskManager.sortTasks(tasks, currentSort);

  // Render tasks
  ui.renderTasks(tasks);

  // Update stats
  const stats = taskManager.getStats();
  ui.updateStats(stats);
}

/**
 * Handle keyboard shortcuts (optional bonus feature)
 */
function handleKeyboardShortcuts(e) {
  // Ctrl/Cmd + K = Focus search
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    document.getElementById('search-input').focus();
  }

  // Ctrl/Cmd + N = Focus new task
  if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
    e.preventDefault();
    document.getElementById('task-title').focus();
  }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

