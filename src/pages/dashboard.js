// LingoQuest - Dashboard Page
// Main page showing all available modules

function renderDashboard() {
    const profile = StorageManager.getProfile();
    const progress = StorageManager.getProgress();

    // Calculate overall stats
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

    const overallCompletion = totalExercises > 0 ? Math.round((completedExercises / totalExercises) * 100) : 0;
    const xpForNextLevel = getXPForNextLevel(profile.level);
    const levelProgress = getLevelProgress(profile.totalXP, profile.level);

    return `
        <div class="dashboard-page fade-in">
            <!-- Welcome Section -->
            <div class="welcome-section">
                <h1>Welcome back, ${profile.name}! 👋</h1>
                <p class="welcome-subtitle">Continue your journey to boardroom mastery</p>
            </div>

            <!-- Progress Overview -->
            <div class="progress-overview">
                <div class="overview-card">
                    <div class="overview-icon">⭐</div>
                    <div class="overview-content">
                        <div class="overview-label">Level</div>
                        <div class="overview-value">${profile.level}</div>
                        <div class="overview-detail">${profile.totalXP} / ${xpForNextLevel} XP</div>
                    </div>
                </div>

                <div class="overview-card">
                    <div class="overview-icon">📚</div>
                    <div class="overview-content">
                        <div class="overview-label">Progress</div>
                        <div class="overview-value">${overallCompletion}%</div>
                        <div class="overview-detail">${completedExercises} / ${totalExercises} exercises</div>
                    </div>
                </div>

                <div class="overview-card">
                    <div class="overview-icon">🔥</div>
                    <div class="overview-content">
                        <div class="overview-label">Streak</div>
                        <div class="overview-value">${profile.currentStreak}</div>
                        <div class="overview-detail">days in a row</div>
                    </div>
                </div>

                <div class="overview-card">
                    <div class="overview-icon">🎤</div>
                    <div class="overview-content">
                        <div class="overview-label">Vocal Practice</div>
                        <div class="overview-value">${profile.vocalExercisesCompleted}</div>
                        <div class="overview-detail">exercises completed</div>
                    </div>
                </div>
            </div>

            <!-- Level Progress Bar -->
            <div class="level-progress-section card">
                <div class="level-progress-header">
                    <h3>Level ${profile.level} Progress</h3>
                    <span>${levelProgress}%</span>
                </div>
                <div class="progress-bar-container large">
                    <div class="progress-bar-fill" style="width: ${levelProgress}%"></div>
                </div>
                <div class="level-progress-footer">
                    <span>${profile.totalXP} XP</span>
                    <span class="text-secondary">Next level at ${xpForNextLevel} XP</span>
                </div>
            </div>

            <!-- Modules Section -->
            <div class="modules-section">
                <div class="section-header">
                    <h2>Learning Modules</h2>
                    <p class="text-secondary">Choose a module to begin your training</p>
                </div>

                <div class="modules-grid">
                    ${MODULES_DATA.map(module => renderModuleCard(module)).join('')}
                </div>
            </div>

            <!-- Quick Actions -->
            <div class="quick-actions">
                <h3>Quick Actions</h3>
                <div class="action-buttons">
                    <button class="action-btn" onclick="window.LingoQuest.loadPage('progress')">
                        📈 View Detailed Progress
                    </button>
                    <button class="action-btn" onclick="window.LingoQuest.loadPage('badges')">
                        🏆 View Badges (${StorageManager.getUnlockedBadges().length}/${Object.keys(BADGES_DATA).length})
                    </button>
                </div>
            </div>
        </div>
    `;
}
