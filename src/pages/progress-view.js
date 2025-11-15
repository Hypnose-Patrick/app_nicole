// LingoQuest - Progress View Page
// Detailed progress statistics and analytics

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
        <div class="progress-view-page fade-in">
            <div class="page-header">
                <h1>📈 Your Progress</h1>
                <p class="text-secondary">Track your learning journey and achievements</p>
            </div>

            <!-- Stats Overview -->
            <div class="stats-grid">
                <div class="stat-card highlight">
                    <div class="stat-icon">⭐</div>
                    <div class="stat-value">${profile.level}</div>
                    <div class="stat-label">Current Level</div>
                    <div class="stat-detail">${profile.totalXP} Total XP</div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon">💎</div>
                    <div class="stat-value">${profile.totalXP}</div>
                    <div class="stat-label">Total XP</div>
                    <div class="stat-detail">${xpForNextLevel - profile.totalXP} to next level</div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon">📚</div>
                    <div class="stat-value">${completedExercises}/${totalExercises}</div>
                    <div class="stat-label">Exercises Completed</div>
                    <div class="stat-detail">${completionPercentage}% overall</div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon">🎤</div>
                    <div class="stat-value">${profile.vocalExercisesCompleted}</div>
                    <div class="stat-label">Vocal Exercises</div>
                    <div class="stat-detail">Avg: ${profile.averageScore || 0}/100</div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon">💯</div>
                    <div class="stat-value">${profile.perfectScores || 0}</div>
                    <div class="stat-label">Perfect Scores</div>
                    <div class="stat-detail">95+ score achieved</div>
                </div>

                <div class="stat-card highlight">
                    <div class="stat-icon">🔥</div>
                    <div class="stat-value">${profile.currentStreak}</div>
                    <div class="stat-label">Day Streak</div>
                    <div class="stat-detail">Longest: ${profile.longestStreak || 0}</div>
                </div>
            </div>

            <!-- Level Progress -->
            <div class="progress-section card">
                <div class="section-header">
                    <h2>Level ${profile.level} Progress</h2>
                    <span class="progress-percentage">${levelProgress}%</span>
                </div>
                <div class="progress-bar-container large">
                    <div class="progress-bar-fill" style="width: ${levelProgress}%"></div>
                </div>
                <div class="progress-detail">
                    <span>${profile.totalXP} XP</span>
                    <span class="text-secondary">Next level at ${xpForNextLevel} XP</span>
                </div>
            </div>

            <!-- Overall Completion -->
            <div class="progress-section card">
                <div class="section-header">
                    <h2>Overall Completion</h2>
                    <span class="progress-percentage">${completionPercentage}%</span>
                </div>
                <div class="progress-bar-container large">
                    <div class="progress-bar-fill" style="width: ${completionPercentage}%"></div>
                </div>
                <div class="progress-detail">
                    <span>${completedExercises} of ${totalExercises} exercises completed</span>
                </div>
            </div>

            <!-- Module Progress -->
            <div class="module-progress-section">
                <h2>Module Progress</h2>
                <div class="module-progress-grid">
                    ${MODULES_DATA.map(module => {
                        const moduleProgress = progress[module.id] || {};
                        const totalLessons = module.lessons.length;
                        const completedLessons = Object.keys(moduleProgress).length;
                        const modulePercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

                        // Count total exercises in module
                        let moduleExercises = 0;
                        let moduleCompleted = 0;
                        module.lessons.forEach(lesson => {
                            moduleExercises += lesson.exercises.length;
                            lesson.exercises.forEach(exercise => {
                                if (StorageManager.isExerciseCompleted(module.id, lesson.id, exercise.id)) {
                                    moduleCompleted++;
                                }
                            });
                        });

                        return `
                            <div class="module-progress-card card" onclick="window.LingoQuest.loadModuleView('${module.id}')">
                                <div class="module-progress-header">
                                    <div class="module-icon">${module.icon}</div>
                                    <div class="module-title">${module.title}</div>
                                </div>
                                <div class="progress-bar-container">
                                    <div class="progress-bar-fill" style="width: ${modulePercent}%"></div>
                                </div>
                                <div class="module-progress-stats">
                                    <span>${completedLessons}/${totalLessons} lessons</span>
                                    <span>${moduleCompleted}/${moduleExercises} exercises</span>
                                    <span class="progress-percent">${modulePercent}%</span>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>

            <!-- Achievements Summary -->
            <div class="achievements-section">
                <h2>🏆 Achievements</h2>
                <div class="achievements-grid">
                    <div class="achievement-card">
                        <div class="achievement-icon">🏅</div>
                        <div class="achievement-value">${StorageManager.getUnlockedBadges().length}</div>
                        <div class="achievement-label">Badges Unlocked</div>
                        <button class="btn btn-sm btn-primary" onclick="window.LingoQuest.loadPage('badges')">
                            View All Badges
                        </button>
                    </div>

                    <div class="achievement-card">
                        <div class="achievement-icon">🎯</div>
                        <div class="achievement-value">${profile.maxWPM || 0}</div>
                        <div class="achievement-label">Max WPM Achieved</div>
                    </div>

                    <div class="achievement-card">
                        <div class="achievement-icon">📅</div>
                        <div class="achievement-value">${profile.longestStreak || 0}</div>
                        <div class="achievement-label">Longest Streak</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}
