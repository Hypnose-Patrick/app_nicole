// LingoQuest - Lesson View Page
// Shows all exercises within a selected lesson

function renderLessonView(moduleId, lessonId) {
    const module = MODULES_DATA.find(m => m.id === moduleId);
    if (!module) {
        return `<div class="error-page"><h2>Module not found</h2></div>`;
    }

    const lesson = module.lessons.find(l => l.id === lessonId);
    if (!lesson) {
        return `<div class="error-page"><h2>Lesson not found</h2></div>`;
    }

    const progress = StorageManager.getProgress();
    const lessonProgress = progress[moduleId]?.[lessonId] || {};

    // Calculate lesson completion
    const totalExercises = lesson.exercises.length;
    const completedExercises = Object.values(lessonProgress).filter(ex => ex.completed).length;
    const completionPercent = totalExercises > 0 ? Math.round((completedExercises / totalExercises) * 100) : 0;
    const isCompleted = completedExercises === totalExercises && totalExercises > 0;

    return `
        <div class="lesson-view-page fade-in">
            <!-- Back Button -->
            <button class="back-btn" onclick="window.LingoQuest.loadModuleView('${moduleId}')">
                ← Back to ${module.title}
            </button>

            <!-- Lesson Header -->
            <div class="lesson-header-section card">
                <div class="lesson-breadcrumb">
                    <span onclick="window.LingoQuest.loadPage('dashboard')" class="breadcrumb-link">Dashboard</span>
                    <span class="breadcrumb-separator">›</span>
                    <span onclick="window.LingoQuest.loadModuleView('${moduleId}')" class="breadcrumb-link">${module.icon} ${module.title}</span>
                    <span class="breadcrumb-separator">›</span>
                    <span class="breadcrumb-current">${lesson.title}</span>
                </div>

                <h1>${lesson.title}</h1>
                <p class="lesson-description">${lesson.description}</p>

                <div class="lesson-meta-tags">
                    <span class="meta-tag">⏱️ ${lesson.duration}</span>
                    <span class="meta-tag">⭐ ${lesson.xpReward} XP</span>
                    <span class="meta-tag">📝 ${totalExercises} exercise${totalExercises !== 1 ? 's' : ''}</span>
                    ${isCompleted ? '<span class="meta-tag completed">✓ Completed</span>' : ''}
                </div>
            </div>

            <!-- Lesson Progress -->
            <div class="lesson-progress-section card">
                <div class="progress-header">
                    <h3>Lesson Progress</h3>
                    <span class="progress-percentage">${completionPercent}%</span>
                </div>
                <div class="progress-bar-container large">
                    <div class="progress-bar-fill" style="width: ${completionPercent}%"></div>
                </div>
                <div class="progress-stats">
                    <span>${completedExercises} of ${totalExercises} exercises completed</span>
                </div>
            </div>

            <!-- Exercises Section -->
            <div class="exercises-section">
                <h2>Exercises</h2>
                <div class="exercises-grid">
                    ${lesson.exercises.map(exercise => renderExerciseCard(exercise, moduleId, lessonId)).join('')}
                </div>
            </div>

            ${isCompleted ? `
                <div class="lesson-completion-banner card">
                    <div class="completion-icon">🎉</div>
                    <div class="completion-content">
                        <h3>Lesson Completed!</h3>
                        <p>You've completed all exercises in this lesson. Well done!</p>
                    </div>
                    <button class="btn btn-primary" onclick="window.LingoQuest.loadModuleView('${moduleId}')">
                        Continue to Next Lesson
                    </button>
                </div>
            ` : ''}
        </div>
    `;
}
