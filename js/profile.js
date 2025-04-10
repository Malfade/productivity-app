class ProfileManager {
    constructor() {
        this.profileForm = document.getElementById('profileForm');
        this.userName = document.getElementById('userName');
        this.userQuote = document.getElementById('userQuote');
        this.themeToggle = document.getElementById('themeToggle');
        this.previewName = document.getElementById('previewName');
        this.previewQuote = document.getElementById('previewQuote');

        this.init();
    }

    init() {
        // Загружаем сохраненные данные
        this.loadProfile();
        this.loadTheme();

        // Добавляем обработчики событий
        this.profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveProfile();
        });

        this.themeToggle.addEventListener('change', () => {
            this.toggleTheme();
        });

        // Обновляем предпросмотр при вводе
        this.userName.addEventListener('input', () => this.updatePreview());
        this.userQuote.addEventListener('input', () => this.updatePreview());
    }

    loadProfile() {
        const savedName = localStorage.getItem('userName') || '';
        const savedQuote = localStorage.getItem('userQuote') || '';

        this.userName.value = savedName;
        this.userQuote.value = savedQuote;
        this.updatePreview();
    }

    saveProfile() {
        const name = this.userName.value.trim();
        const quote = this.userQuote.value.trim();

        localStorage.setItem('userName', name);
        localStorage.setItem('userQuote', quote);

        this.updatePreview();
        this.showNotification('Профиль успешно сохранен');
    }

    updatePreview() {
        const name = this.userName.value.trim() || 'Гость';
        const quote = this.userQuote.value.trim() || 'Персональное сообщение не задано';

        this.previewName.textContent = name;
        this.previewQuote.textContent = quote;
    }

    loadTheme() {
        const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
        this.themeToggle.checked = isDarkTheme;
        document.documentElement.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
    }

    toggleTheme() {
        const isDarkTheme = this.themeToggle.checked;
        document.documentElement.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
        localStorage.setItem('darkTheme', isDarkTheme);
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification fade-in';
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
}

// Добавляем стили для профиля
const profileStyles = `
    .profile-card,
    .theme-card,
    .preview-card {
        max-width: 600px;
        margin: 0 auto 2rem auto;
    }

    .profile-form {
        display: grid;
        gap: 1.5rem;
    }

    .form-group {
        display: grid;
        gap: 0.5rem;
    }

    .form-group label {
        font-weight: 500;
        color: var(--text-color);
    }

    textarea {
        resize: vertical;
        min-height: 100px;
        padding: 0.5rem;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        font-family: inherit;
    }

    .save-btn {
        justify-self: start;
    }

    .theme-toggle {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 0;
    }

    .theme-label {
        font-weight: 500;
        color: var(--text-color);
    }

    /* Переключатель темы */
    .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: .4s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        transition: .4s;
    }

    input:checked + .slider {
        background-color: var(--primary-color);
    }

    input:checked + .slider:before {
        transform: translateX(26px);
    }

    .slider.round {
        border-radius: 34px;
    }

    .slider.round:before {
        border-radius: 50%;
    }

    /* Предпросмотр профиля */
    .profile-preview {
        padding: 1.5rem;
        background-color: var(--nav-bg);
        border-radius: 4px;
    }

    .preview-name {
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--primary-color);
        margin-bottom: 1rem;
    }

    .preview-quote {
        color: var(--text-color);
        font-style: italic;
    }

    /* Уведомления */
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background-color: var(--secondary-color);
        color: white;
        border-radius: 4px;
        box-shadow: 0 2px 4px var(--shadow-color);
        z-index: 1000;
    }

    .fade-out {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
    }
`;

// Добавляем стили на страницу
const styleSheet = document.createElement('style');
styleSheet.textContent = profileStyles;
document.head.appendChild(styleSheet);

// Инициализируем менеджер профиля
document.addEventListener('DOMContentLoaded', () => {
    new ProfileManager();
}); 