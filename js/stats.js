class TaskStats {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.totalTasksElement = document.getElementById('totalTasks');
        this.completedTasksElement = document.getElementById('completedTasks');
        this.activeTasksElement = document.getElementById('activeTasks');
        this.chartContext = document.getElementById('tasksChart').getContext('2d');
        this.chart = null;

        this.init();
    }

    init() {
        this.updateStats();
        this.createChart();
        
        // Обновляем статистику при изменении задач
        window.addEventListener('storage', (e) => {
            if (e.key === 'tasks') {
                this.tasks = JSON.parse(e.newValue) || [];
                this.updateStats();
                this.updateChart();
            }
        });
    }

    updateStats() {
        const totalTasks = this.tasks.length;
        const completedTasks = this.tasks.filter(task => task.completed).length;
        const activeTasks = totalTasks - completedTasks;

        this.totalTasksElement.textContent = totalTasks;
        this.completedTasksElement.textContent = completedTasks;
        this.activeTasksElement.textContent = activeTasks;

        return { totalTasks, completedTasks, activeTasks };
    }

    createChart() {
        const stats = this.updateStats();
        
        this.chart = new Chart(this.chartContext, {
            type: 'doughnut',
            data: {
                labels: ['Выполненные задачи', 'Активные задачи'],
                datasets: [{
                    data: [stats.completedTasks, stats.activeTasks],
                    backgroundColor: [
                        'var(--secondary-color)',
                        'var(--primary-color)'
                    ],
                    borderColor: [
                        'var(--background-color)',
                        'var(--background-color)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: 'var(--text-color)'
                        }
                    }
                }
            }
        });
    }

    updateChart() {
        const stats = this.updateStats();
        
        if (this.chart) {
            this.chart.data.datasets[0].data = [
                stats.completedTasks,
                stats.activeTasks
            ];
            this.chart.update();
        }
    }
}

// Добавляем стили для статистики
const statsStyles = `
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-bottom: 2rem;
    }

    .stats-card, .chart-card {
        padding: 1.5rem;
    }

    .stats-summary {
        display: grid;
        gap: 1rem;
        margin-top: 1.5rem;
    }

    .stat-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background-color: var(--nav-bg);
        border-radius: 4px;
    }

    .stat-label {
        color: var(--text-color);
        font-weight: 500;
    }

    .stat-value {
        font-size: 1.2rem;
        font-weight: bold;
        color: var(--primary-color);
    }

    .chart-container {
        height: 300px;
        margin-top: 1.5rem;
    }

    @media (max-width: 768px) {
        .stats-grid {
            grid-template-columns: 1fr;
        }
    }
`;

// Добавляем стили на страницу
const styleSheet = document.createElement('style');
styleSheet.textContent = statsStyles;
document.head.appendChild(styleSheet);

// Инициализируем статистику
document.addEventListener('DOMContentLoaded', () => {
    new TaskStats();
}); 