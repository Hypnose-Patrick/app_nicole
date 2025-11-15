// LingoQuest - Main Application
// Orchestrates the entire application

class LingoQuestApp {
    constructor() {
        this.currentPage = 'dashboard';
        this.profile = null;
        this.storageReady = false;
    }

    // Initialize application
    async init() {
        console.log('🚀 LingoQuest initializing...');

        try {
            // Initialize IndexedDB
            await IndexedDBStorage.init();
            console.log('✅ IndexedDB initialized');

            // Migrate data from LocalStorage if needed
            const migrated = await IndexedDBStorage.migrateFromLocalStorage();
            if (migrated) {
                console.log('✅ Data migrated from LocalStorage');
            }

            // Initialize profile
            this.profile = await IndexedDBStorage.initializeProfile();
            console.log('✅ Profile loaded');

            // Update streak
            await IndexedDBStorage.updateStreak();
            this.profile = await IndexedDBStorage.getProfile(); // Refresh after streak update

            // Load and cache all data for synchronous access
            this.progressCache = await IndexedDBStorage.getProgress();
            this.settingsCache = await IndexedDBStorage.getSettings();
            this.badgesCache = await IndexedDBStorage.getUnlockedBadges();
            console.log('✅ Data caches initialized');

            // Initialize backup manager
            BackupManager.init();
            console.log('✅ Backup manager initialized');

            // Mark storage as ready
            this.storageReady = true;

            // Setup navigation
            this.setupNavigation();

            // Setup theme toggle
            await this.setupTheme();

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
        } catch (error) {
            console.error('❌ Error initializing app:', error);

            // Show error message to user
            document.getElementById('app-loader').innerHTML = `
                <div class="loader-content">
                    <h2 style="color: red;">❌ Error</h2>
                    <p>Failed to initialize the application. Please refresh the page.</p>
                    <button onclick="location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem;">
                        Refresh
                    </button>
                </div>
            `;
        }
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

        document.getElementById('nav-settings').addEventListener('click', () => {
            this.loadPage('settings');
        });
    }

    // Setup theme toggle
    async setupTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        const settings = await IndexedDBStorage.getSettings();

        // Apply saved theme
        if (settings.theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.textContent = '☀️';
        }

        // Toggle theme
        themeToggle.addEventListener('click', async () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';

            const settings = await IndexedDBStorage.getSettings();
            settings.theme = newTheme;
            await IndexedDBStorage.saveSettings(settings);
        });
    }

    // Update profile UI
    async updateProfileUI() {
        const profile = await IndexedDBStorage.getProfile();

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
            case 'settings':
                mainContent.innerHTML = renderSettingsView();
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
