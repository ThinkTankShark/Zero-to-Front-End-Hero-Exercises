// ================================
// Task Manager App - Main Entry Point
// ================================

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Task Manager App Started');

  // TODO: Initialize your task manager
  // const taskManager = new TaskManager();

  // TODO: Load tasks from localStorage
  // const savedTasks = Storage.getTasks();
  // savedTasks.forEach(task => taskManager.addTask(task));

  // TODO: Set up event listeners
  setupEventListeners();

  // TODO: Render initial tasks
  // renderTasks();

  // TODO: Update statistics
  // updateStats();
});

/**
 * Set up all event listeners for the app
 */
function setupEventListeners() {
  // Form submission
  const taskForm = document.getElementById('task-form');
  taskForm.addEventListener('submit', handleFormSubmit);

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

  // TODO: Add more event listeners as needed
}

/**
 * Handle form submission to add new task
 * @param {Event} e - Form submit event
 */
function handleFormSubmit(e) {
  e.preventDefault();

  // TODO: Get form data
  const formData = new FormData(e.target);
  const taskData = {
    title: formData.get('title'),
    description: formData.get('description'),
    dueDate: formData.get('dueDate'),
    priority: formData.get('priority'),
    category: formData.get('category')
  };

  // TODO: Create new task
  // const newTask = new Task(taskData);

  // TODO: Add to task manager
  // taskManager.addTask(newTask);

  // TODO: Save to localStorage
  // Storage.saveTasks(taskManager.getAllTasks());

  // TODO: Update UI
  // renderTasks();
  // updateStats();

  // Reset form
  e.target.reset();

  console.log('New task added:', taskData);
}

/**
 * Handle filter button clicks
 * @param {Event} e - Click event
 */
function handleFilterChange(e) {
  const filter = e.target.dataset.filter;

  // Update active button
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('filter-btn--active');
  });
  e.target.classList.add('filter-btn--active');

  // TODO: Filter tasks
  console.log('Filter changed to:', filter);
  // renderTasks(filter);
}

/**
 * Handle sort selection change
 * @param {Event} e - Change event
 */
function handleSortChange(e) {
  const sortBy = e.target.value;

  // TODO: Sort tasks
  console.log('Sort changed to:', sortBy);
  // taskManager.sortTasks(sortBy);
  // renderTasks();
}

/**
 * Handle search input
 * @param {Event} e - Input event
 */
function handleSearch(e) {
  const searchTerm = e.target.value.toLowerCase();

  // TODO: Filter tasks by search term
  console.log('Searching for:', searchTerm);
  // const filteredTasks = taskManager.searchTasks(searchTerm);
  // renderTasks(null, filteredTasks);
}

/**
 * Handle task actions (complete, edit, delete) using event delegation
 * @param {Event} e - Click event
 */
function handleTaskAction(e) {
  const target = e.target;

  // Get task card and ID
  const taskCard = target.closest('.task-card');
  if (!taskCard) return;

  const taskId = taskCard.dataset.taskId;

  // Handle checkbox (complete/uncomplete)
  if (target.classList.contains('task-checkbox')) {
    handleToggleComplete(taskId, target.checked);
  }

  // Handle edit button
  if (target.classList.contains('btn-edit')) {
    handleEditTask(taskId);
  }

  // Handle delete button
  if (target.classList.contains('btn-delete')) {
    handleDeleteTask(taskId);
  }
}

/**
 * Toggle task completion status
 * @param {string} taskId - Task ID
 * @param {boolean} isComplete - New completion status
 */
function handleToggleComplete(taskId, isComplete) {
  // TODO: Update task in task manager
  // taskManager.toggleTaskComplete(taskId);

  // TODO: Save to localStorage
  // Storage.saveTasks(taskManager.getAllTasks());

  // TODO: Update UI
  // renderTasks();
  // updateStats();

  console.log(`Task ${taskId} completion:`, isComplete);
}

/**
 * Edit a task
 * @param {string} taskId - Task ID
 */
function handleEditTask(taskId) {
  // TODO: Get task data
  // const task = taskManager.getTask(taskId);

  // TODO: Open edit modal with task data
  // UI.openEditModal(task);

  console.log('Editing task:', taskId);
}

/**
 * Delete a task
 * @param {string} taskId - Task ID
 */
function handleDeleteTask(taskId) {
  // Confirm deletion
  if (!confirm('Are you sure you want to delete this task?')) {
    return;
  }

  // TODO: Delete from task manager
  // taskManager.deleteTask(taskId);

  // TODO: Save to localStorage
  // Storage.saveTasks(taskManager.getAllTasks());

  // TODO: Update UI
  // renderTasks();
  // updateStats();

  console.log('Deleting task:', taskId);
}

/**
 * Render all tasks to the DOM
 * @param {string} filter - Filter type (all, active, completed)
 * @param {Array} tasks - Optional array of tasks to render
 */
function renderTasks(filter = 'all', tasks = null) {
  // TODO: Get tasks to render
  // If tasks not provided, get from task manager with filter
  // tasks = tasks || taskManager.getTasks(filter);

  const tasksList = document.getElementById('tasks-list');
  const emptyState = document.getElementById('empty-state');

  // Show/hide empty state
  if (!tasks || tasks.length === 0) {
    tasksList.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';

  // TODO: Render each task
  // tasksList.innerHTML = tasks.map(task => UI.createTaskCard(task)).join('');

  console.log('Rendering tasks:', tasks);
}

/**
 * Update statistics in header
 */
function updateStats() {
  // TODO: Get statistics from task manager
  // const stats = taskManager.getStats();

  // TODO: Update DOM
  // document.getElementById('total-tasks').textContent = stats.total;
  // document.getElementById('active-tasks').textContent = stats.active;
  // document.getElementById('completed-tasks').textContent = stats.completed;

  console.log('Stats updated');
}

// Export functions if using modules
// export { renderTasks, updateStats };

