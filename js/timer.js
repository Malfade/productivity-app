class PomodoroTimer {
    constructor() {
        this.workTime = 25 * 60; // 25 minutes in seconds
        this.breakTime = 5 * 60; // 5 minutes in seconds
        this.timeLeft = this.workTime;
        this.isRunning = false;
        this.isWorkTime = true;
        this.timer = null;

        // DOM elements
        this.timerDisplay = document.getElementById('timerDisplay');
        this.timerStatus = document.getElementById('timerStatus');
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.timerSound = document.getElementById('timerSound');

        this.init();
    }

    init() {
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.updateDisplay();
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.startBtn.disabled = true;
            this.pauseBtn.disabled = false;
            this.timer = setInterval(() => this.tick(), 1000);
        }
    }

    pause() {
        if (this.isRunning) {
            this.isRunning = false;
            this.startBtn.disabled = false;
            this.pauseBtn.disabled = true;
            clearInterval(this.timer);
        }
    }

    reset() {
        this.pause();
        this.isWorkTime = true;
        this.timeLeft = this.workTime;
        this.updateDisplay();
        this.timerStatus.textContent = 'Работа';
    }

    tick() {
        if (this.timeLeft > 0) {
            this.timeLeft--;
            this.updateDisplay();
        } else {
            this.playSound();
            this.switchMode();
        }
    }

    switchMode() {
        this.isWorkTime = !this.isWorkTime;
        this.timeLeft = this.isWorkTime ? this.workTime : this.breakTime;
        this.timerStatus.textContent = this.isWorkTime ? 'Работа' : 'Отдых';
        this.updateDisplay();
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.timerDisplay.textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    playSound() {
        this.timerSound.currentTime = 0;
        this.timerSound.play().catch(error => {
            console.log('Ошибка воспроизведения звука:', error);
        });
    }
}

// Добавляем стили для таймера
const timerStyles = `
    .timer-card {
        text-align: center;
        padding: 2rem;
        margin-bottom: 2rem;
    }

    .timer-display {
        font-size: 4rem;
        font-weight: bold;
        color: var(--primary-color);
        margin-bottom: 1rem;
        font-family: monospace;
    }

    .timer-status {
        font-size: 1.5rem;
        color: var(--secondary-color);
        margin-bottom: 2rem;
    }

    .timer-controls {
        display: flex;
        gap: 1rem;
        justify-content: center;
    }

    .timer-btn {
        padding: 0.8rem 2rem;
        font-size: 1.1rem;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .timer-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .info-card {
        max-width: 600px;
        margin: 0 auto;
    }

    .info-card h2 {
        color: var(--primary-color);
        margin-bottom: 1rem;
    }

    .info-card ul {
        list-style-position: inside;
        margin-top: 1rem;
    }

    .info-card li {
        margin-bottom: 0.5rem;
    }
`;

// Добавляем стили на страницу
const styleSheet = document.createElement('style');
styleSheet.textContent = timerStyles;
document.head.appendChild(styleSheet);

// Инициализируем таймер
document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
}); 