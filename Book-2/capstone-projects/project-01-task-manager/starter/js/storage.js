// ================================
// Storage Module
// Handles localStorage operations
// ================================

const Storage = {
  STORAGE_KEY: 'taskManagerTasks',

  /**
   * Save tasks to localStorage
   * @param {Array} tasks - Array of tasks to save
   */
  saveTasks(tasks) {
    try {
      // TODO: Convert tasks to JSON and save
      const tasksJSON = JSON.stringify(tasks);
      localStorage.setItem(this.STORAGE_KEY, tasksJSON);
      console.log('Tasks saved to localStorage');
    } catch (error) {
      console.error('Error saving tasks:', error);
      // Handle quota exceeded error
      if (error.name === 'QuotaExceededError') {
        alert('Storage quota exceeded. Please delete some tasks.');
      }
    }
  },

  /**
   * Load tasks from localStorage
   * @returns {Array} Array of task objects
   */
  getTasks() {
    try {
      // TODO: Load and parse tasks from localStorage
      const tasksJSON = localStorage.getItem(this.STORAGE_KEY);

      if (!tasksJSON) {
        return [];
      }

      const tasksData = JSON.parse(tasksJSON);

      // Convert plain objects to Task instances
      return tasksData.map(data => Task.fromJSON(data));
    } catch (error) {
      console.error('Error loading tasks:', error);
      return [];
    }
  },

  /**
   * Clear all tasks from localStorage
   */
  clearTasks() {
    try {
      // TODO: Remove tasks from localStorage
      localStorage.removeItem(this.STORAGE_KEY);
      console.log('Tasks cleared from localStorage');
    } catch (error) {
      console.error('Error clearing tasks:', error);
    }
  },

  /**
   * Check if localStorage is available
   * @returns {boolean} True if localStorage is available
   */
  isAvailable() {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (error) {
      return false;
    }
  },

  /**
   * Export tasks as JSON file
   * @param {Array} tasks - Tasks to export
   */
  exportTasks(tasks) {
    try {
      // TODO: Create downloadable JSON file
      const dataStr = JSON.stringify(tasks, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });

      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `tasks-${new Date().toISOString()}.json`;
      link.click();

      URL.revokeObjectURL(url);
      console.log('Tasks exported');
    } catch (error) {
      console.error('Error exporting tasks:', error);
    }
  },

  /**
   * Import tasks from JSON file
   * @param {File} file - JSON file to import
   * @returns {Promise<Array>} Promise resolving to array of tasks
   */
  importTasks(file) {
    return new Promise((resolve, reject) => {
      try {
        // TODO: Read and parse JSON file
        const reader = new FileReader();

        reader.onload = (e) => {
          try {
            const tasksData = JSON.parse(e.target.result);
            const tasks = tasksData.map(data => Task.fromJSON(data));
            resolve(tasks);
          } catch (error) {
            reject(new Error('Invalid JSON file'));
          }
        };

        reader.onerror = () => {
          reject(new Error('Error reading file'));
        };

        reader.readAsText(file);
      } catch (error) {
        reject(error);
      }
    });
  }
};

// Export if using modules
// export default Storage;

