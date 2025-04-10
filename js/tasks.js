class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.taskForm = document.getElementById('taskForm');
        this.taskInput = document.getElementById('taskInput');
        this.taskList = document.getElementById('taskList');
        
        this.init();
    }

    init() {
        this.taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTask();
        });

        this.renderTasks();
    }

    addTask() {
        const taskText = this.taskInput.value.trim();
        if (!taskText) return;

        const task = {
            id: Date.now(),
            text: taskText,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.tasks.push(task);
        this.saveTasks();
        this.renderTasks();
        this.taskInput.value = '';
    }

    toggleTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.renderTasks();
        }
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.saveTasks();
        this.renderTasks();
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    renderTasks() {
        this.taskList.innerHTML = '';
        
        if (this.tasks.length === 0) {
            this.taskList.innerHTML = '<p class="text-center">Нет активных задач</p>';
            return;
        }

        const taskElements = this.tasks.map(task => {
            const taskElement = document.createElement('div');
            taskElement.className = `task-item ${task.completed ? 'completed' : ''} fade-in`;
            
            taskElement.innerHTML = `
                <div class="task-content">
                    <input type="checkbox" 
                           id="task-${task.id}" 
                           ${task.completed ? 'checked' : ''}>
                    <label for="task-${task.id}">${task.text}</label>
                </div>
                <button class="delete-btn" data-id="${task.id}">Удалить</button>
            `;

            const checkbox = taskElement.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', () => this.toggleTask(task.id));

            const deleteBtn = taskElement.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => this.deleteTask(task.id));

            return taskElement;
        });

        taskElements.forEach(element => this.taskList.appendChild(element));
    }
}

// Добавляем стили для задач
const taskStyles = `
    .task-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.8rem;
        margin-bottom: 0.5rem;
        background-color: var(--card-bg);
        border: 1px solid var(--border-color);
        border-radius: 4px;
        transition: all 0.3s ease;
    }

    .task-item:hover {
        box-shadow: 0 2px 4px var(--shadow-color);
    }

    .task-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .task-item.completed label {
        text-decoration: line-through;
        color: var(--secondary-color);
    }

    .delete-btn {
        padding: 0.3rem 0.8rem;
        background-color: #ff4444;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .delete-btn:hover {
        background-color: #cc0000;
    }

    .task-form {
        display: flex;
        gap: 1rem;
    }

    .task-form input {
        flex: 1;
    }
`;

// Добавляем стили на страницу
const styleSheet = document.createElement('style');
styleSheet.textContent = taskStyles;
document.head.appendChild(styleSheet);

// Инициализируем менеджер задач
document.addEventListener('DOMContentLoaded', () => {
    new TaskManager();
}); 