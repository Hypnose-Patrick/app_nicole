// LingoQuest - Main Application
// Orchestrates the entire application

class LingoQuestApp {
    constructor() {
        this.currentPage = 'dashboard';
        this.profile = null;
    }

    // Initialize application
    init() {
        console.log('🚀 LingoQuest initializing...');

        // Initialize storage and profile
        this.profile = StorageManager.initializeProfile();

        // Update streak
        StorageManager.updateStreak();

        // Setup navigation
        this.setupNavigation();

        // Setup theme toggle
        this.setupTheme();

        // Update UI with profile data
        this.updateProfileUI();

        // Load dashboard
        this.loadPage('dashboard');

        // Hide loader
        setTimeout(() => {
            document.getElementById('app-loader').classList.add('hidden');
            document.getElementById('app-content').classList.remove('hidden');
        }, 500);

        console.log('✅ LingoQuest ready!');
    }

    // Setup navigation
    setupNavigation() {
        document.getElementById('nav-dashboard').addEventListener('click', () => {
            this.loadPage('dashboard');
        });

        document.getElementById('nav-progress').addEventListener('click', () => {
            this.loadPage('progress');
        });

        document.getElementById('nav-badges').addEventListener('click', () => {
            this.loadPage('badges');
        });

        document.getElementById('nav-chatbot').addEventListener('click', () => {
            this.loadPage('chatbot');
        });
    }

    // Setup theme toggle
    setupTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        const settings = StorageManager.getSettings();

        // Apply saved theme
        if (settings.theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.textContent = '☀️';
        }

        // Toggle theme
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';

            const settings = StorageManager.getSettings();
            settings.theme = newTheme;
            StorageManager.saveSettings(settings);
        });
    }

    // Update profile UI
    updateProfileUI() {
        const profile = StorageManager.getProfile();

        document.getElementById('user-name').textContent = profile.name;
        document.getElementById('user-level').textContent = `Level ${profile.level}`;
    }

    // Load page
    loadPage(pageName) {
        // Update active nav button
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        const activeBtn = document.getElementById(`nav-${pageName}`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }

        // Render page
        const mainContent = document.getElementById('main-content');

        switch(pageName) {
            case 'dashboard':
                mainContent.innerHTML = renderDashboard();
                break;
            case 'progress':
                mainContent.innerHTML = renderProgressView();
                break;
            case 'badges':
                mainContent.innerHTML = renderBadgesView();
                break;
            case 'chatbot':
                mainContent.innerHTML = renderChatbotView();
                break;
            default:
                mainContent.innerHTML = renderDashboard();
        }

        this.currentPage = pageName;

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Refresh profile UI (in case XP or level changed)
        this.updateProfileUI();
    }

    // Load module view
    loadModuleView(moduleId) {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = renderModuleView(moduleId);

        // Update nav to show we're still on dashboard
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.getElementById('nav-dashboard').classList.add('active');

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Load lesson view
    loadLessonView(moduleId, lessonId) {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = renderLessonView(moduleId, lessonId);

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Load exercise view
    loadExerciseView(moduleId, lessonId, exerciseId) {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = renderExerciseView(moduleId, lessonId, exerciseId);

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Show XP Toast Notification
function showXPToast(amount) {
    const toast = document.getElementById('xp-toast');
    document.getElementById('xp-amount').textContent = amount;

    toast.classList.remove('hidden');

    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

// Show level up notification
function showLevelUpNotification(newLevel) {
    // Create a temporary modal for level up
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <h2>🎉 Level Up!</h2>
            <div style="text-align: center; margin: 2rem 0;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">⭐</div>
                <h3 style="color: var(--color-primary);">Level ${newLevel}</h3>
                <p>Congratulations on your progress!</p>
            </div>
            <button class="btn btn-primary" onclick="this.closest('.modal').remove()">
                Continue
            </button>
        </div>
    `;

    document.body.appendChild(modal);

    // Auto-remove after 5 seconds if user doesn't click
    setTimeout(() => {
        if (modal.parentNode) {
            modal.remove();
        }
    }, 5000);
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new LingoQuestApp();
    app.init();

    // Make app globally accessible
    window.LingoQuest = app;
});
