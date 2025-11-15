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
            default:
                mainContent.innerHTML = renderDashboard();
        }
        
        this.currentPage = pageName;
        
        // Refresh profile UI (in case XP or level changed)
        this.updateProfileUI();
    }
}

// Progress View Page (simple stats)
function renderProgressView() {
    const profile = StorageManager.getProfile();
    const progress = StorageManager.getProgress();
    
    // Calculate stats
    let totalExercises = 0;
    let completedExercises = 0;
    
    MODULES_DATA.forEach(module => {
        module.lessons.forEach(lesson => {
            totalExercises += lesson.exercises.length;
            lesson.exercises.forEach(exercise => {
                if (StorageManager.isExerciseCompleted(module.id, lesson.id, exercise.id)) {
                    completedExercises++;
                }
            });
        });
    });
    
    const completionPercentage = Math.round((completedExercises / totalExercises) * 100);
    const xpForNextLevel = getXPForNextLevel(profile.level);
    const levelProgress = getLevelProgress(profile.totalXP, profile.level);
    
    return `
        <div class="fade-in">
            <h2>Your Progress</h2>
            <p class="text-secondary mb-4">Track your learning journey</p>
            
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon">⭐</div>
                    <div class="stat-value">${profile.level}</div>
                    <div class="stat-label">Current Level</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">💎</div>
                    <div class="stat-value">${profile.totalXP}</div>
                    <div class="stat-label">Total XP</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">📚</div>
                    <div class="stat-value">${completedExercises}/${totalExercises}</div>
                    <div class="stat-label">Exercises Completed</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">🎤</div>
                    <div class="stat-value">${profile.vocalExercisesCompleted}</div>
                    <div class="stat-label">Vocal Exercises</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">💯</div>
                    <div class="stat-value">${profile.perfectScores}</div>
                    <div class="stat-label">Perfect Scores</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">🔥</div>
                    <div class="stat-value">${profile.currentStreak}</div>
                    <div class="stat-label">Day Streak</div>
                </div>
            </div>
            
            <div class="progress-chart mt-4">
                <div class="chart-header">
                    <h3>Level ${profile.level} Progress</h3>
                    <p>${profile.totalXP} / ${xpForNextLevel} XP (${levelProgress}%)</p>
                </div>
                <div class="progress-bar-container" style="height: 20px; margin-top: 1rem;">
                    <div class="progress-bar-fill" style="width: ${levelProgress}%"></div>
                </div>
            </div>
            
            <div class="progress-chart mt-4">
                <div class="chart-header">
                    <h3>Overall Completion</h3>
                    <p>${completedExercises} of ${totalExercises} exercises completed</p>
                </div>
                <div class="progress-bar-container" style="height: 20px; margin-top: 1rem;">
                    <div class="progress-bar-fill" style="width: ${completionPercentage}%"></div>
                </div>
            </div>
            
            <div class="mt-4">
                <h3>Module Progress</h3>
                <div class="grid grid-2 mt-3">
                    ${MODULES_DATA.map(module => {
                        const moduleProgress = progress[module.id] || {};
                        const moduleLessons = module.lessons.length;
                        const completedLessons = Object.keys(moduleProgress).length;
                        const modulePercent = moduleLessons > 0 ? Math.round((completedLessons / moduleLessons) * 100) : 0;
                        
                        return `
                            <div class="card">
                                <h4>${module.icon} ${module.title}</h4>
                                <div class="progress-bar-container mt-2">
                                    <div class="progress-bar-fill" style="width: ${modulePercent}%"></div>
                                </div>
                                <div class="progress-text mt-1">
                                    <span>${completedLessons}/${moduleLessons} lessons</span>
                                    <span>${modulePercent}%</span>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        </div>
    `;
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

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new LingoQuestApp();
    app.init();
    
    // Make app globally accessible for debugging
    window.LingoQuest = app;
});
