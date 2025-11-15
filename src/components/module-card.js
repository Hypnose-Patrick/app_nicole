// LingoQuest - Module Card Component
// Renders a module card on the dashboard

function renderModuleCard(module) {
    const progress = StorageManager.getProgress();
    const moduleProgress = progress[module.id] || {};

    // Calculate completion percentage
    const totalLessons = module.lessons.length;
    const completedLessons = Object.keys(moduleProgress).length;
    const completionPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

    const levelColors = {
        'Beginner': '#4ade80',
        'Intermediate': '#60a5fa',
        'Advanced': '#f59e0b',
        'Expert': '#ef4444'
    };

    const levelColor = levelColors[module.level] || '#6b7280';

    return `
        <div class="module-card fade-in" onclick="window.LingoQuest.loadModuleView('${module.id}')">
            <div class="module-header">
                <div class="module-icon">${module.icon}</div>
                <div class="module-info">
                    <h3>${module.title}</h3>
                    <p class="text-secondary">${module.description}</p>
                </div>
            </div>

            <div class="module-stats">
                <div class="stat-badge" style="background-color: ${levelColor}20; color: ${levelColor};">
                    ${module.level}
                </div>
                <div class="stat-badge">
                    📚 ${module.lessons.length} lesson${module.lessons.length !== 1 ? 's' : ''}
                </div>
            </div>

            ${module.lessons.length > 0 ? `
                <div class="progress-section">
                    <div class="progress-info">
                        <span class="text-secondary">Progress</span>
                        <span class="progress-percent">${completionPercent}%</span>
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-bar-fill" style="width: ${completionPercent}%"></div>
                    </div>
                    <div class="lesson-count">
                        ${completedLessons} / ${totalLessons} lessons completed
                    </div>
                </div>
            ` : `
                <div class="coming-soon-badge">
                    🚧 Coming Soon
                </div>
            `}
        </div>
    `;
}
