// Wait for the DOM to load before executing code
document.addEventListener('DOMContentLoaded', function() {
    // Query DOM elements
    const submitButton = document.getElementById('submit');
    const taskInput = document.getElementById('task');
    const taskList = document.getElementById('tasks');
    const emptyState = document.getElementById('empty-state');
    const taskForm = document.getElementById('task-form');
    
    // Disable submit button initially
    submitButton.disabled = true;
    
    // Load tasks from local storage
    loadTasks();
    
    // Listen for input to enable/disable the submit button
    taskInput.addEventListener('input', function() {
        submitButton.disabled = !taskInput.value.trim();
    });
    
    // Handle form submission
    taskForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent page reload
        
        // Get and validate the task
        const task = taskInput.value.trim();
        if (!task) return;
        
        // Add the task
        addTask(task);
        
        // Clear the input field
        taskInput.value = '';
        
        // Disable the submit button again
        submitButton.disabled = true;
    });
    
    // Function to add a new task
    function addTask(taskText) {
        // Create list item
        const listItem = document.createElement('li');
        
        // Create task text span
        const taskTextSpan = document.createElement('span');
        taskTextSpan.textContent = taskText;
        
        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '&times;';
        deleteBtn.className = 'delete-btn';
        deleteBtn.title = 'Delete task';
        
        // Append elements to list item
        listItem.appendChild(taskTextSpan);
        listItem.appendChild(deleteBtn);
        
        // Toggle completion status when clicking on task
        listItem.addEventListener('click', function(e) {
            // Ignore clicks on the delete button
            if (e.target !== deleteBtn) {
                listItem.classList.toggle('completed');
                saveTasks();
            }
        });
        
        // Delete task when clicking delete button
        deleteBtn.addEventListener('click', function() {
            listItem.remove();
            updateEmptyState();
            saveTasks();
        });
        
        // Add the new task to the list
        taskList.appendChild(listItem);
        
        // Update empty state display
        updateEmptyState();
        
        // Save tasks to local storage
        saveTasks();
    }
    
    // Update empty state visibility
    function updateEmptyState() {
        if (taskList.children.length === 0) {
            emptyState.style.display = 'block';
        } else {
            emptyState.style.display = 'none';
        }
    }
    
    // Save tasks to local storage
    function saveTasks() {
        const tasks = [];
        
        // Gather all tasks and their completion status
        for (const task of taskList.children) {
            tasks.push({
                text: task.querySelector('span').textContent,
                completed: task.classList.contains('completed')
            });
        }
        
        // Save to local storage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    // Load tasks from local storage
    function loadTasks() {
        const savedTasks = localStorage.getItem('tasks');
        
        if (savedTasks) {
            const tasks = JSON.parse(savedTasks);
            
            // Add each task to the list
            tasks.forEach(task => {
                // Create list item
                const listItem = document.createElement('li');
                
                // Add completed class if task was completed
                if (task.completed) {
                    listItem.classList.add('completed');
                }
                
                // Create task text span
                const taskTextSpan = document.createElement('span');
                taskTextSpan.textContent = task.text;
                
                // Create delete button
                const deleteBtn = document.createElement('button');
                deleteBtn.innerHTML = '&times;';
                deleteBtn.className = 'delete-btn';
                deleteBtn.title = 'Delete task';
                
                // Append elements to list item
                listItem.appendChild(taskTextSpan);
                listItem.appendChild(deleteBtn);
                
                // Toggle completion status when clicking on task
                listItem.addEventListener('click', function(e) {
                    // Ignore clicks on the delete button
                    if (e.target !== deleteBtn) {
                        listItem.classList.toggle('completed');
                        saveTasks();
                    }
                });
                
                // Delete task when clicking delete button
                deleteBtn.addEventListener('click', function() {
                    listItem.remove();
                    updateEmptyState();
                    saveTasks();
                });
                
                // Add the task to the list
                taskList.appendChild(listItem);
            });
        }
        
        // Update empty state
        updateEmptyState();
    }
});