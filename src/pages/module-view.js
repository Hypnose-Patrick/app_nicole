// LingoQuest - Module View Page
// Shows all lessons within a selected module

function renderModuleView(moduleId) {
    const module = MODULES_DATA.find(m => m.id === moduleId);

    if (!module) {
        return `
            <div class="error-page">
                <h2>Module not found</h2>
                <button class="btn btn-primary" onclick="window.LingoQuest.loadPage('dashboard')">
                    Back to Dashboard
                </button>
            </div>
        `;
    }

    const progress = StorageManager.getProgress();
    const moduleProgress = progress[moduleId] || {};

    // Calculate module completion
    const totalLessons = module.lessons.length;
    const completedLessons = Object.keys(moduleProgress).length;
    const completionPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

    // Calculate total XP available
    const totalXP = module.lessons.reduce((sum, lesson) => sum + lesson.xpReward, 0);

    return `
        <div class="module-view-page fade-in">
            <!-- Back Button -->
            <button class="back-btn" onclick="window.LingoQuest.loadPage('dashboard')">
                ← Back to Dashboard
            </button>

            <!-- Module Header -->
            <div class="module-header-section card">
                <div class="module-icon-large">${module.icon}</div>
                <div class="module-header-content">
                    <h1>${module.title}</h1>
                    <p class="module-description">${module.description}</p>
                    <div class="module-meta-tags">
                        <span class="meta-tag level-${module.level.toLowerCase()}">
                            ${module.level}
                        </span>
                        <span class="meta-tag">
                            📚 ${totalLessons} lesson${totalLessons !== 1 ? 's' : ''}
                        </span>
                        <span class="meta-tag">
                            ⭐ ${totalXP} Total XP
                        </span>
                    </div>
                </div>
            </div>

            <!-- Module Progress -->
            <div class="module-progress-section card">
                <div class="progress-header">
                    <h3>Module Progress</h3>
                    <span class="progress-percentage">${completionPercent}%</span>
                </div>
                <div class="progress-bar-container large">
                    <div class="progress-bar-fill" style="width: ${completionPercent}%"></div>
                </div>
                <div class="progress-stats">
                    <span>${completedLessons} of ${totalLessons} lessons completed</span>
                </div>
            </div>

            <!-- Lessons Section -->
            ${module.lessons.length > 0 ? `
                <div class="lessons-section">
                    <h2>Lessons</h2>
                    <div class="lessons-grid">
                        ${module.lessons.map(lesson => renderLessonCard(lesson, moduleId)).join('')}
                    </div>
                </div>
            ` : `
                <div class="empty-state card">
                    <div class="empty-icon">🚧</div>
                    <h3>Coming Soon</h3>
                    <p>Lessons for this module are currently being developed.</p>
                    <p class="text-secondary">Check back soon for updates!</p>
                    <button class="btn btn-primary mt-3" onclick="window.LingoQuest.loadPage('dashboard')">
                        Explore Other Modules
                    </button>
                </div>
            `}
        </div>
    `;
}
